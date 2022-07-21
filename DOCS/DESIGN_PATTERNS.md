# Design Patterns of MealTime

This document is a collection of design patterns that are used in the MealTime application.

## Database Design Pattern

Create a new model in the prisma/schema.prisma file ([Prisma schema](https://www.prisma.io/docs/concepts/components/prisma-schema)) - IMPORTANT every model must have `id`, `createdAt` and `updatedAt` fields as shown in the example below

**Example:**

```prisma
model Stores {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  name      String   @unique
}
```

### Create a new model in the prisma/schema.prisma file

When creating a new model, make sure to implement the following in the backend NestJS application:

- Add a "deleteMany" method to the model in the `apps/api/src/services/prisma.service.ts` file

```typescript
cleanDb() {
    return this.$transaction([
      this.users.deleteMany(),
      this.stores.deleteMany(),
    ]);
  }
```

- Add a new resource i.e. module, controller, service (can be done with `yarn api:res <nameOfResource>`) and place it in `apps/api/src/modules/<nameOfResource>/`.

### Seed the database

When adding of making changes to the you need to update `prisma/seed.ts` file to be able to seed the database with the new changes with the command `yarn prisma:seed`.

## Backend Design Patterns

For a more in-depth look at the backend design patterns, please refer to the following documents:
https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0#update-swagger-response-types

### Data transfer objects (DTOs) and entity classes
For each model in the database there needs to be corresponding DTOs (e.g. create-store.dto.ts & update-store.dto.ts) and entity class. The DTOs are used to transfer data between the frontend and the backend. The entity class is used to map the data from the database to the DTOs.

### Validation - Validators

Validation is implemented using the [NestJS Validator](https://docs.nestjs.com/techniques/validation) package. The decorators from `class-validator` is used on the DTOs to validate the request body.

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of a store',
    default: 'Rema 1000',
  })
  readonly name: string;
}
```

### Swagger - API documentation

In order to make the API more developer friendly when using the API, we need to create a documentation for the API. This is done with the Swagger tool.

An example of a complete documented post route is below:

```typescript
import { STORES_EXCEPTION_MSG } from './stores.exceptionMessages';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @ApiOperation({
    summary: 'Create a new store',
    description: 'Test',
  })
  @ApiCreatedResponse({ type: StoreEntity })
  @ApiResponse({
    status: new ForbiddenException().getStatus(),
    description: STORES_EXCEPTION_MSG.ALREADY_EXISTS,
  })
  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }
```

This example shows the minimum viable the Swagger documentation for the POST /stores route i.e. a summary, description, responses (successful and all exceptions) and request body.
Note: Separate the exception messages into the route's own file and import them into the controller e.g. `import { STORES_EXCEPTION_MSG } from './stores.exceptionMessages';`.

## Frontend Design Patterns
