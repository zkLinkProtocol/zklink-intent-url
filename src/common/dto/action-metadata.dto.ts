import {
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { Chains } from 'src/constants';

import { ValidateOptions } from '../decorators';

export class NetworkDto {
  @ApiProperty({ type: String, description: 'Network name' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'Network chain ID' })
  @IsNumber()
  chainId: Chains;
}

export class AuthorDto {
  @ApiProperty({ type: String, description: 'Action developer name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    type: String,
    description: `developer's Twitter account link (optional)`,
  })
  @IsOptional()
  @IsString()
  x?: string;

  @ApiProperty({
    type: String,
    description: `developer's Github account link url`,
  })
  @IsString()
  github: string;

  @ApiPropertyOptional({
    type: String,
    description: `developer's Discord account link (optional)`,
  })
  @IsOptional()
  @IsString()
  discord?: string;
}

export class OptionDto {
  @ApiProperty({
    description:
      'Fields for constructing a transaction, display text for the dropdown menu.',
  })
  @IsString()
  label: string;

  @ApiProperty({
    description:
      'Fields for constructing a transaction, the value behind the display text of the dropdown menu, where users fill in the transaction fields',
  })
  @IsString()
  value: string;

  @ApiPropertyOptional({
    description:
      'If there are multiple networks, please specify the chainId, indicating which network this option can be selected on.',
  })
  @IsString()
  chainId?: Chains;

  @ApiPropertyOptional({
    description:
      'indicates whether this field is the default selected field; only one is allowed per network.',
  })
  @IsBoolean()
  default?: boolean;
}

export interface ConditionalRendering<R extends Record<string, any>> {
  value: Array<string>; // An array of values that determine the condition for rendering. When the selected value matches any of these, the specified component will be rendered.
  component: ConditionalComponentDto<R>;
}

export class BaseComponentDto<R extends Record<string, any>> {
  @ApiProperty({
    type: String,
    description:
      'The component name, and the name will serve as the key in the formData within generateTransaction.',
  })
  @IsString()
  name: keyof R;

  @ApiProperty({
    type: String,
    description: 'The frontend will use the label as the form display.',
  })
  @IsString()
  label: string;

  @ApiProperty({
    type: String,
    description:
      'As the placeholder for the input type form, displayed to the creator.',
  })
  @IsString()
  desc: string;

  @ApiPropertyOptional({
    type: String,
    description: 'default value (optional)',
  })
  @IsString()
  defaultValue?: R[typeof this.name];

  @ApiPropertyOptional({
    description:
      'Defines the conditions under which certain components should be rendered.',
  })
  @IsOptional()
  @ValidateNested()
  conditionalRendering?: ConditionalRendering<R>;
}

export class AgnosticComponentDto<
  R extends Record<string, any>,
> extends BaseComponentDto<R> {
  @ApiProperty({
    type: String,
    enum: ['text', 'switch'],
    description: 'Component type',
  })
  @IsEnum(['text', 'switch'])
  type: 'text' | 'switch';
}

export class InputComponentDto<
  R extends Record<string, any>,
> extends BaseComponentDto<R> {
  @ApiProperty({
    type: String,
    description: 'Component type',
  })
  type: 'input';

  @ApiProperty({
    type: String,
    description:
      'Simple regex validation, informing the frontend of the form field rules, which the frontend will use for validation.',
  })
  @IsString()
  regex: string;

  @ApiProperty({
    type: String,
    description:
      'Error message for regex validation; if the regex validation fails, this configuration will serve as a prompt to tell the creator the rules for filling in this field.',
  })
  @IsString()
  regexDesc: string;
}

export class OptionComponentDto<
  R extends Record<string, any>,
> extends BaseComponentDto<R> {
  @ApiProperty({
    type: String,
    enum: ['searchSelect'],
    description: 'This component is a dropdown menu.',
  })
  @IsEnum(['searchSelect'])
  type: 'searchSelect';

  @ApiProperty({
    type: 'array',
    items: { $ref: getSchemaPath(OptionDto) },
    description: 'Dropdown menu option configuration.',
  })
  @IsArray()
  @Type(() => OptionDto)
  @ValidateNested({ each: true })
  @ValidateIf((o) => ['searchSelect'].includes(o.type))
  @ValidateOptions({ message: 'Invalid options based on type value' })
  options: OptionDto[];
}

export class InputOptionComponentDto<
  R extends Record<string, any>,
> extends BaseComponentDto<R> {
  @ApiProperty({
    type: String,
    enum: ['inputSelect'],
    description: 'This component is a dropdown menu and support input.',
  })
  @IsEnum(['inputSelect'])
  type: 'inputSelect';

  @ApiProperty({
    type: 'array',
    items: { $ref: getSchemaPath(OptionDto) },
    description: 'Dropdown menu option configuration.',
  })
  @IsArray()
  @Type(() => OptionDto)
  @ValidateNested({ each: true })
  @ValidateIf((o) => ['inputSelect'].includes(o.type))
  @ValidateOptions({ message: 'Invalid options based on type value' })
  options: OptionDto[];

  @ApiProperty({
    type: String,
    description:
      'Simple regex validation, informing the frontend of the form field rules, which the frontend will use for validation.',
  })
  @IsString()
  regex?: string;

  @ApiProperty({
    type: String,
    description:
      'Error message for regex validation; if the regex validation fails, this configuration will serve as a prompt to tell the creator the rules for filling in this field.',
  })
  @IsString()
  regexDesc?: string;
}

export class ConditionalComponentDto<
  R extends Record<string, any>,
> extends BaseComponentDto<R> {
  @ApiProperty({
    type: String,
    enum: ['conditionalSelect'],
    description: 'This component is a dropdown menu.',
  })
  @IsEnum(['conditionalSelect'])
  type: 'conditionalSelect';

  @ApiProperty({
    type: 'array',
    items: { $ref: getSchemaPath(OptionDto) },
    description: 'Dropdown menu option configuration.',
  })
  @IsArray()
  @Type(() => OptionDto)
  @ValidateNested({ each: true })
  @ValidateIf((o) => ['conditionalSelect'].includes(o.type))
  @ValidateOptions({ message: 'Invalid options based on type value' })
  options: OptionDto[];
}

export class PresetItemDto<R extends Record<string, any>> {
  @ApiProperty({
    type: String,
    description: 'Pre-set which form field the MagicLink trigger is bound to.',
  })
  field: keyof R;

  @ApiProperty({
    type: String,
    description: "Set up the trigger's text",
  })
  title: string;

  @ApiProperty({
    type: String,
    enum: ['Button', 'Input'],
    description: "Set up the trigger's type",
  })
  type: 'Button' | 'Input';

  @ApiProperty({
    type: String,
    description: 'Set the value of the name field.',
  })
  value: string;
}

export class IntentDto<R extends Record<string, any> = Record<string, any>> {
  @ApiProperty({
    type: [
      AgnosticComponentDto,
      InputComponentDto,
      OptionComponentDto,
      InputOptionComponentDto,
      ConditionalComponentDto,
    ],
    description: 'Form configuration items for constructing a transaction.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  components: Array<
    | AgnosticComponentDto<R>
    | InputComponentDto<R>
    | OptionComponentDto<R>
    | InputOptionComponentDto<R>
    | ConditionalComponentDto<R>
  >;

  @ApiPropertyOptional({
    type: String,
    description: `
      should bind value with submit button.
      if it is true, then customization of a specific field is not possible, and all fields will be bound to the submit button.
      if it is 'R', it indicates that the creator can customize the value of that field, setting it to the submit button.
    `,
  })
  @IsOptional()
  binding?: keyof R | true;

  // @ApiPropertyOptional({ description: 'Human-readable description (optional)' })
  // @IsOptional()
  // @IsString()
  // humanize?: string;

  @ApiPropertyOptional({
    type: [PresetItemDto<R>],
    description: 'List of components',
  })
  @IsArray()
  @ValidateNested({ each: true })
  preset?: Array<PresetItemDto<R>>;
}

export class MagicLinkMetadataDto {
  @ApiPropertyOptional({
    type: String,
    description: 'display title of the created Magic Link page.',
  })
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'description of the magic link',
  })
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    type: String,
    description:
      'main image of the magic link. You can set a picture link, or by placing an image with the same name as the action id under assets/galleries, to set the main image.',
  })
  @IsString()
  gallery?: string;
}

