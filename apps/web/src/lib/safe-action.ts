import { currentUser } from '@clerk/nextjs/server';
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';
import { zodAdapter } from 'next-safe-action/adapters/zod';
import { z } from 'zod';

class UnknownCauseError extends Error {
  [key: string]: unknown;
}

export function getCauseFromUnknown(cause: unknown): Error | undefined {
  if (cause instanceof Error) {
    return cause;
  }

  const type = typeof cause;
  if (type === 'undefined' || type === 'function' || cause === null) {
    return undefined;
  }

  // Primitive types just get wrapped in an error
  if (type !== 'object') {
    return new Error(String(cause));
  }

  // If it's an object, we'll create a synthetic error
  if (isObject(cause)) {
    const err = new UnknownCauseError();
    for (const key in cause) {
      err[key] = cause[key];
    }
    return err;
  }

  return undefined;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object';
}
export enum ACTION_ERROR_CODE_KEY {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  METHOD_NOT_SUPPORTED = 'METHOD_NOT_SUPPORTED',
  TIMEOUT = 'TIMEOUT',
  CONFLICT = 'CONFLICT',
  PRECONDITION_FAILED = 'PRECONDITION_FAILED',
  PAYLOAD_TOO_LARGE = 'PAYLOAD_TOO_LARGE',
  UNSUPPORTED_MEDIA_TYPE = 'UNSUPPORTED_MEDIA_TYPE',
  UNPROCESSABLE_CONTENT = 'UNPROCESSABLE_CONTENT',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
  CLIENT_CLOSED_REQUEST = 'CLIENT_CLOSED_REQUEST',
}

export function getActionErrorFromUnknown(cause: unknown): ActionError {
  if (cause instanceof ActionError) {
    return cause;
  }
  if (cause instanceof Error && cause.name === 'ActionError') {
    return cause as ActionError;
  }

  const actionError = new ActionError({
    code: ACTION_ERROR_CODE_KEY.INTERNAL_SERVER_ERROR,
    cause,
  });

  // Inherit stack from error
  if (cause instanceof Error && cause.stack) {
    actionError.stack = cause.stack;
  }

  return actionError;
}

export class ActionError extends Error {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore override doesn't work in all environments due to "This member cannot have an 'override' modifier because it is not declared in the base class 'Error'"
  public override readonly cause?: Error;
  public readonly code: ACTION_ERROR_CODE_KEY;

  constructor(opts: {
    message?: string;
    code: ACTION_ERROR_CODE_KEY;
    cause?: unknown;
  }) {
    const cause = getCauseFromUnknown(opts.cause);
    const message = opts.message ?? cause?.message ?? opts.code;

    super(message, { cause });

    this.code = opts.code;
    this.name = 'ActionError';

    if (!this.cause) {
      this.cause = cause;
    }
  }
}

export const action = createSafeActionClient({
  validationAdapter: zodAdapter(),
  // You can provide a custom logging function, otherwise the lib will use `console.error`
  // as the default logging system. If you want to disable server errors logging,
  // just pass an empty Promise.
  handleServerErrorLog: (e) => {
    console.error(
      'CUSTOM ERROR LOG FUNCTION, server error message:',
      e.message
    );
  },
  handleReturnedServerError: (e) => {
    // If the error is an instance of `ActionError`, unmask the message.
    if (e instanceof ActionError) {
      return e.message;
    }

    // Otherwise return default error message.
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  // Here we define a metadata type to be used in `metadata` instance method.
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
}).use(async ({ next, metadata, clientInput, bindArgsClientInputs, ctx }) => {
  // Here we use a logging middleware.
  const start = Date.now();

  // Here we await the next middleware.
  const result = await next({ ctx });

  const end = Date.now();

  const durationInMs = end - start;

  const logObject: Record<string, unknown> = { durationInMs };

  logObject.clientInput = clientInput;
  logObject.bindArgsClientInputs = bindArgsClientInputs;
  logObject.metadata = metadata;
  logObject.result = result;

  console.log('LOGGING FROM MIDDLEWARE:');
  console.dir(logObject, { depth: null });

  // And then return the result of the awaited next middleware.
  return result;
});

export const authAction = action.use(async ({ next }) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new ActionError({ code: ACTION_ERROR_CODE_KEY.UNAUTHORIZED });
  }

  return next({
    ctx: {
      userId: user.id,
      user,
    },
  });
});
