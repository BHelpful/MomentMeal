import { neonConfig, Pool, type PoolConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// types
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// setup
neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DIRECT_UNPOOLED_URL;

let prisma: PrismaClient;

if (connectionString?.includes('neon')) {
  const poolConfig: PoolConfig = {
    connectionString: connectionString,
  };
  // instantiate
  const pool = new Pool(poolConfig);
  const adapter = new PrismaNeon(pool);
  prisma =
    global.prisma ||
    new PrismaClient({ adapter, log: ['info', 'warn', 'error'] });
} else {
  prisma =
    global.prisma || new PrismaClient({ log: ['info', 'warn', 'error'] });
}

// cache on global for HOT RELOAD in dev
if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export const db = prisma;
