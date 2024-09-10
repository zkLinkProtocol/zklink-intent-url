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
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { ValidateOptions } from '../decorators';

export class NetworkDto {
  @ApiProperty({ type: String, description: 'Network name' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'Network chain ID' })
  @IsString()
  chainId: string;
}

export class DAppDto {
  @ApiProperty({
    type: String,
    description: 'The name of the dApp to which the Action belongs.',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({ type: String, description: 'DApp URL (optional)' })
  @IsOptional()
  @IsString()
  url?: string;
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
  chainId?: string;

  @ApiPropertyOptional({
    description:
      'indicates whether this field is the default selected field; only one is allowed per network.',
  })
  @IsBoolean()
  default?: boolean;
}
export class BaseComponentDto<T extends string> {
  @ApiProperty({
    type: String,
    description:
      'The name will serve as the key in the formData within generateTransaction.',
  })
  @IsString()
  name: T;

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

  @ApiPropertyOptional({
    type: String,
    description: 'default value (optional)',
  })
  @IsString()
  defaultValue?: string;
}
export class PlainComponentDto<T extends string> extends BaseComponentDto<T> {
  @ApiProperty({
    type: String,
    enum: ['input', 'text'],
    description: 'Component type',
  })
  @IsEnum(['input', 'text'])
  type: 'input' | 'text';
}

export class OptionComponentDto<T extends string> extends BaseComponentDto<T> {
  @ApiProperty({
    type: String,
    enum: ['searchSelect', 'searchSelectErc20'],
    description: 'This component is a dropdown menu.',
  })
  @IsEnum(['searchSelect', 'searchSelectErc20'])
  type: 'searchSelect' | 'searchSelectErc20';

  @ApiProperty({
    type: 'array',
    items: { $ref: getSchemaPath(OptionDto) },
    description: 'Dropdown menu option configuration.',
  })
  @IsArray()
  @Type(() => OptionDto)
  @ValidateNested({ each: true })
  @ValidateIf((o) => ['select', 'searchSelectErc20'].includes(o.type))
  @ValidateOptions({ message: 'Invalid options based on type value' })
  options: OptionDto[];
}

export class PresetItemDto<N extends string> {
  @ApiProperty({
    type: String,
    description: 'Pre-set which form field the MagicLink trigger is bound to.',
  })
  field: N;

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

export class IntentDto<N extends string> {
  @ApiProperty({
    type: [PlainComponentDto, OptionComponentDto],
    description: 'Form configuration items for constructing a transaction.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  components: Array<PlainComponentDto<N> | OptionComponentDto<N>>;

  // @ApiPropertyOptional({ description: 'Human-readable description (optional)' })
  // @IsOptional()
  // @IsString()
  // humanize?: string;

  @ApiPropertyOptional({
    type: [PlainComponentDto, OptionComponentDto],
    description: 'List of components',
  })
  @IsArray()
  @ValidateNested({ each: true })
  preset?: Array<PresetItemDto<N>>;
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

export class ActionMetadata<N extends string> {
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

  @ApiProperty({ type: IntentDto<N>, description: 'Intent details' })
  @ValidateNested()
  intent: IntentDto<N>;

  @ApiPropertyOptional({
    type: MagicLinkMetadataDto,
    description:
      'Set the default title, description, and main image for the Magic Link.',
  })
  @ValidateNested()
  magicLinkMetadata?: MagicLinkMetadataDto;
}

export function isOptionComponentDto<N extends string>(
  component: OptionComponentDto<N> | PlainComponentDto<N> | undefined,
): component is OptionComponentDto<N> {
  return (
    !!component &&
    (component.type === 'searchSelect' ||
      component.type === 'searchSelectErc20')
  );
}
