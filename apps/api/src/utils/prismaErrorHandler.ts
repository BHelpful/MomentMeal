import {
	ForbiddenException,
	InternalServerErrorException,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ExceptionMessages } from './exceptionMessages';

const logger = new Logger('PrismaErrorLogger');

function prismaErrorException(
	error: PrismaClientKnownRequestError,
	msg: ExceptionMessages
) {
	logger.error(error.message);
	switch (error.code) {
		case 'P2002':
			return new ForbiddenException(msg.ALREADY_EXISTS());

		case 'P2025':
			return new NotFoundException(msg.NOT_FOUND());

		default:
			// Not all errors are handled specifically here, but we can still throw a generic error
			// If you want to handle more prisma errors specifically, you can check the full
			// list of error codes here: https://www.prisma.io/docs/reference/api-reference/error-reference
			return new InternalServerErrorException(msg.INTERNAL_SERVER_ERROR());
	}
}

export { prismaErrorException };
