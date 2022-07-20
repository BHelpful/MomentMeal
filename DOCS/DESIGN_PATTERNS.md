# Design Patterns of MealTime
This document is a collection of design patterns that are used in the MealTime application.


## Database Design Pattern
Create a new model in the prisma/schema.prisma file ([Prisma schema](https://www.prisma.io/docs/concepts/components/prisma-schema)) - IMPORTANT every model must have id, createdAt and updatedAt fields as shown in the example below

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
## Backend Design Patterns

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
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    type: ResponseStoreDto,
  })
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

### Validation - Validators

TODO Implement more complete design pattern: https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0#update-swagger-response-types

## Frontend Design Patterns
