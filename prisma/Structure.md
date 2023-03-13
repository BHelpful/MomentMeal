# This file describes the structure of the Prisma schema.

## Recipes model
### ID: string 
ID of the recipe. This is the primary key.

### public: boolean
If the recipe is public or not. If it is public, it will be visible to all users. If it is not public, it will only be visible to the user who created it.

### categories: CategoriesList[]
The categories that the recipe belongs to. This is a list of categories.

### creatorId: string
The ID of the user who created the recipe. This is a foreign key.

### title: string
A title for the recipe.

### description: string
A description for the recipe.

### prepTime: string
The preparation time for the recipe.

### cookTime: string
The cooking time for the recipe.

### images?: **To be determined**
Possible images for the recipe. This is a list of images. A default image will be used if no images are provided.
Could be something like: https://mediajams.dev/post/upload-and-display-images-using-prisma

### ingredients: **Relation to ingredients as a list**
A list of ingredients for the recipe.

### preparation: string[]
Steps for the preparation of the recipe. This is a list of steps.

### instructions: string[]
Steps for the cooking of the recipe. This is a list of steps.

### rating?: Rating[]
A list of ratings for the recipe. Each rating consists of a user ID and a rating. The rating is calculated from the list of ratings.

### servings: number
A number of servings for the recipe. This can be used to calculate the amount of ingredients needed.

### sideDishes?: Recipe[]
If the recipe will contain side dishes, they can be listed here. This is a list of side dishes. The side dishes can also be elements of the complete recipe e.g. potatoes, a kind of meat, etc.
NOTE: use self-relations - documentation: https://www.prisma.io/docs/concepts/components/prisma-schema/relations/self-relations