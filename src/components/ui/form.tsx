import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import {
  Controller,
  FormProvider,
  useFieldArray,
  useFormContext,
  type Control,
  type ControllerProps,
  type FieldArrayPath,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

type FormFieldArrayProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  render: (args: {
    fields: {
      id: string;
      name: string;
      key: string;
    }[];
    remove: (index: number) => void;
    append: (value: TFieldValues[TName][number] | TFieldValues[TName]) => void;
    prepend: (value: TFieldValues[TName][number] | TFieldValues[TName]) => void;
    insert: (
      index: number,
      value: TFieldValues[TName][number] | TFieldValues[TName]
    ) => void;
    move: (from: number, to: number) => void;
    swap: (indexA: number, indexB: number) => void;
  }) => React.ReactNode;
};

const FormFieldArray = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
>({
  control,
  name,
  render,
}: FormFieldArrayProps<TFieldValues, TName>) => {
  const { fields, append, prepend, insert, move, swap, remove } = useFieldArray<
    TFieldValues,
    TName
  >({
    control,
    name,
  });

  const mappedFields = fields.map((field, index) => ({
    id: `${field.id}-${index}`,
    name: `${name}.${index}`,
    key: field.id,
    remove: () => remove(index),
  }));

  return (
    <>
      {render({
        fields: mappedFields,
        append,
        prepend,
        insert,
        move,
        swap,
        remove,
      })}
    </>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-[0.8rem] text-muted-foreground', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-[0.8rem] font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

const UncontrolledFormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    message?: string;
  }
>(({ className, children, message, ...props }, ref) => {
  const { formMessageId } = useFormField();
  const body = message ? String(message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  );
});
UncontrolledFormMessage.displayName = 'UncontrolledFormMessage';

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormFieldArray,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
  useFormField,
};