export class ActionMetadata<
  R extends Record<string, any> = Record<string, any>,
> {
  @ApiProperty({
    type: String,
    description:
      'In the create action panel, the title displayed for the action.',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    type: String,
    description:
      'In the create action panel, the logo of the action. You can set a picture link, or by placing an image with the same name as the action id under assets/logos, to set the logo.',
  })
  @IsString()
  logo?: string;

  @ApiProperty({
    type: String,
    readOnly: true,
    description: `A description of the action's functionality.`,
  })
  @IsString()
  description: string;

  // @ApiPropertyOptional({
  //   type: 'object',
  //   additionalProperties: { type: 'string' },
  //   description: 'Metadata for the action, key-value pairs (optional)',
  // })
  // @IsOptional()
  // @IsObject()
  // metadata?: { [key: string]: string };

  @ApiProperty({
    type: [NetworkDto],
    description:
      'Networks supported by the action, at least one must be specified.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  networks: NetworkDto[];

  // @ApiProperty({ type: DAppDto, description: 'DApp details' })
  // @ValidateNested()
  // dApp: DAppDto;

  @ApiProperty({
    type: AuthorDto,
    description: 'Author details',
  })
  @IsOptional()
  @ValidateNested()
  author: AuthorDto;

  @ApiProperty({ type: IntentDto<R>, description: 'Intent details' })
  @ValidateNested()
  intent: IntentDto<R>;

  @ApiPropertyOptional({
    type: MagicLinkMetadataDto,
    description:
      'Set the default title, description, and main image for the Magic Link.',
  })
  @ValidateNested()
  magicLinkMetadata?: MagicLinkMetadataDto;

  @ApiProperty({
    type: Number,
    description: `
      Set the maximum value for the commission, which is
      a percentage representing the share of the commission that the
      creator of the magic link will receive. Once this value is set,
      as an action developer, you need to create a transfer transaction
      in the generateTransaction method to reimburse the creator based
      on the commission value.`,
  })
  @IsOptional()
  maxCommission?: number;
}

export function isOptionComponentDto<R extends Record<string, any>>(
  component:
    | OptionComponentDto<R>
    | InputOptionComponentDto<R>
    | InputComponentDto<R>
    | ConditionalComponentDto<R>
    | AgnosticComponentDto<R>,
): component is OptionComponentDto<R> | ConditionalComponentDto<R> {
  return (
    !!component &&
    (component.type === 'searchSelect' ||
      component.type === 'conditionalSelect')
  );
}
