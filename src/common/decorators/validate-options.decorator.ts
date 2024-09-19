import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function ValidateOptions(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'validateOptions',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const type = (args.object as any).type;
          if (['searchSelect', 'conditionalSelect'].includes(type)) {
            return (
              Array.isArray(value) &&
              value.every((item) => typeof item === 'object')
            );
          } else {
            return value === undefined || value === null;
          }
        },
        defaultMessage(args: ValidationArguments) {
          const type = (args.object as any).type;
          if (['searchSelect', 'conditionalSelect'].includes(type)) {
            return `options must be an array of objects when type is 'select' or 'conditionalSelect'`;
          } else {
            return `options must be empty or not provided when type is not 'select' or 'conditionalSelect'`;
          }
        },
      },
    });
  };
}
