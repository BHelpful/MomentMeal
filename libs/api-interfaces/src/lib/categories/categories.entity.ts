import { ApiProperty } from '@nestjs/swagger';
import { Categories } from '@prisma/client';

export class CategoriesEntity implements Categories {
	@ApiProperty({
		description: 'Id of category',
		default: '1',
	})
	id: number;

	@ApiProperty({
		description: 'Date of category creation',
		default: new Date(),
	})
	createdAt: Date;

	@ApiProperty({
		description: 'Date of category update',
		default: new Date(),
	})
	updatedAt: Date;

	@ApiProperty({
		description: 'Name of category',
		default: 'Mexican',
	})
	readonly name: string;

	@ApiProperty({
		description: "The category's types",
		default: ['spicy', 'liquid'],
	})
	type: string[];
}
