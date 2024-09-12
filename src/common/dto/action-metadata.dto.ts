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

  @ApiProperty({ type: String, description: 'Contract address' })
  @IsString()
  contractAddress: string;
}

export class DAppDto {
  @ApiProperty({ type: String, description: 'DApp name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ type: String, description: 'DApp URL (optional)' })
  @IsOptional()
  @IsString()
  url?: string;
}

export class AuthorDto {
  @ApiProperty({ type: String, description: 'Author name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ type: String, description: 'Twitter url (optional)' })
  @IsOptional()
  @IsString()
  x?: string;

  @ApiProperty({ type: String, description: 'GitHub url' })
  @IsString()
  github: string;

  @ApiPropertyOptional({ type: String, description: 'Discord url (optional)' })
  @IsOptional()
  @IsString()
  discord?: string;
}

export class OptionDto {
  @ApiProperty({ description: 'Option label' })
  @IsString()
  label: string;

  @ApiProperty({ description: 'Option value' })
  @IsString()
  value: string;

  @ApiPropertyOptional({ description: 'chain id' })
  @IsString()
  chainId?: string;

  @ApiPropertyOptional({ description: 'default value' })
  @IsBoolean()
  default?: boolean;
}
export class BaseComponentDto<T extends string> {
  @ApiProperty({ type: String, description: 'Component name' })
  @IsString()
  name: T;

  @ApiProperty({ type: String, description: 'Component label' })
  @IsString()
  label: string;

  @ApiProperty({ type: String, description: 'Component description' })
  @IsString()
  desc: string;

  @ApiProperty({ type: String, description: 'Validation regex' })
  @IsString()
  regex: string;

  @ApiProperty({ type: String, description: 'Regex description' })
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
    description: 'Component type',
  })
  @IsEnum(['searchSelect', 'searchSelectErc20'])
  type: 'searchSelect' | 'searchSelectErc20';

  @ApiProperty({
    type: 'array',
    items: { $ref: getSchemaPath(OptionDto) },
    description: 'Component options (optional)',
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
    description: 'Set the name field for a specific component.',
  })
  field: N;

  @ApiProperty({
    type: String,
    description: "Set up the trigger's text",
  })
  title: string;

  @ApiProperty({
    type: String,
    enum: ['input', 'text'],
    description: "Set up the trigger's text",
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
    description: 'List of components',
  })
  @IsArray()
  @ValidateNested({ each: true })
  components: Array<PlainComponentDto<N> | OptionComponentDto<N>>;

  @ApiPropertyOptional({
    type: String,
    description: 'should bind value with submit button',
  })
  @IsOptional()
  bind?: N | true;

  @ApiPropertyOptional({ description: 'Human-readable description (optional)' })
  @IsOptional()
  @IsString()
  humanize?: string;

  @ApiPropertyOptional({
    type: [PlainComponentDto, OptionComponentDto],
    description: 'List of components',
  })
  @IsArray()
  @ValidateNested({ each: true })
  preset?: Array<PresetItemDto<N>>;
}

export class MagicLinkMetadataDto {
  @ApiPropertyOptional({ type: String, description: 'name of the magic link' })
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
    description: 'main image of the magic link',
  })
  @IsString()
  gallery?: string;
}

export class ActionMetadata<N extends string> {
  @ApiProperty({ type: String, description: 'Action title' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ type: String, description: 'Action logo' })
  @IsString()
  logo?: string;

  @ApiProperty({
    type: String,
    readOnly: true,
    description: 'Action description',
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: { type: 'string' },
    description: 'Metadata for the action, key-value pairs (optional)',
  })
  @IsOptional()
  @IsObject()
  metadata?: { [key: string]: string };

  @ApiProperty({ type: [NetworkDto], description: 'Network details' })
  @IsArray()
  @ValidateNested({ each: true })
  networks: NetworkDto[];

  @ApiProperty({ type: DAppDto, description: 'DApp details' })
  @ValidateNested()
  dApp: DAppDto;

  @ApiPropertyOptional({
    type: AuthorDto,
    description: 'Author details (optional)',
  })
  @IsOptional()
  @ValidateNested()
  author: AuthorDto;

  @ApiProperty({ type: IntentDto<N>, description: 'Intent details' })
  @ValidateNested()
  intent: IntentDto<N>;

  @ApiPropertyOptional({
    type: MagicLinkMetadataDto,
    description: 'magic link default value',
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
