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
const poolConfig: PoolConfig = {
  connectionString: process.env.DIRECT_UNPOOLED_URL,
};

// instantiate
const pool = new Pool(poolConfig);
const adapter = new PrismaNeon(pool);

const prisma =
  global.prisma ||
  new PrismaClient({ adapter, log: ['info', 'warn', 'error'] });

// cache on global for HOT RELOAD in dev
if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export const db = prisma;
