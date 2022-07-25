import { CreateStoreDto, UpdateStoreDto } from '@meal-time/api-interfaces';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../services/prisma/prisma.service';
import { STORES_EXCEPTION_MSG } from './stores.exceptionMessages';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  async create(createStoreDto: CreateStoreDto) {
    return this.prisma.stores
      .create({
        data: {
          ...createStoreDto,
        },
      })
      .catch((error: PrismaClientKnownRequestError) => {
        if (error.code === 'P2002') {
          throw new ForbiddenException(STORES_EXCEPTION_MSG.ALREADY_EXISTS);
        }
      });
  }

  findAll() {
    return `This action returns all stores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }
  
  async remove(id: number) {
    const store = await this.prisma.stores.findUnique({
      where: {
        id,
      },
    });

    if (!store) throw new NotFoundException(STORES_EXCEPTION_MSG.NOT_FOUND);

    return this.prisma.stores.delete({
      where: {
        id,
      },
    });
  }
}
