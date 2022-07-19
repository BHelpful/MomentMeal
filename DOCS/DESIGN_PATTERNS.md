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



## Frontend Design Patterns
