import { cn } from '@/lib/utils';
import { ExtendedMessage } from '@/types/message';
import { format } from 'date-fns';
import { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Icons } from '../Icons';

interface MessageProps {
    message: ExtendedMessage;
    isNextMessageSamePerson: boolean;
}

const Message = forwardRef<HTMLDivElement, MessageProps>(
    ({ message, isNextMessageSamePerson }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('flex items-end', {
                    'justify-end': message.isUserMessage,
                })}
            >
                <div
                    className={cn(
                        'relative flex h-6 w-6 aspect-square items-center justify-center',
                        {
                            'order-2 bg-primary-600 rounded-sm':
                                message.isUserMessage,
                            'order-1 bg-secondary-800 rounded-sm':
                                !message.isUserMessage,
                            invisible: isNextMessageSamePerson,
                        }
                    )}
                >
                    {message.isUserMessage ? (
                        <Icons.user className="fill-secondary-200 text-secondary-200 h-3/4 w-3/4" />
                    ) : (
                        <Icons.logo className="fill-secondary-300 h-3/4 w-3/4" />
                    )}
                </div>

                <div
                    className={cn(
                        'flex flex-col space-y-2 text-base max-w-md mx-2',
                        {
                            'order-1 items-end': message.isUserMessage,
                            'order-2 items-start': !message.isUserMessage,
                        }
                    )}
                >
                    <div
                        className={cn('px-4 py-2 rounded-lg inline-block', {
                            'bg-primary-600 text-primary':
                                message.isUserMessage,
                            'bg-secondary-200 text-secondary-900':
                                !message.isUserMessage,
                            'rounded-br-none':
                                !isNextMessageSamePerson &&
                                message.isUserMessage,
                            'rounded-bl-none':
                                !isNextMessageSamePerson &&
                                !message.isUserMessage,
                        })}
                    >
                        {typeof message.text === 'string' ? (
                            <ReactMarkdown
                                className={cn('prose', {
                                    'text-secondary-50': message.isUserMessage,
                                })}
                            >
                                {message.text}
                            </ReactMarkdown>
                        ) : (
                            message.text
                        )}
                        {message.id !== 'loading-message' ? (
                            <div
                                className={cn(
                                    'text-xs select-none mt-2 w-full text-right',
                                    {
                                        'text-secondary-500':
                                            !message.isUserMessage,
                                        'text-primary-300':
                                            message.isUserMessage,
                                    }
                                )}
                            >
                                {format(new Date(message.createdAt), 'HH:mm')}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
);

Message.displayName = 'Message';

export default Message;
