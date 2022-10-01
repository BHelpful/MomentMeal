import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, ArrayNotEmpty } from 'class-validator';

export class CreateCategoryDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'Name of a category',
		default: 'Mexican',
	})
	readonly name: string;

	@IsNotEmpty()
	@IsArray()
	@ArrayNotEmpty()
	@IsString({ each: true }) //Runs on every item in the array
	@ApiProperty({
		description: "The category's types",
		default: ['spicy', 'liquid'],
	})
	readonly type: string[];
}
