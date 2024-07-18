import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class NetworkDto {
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

class DAppDto {
  @ApiProperty({ type: String, description: 'DApp name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ type: String, description: 'DApp URL' })
  @IsOptional()
  @IsString()
  url?: string;
}

class AuthorDto {
  @ApiProperty({ type: String, description: 'Author name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ type: String, description: 'Twitter url (optional)' })
  @IsOptional()
  @IsString()
  x?: string;

  @ApiPropertyOptional({ type: String, description: 'GitHub url (optional)' })
  @IsOptional()
  @IsString()
  github?: string;

  @ApiPropertyOptional({ type: String, description: 'Discord url (optional)' })
  @IsOptional()
  @IsString()
  discord?: string;
}

class ComponentDto {
  @ApiProperty({ type: String, description: 'Component name' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'Component label' })
  @IsString()
  label: string;

  @ApiProperty({ type: String, description: 'Component description' })
  @IsString()
  desc: string;

  @ApiProperty({
    type: String,
    enum: ['input', 'searchSelect', 'searchSelectErc20', 'text'],
    description: 'Component type',
  })
  @IsEnum(['input', 'searchSelect', 'searchSelectErc20', 'text'])
  type: 'input' | 'searchSelect' | 'searchSelectErc20' | 'text';

  @ApiProperty({ type: String, description: 'Validation regex' })
  @IsString()
  regex: string;

  @ApiProperty({ type: String, description: 'Regex description' })
  @IsString()
  regexDesc: string;

  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        label: { type: 'string', description: 'Option label' },
        value: { type: 'string', description: 'Option value' },
      },
    },
    description: 'Component options (optional)',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  options?: { label: string; value: string }[];
}

class IntentDto {
  @ApiProperty({ type: [ComponentDto], description: 'List of components' })
  @IsArray()
  @ValidateNested({ each: true })
  components: ComponentDto[];

  @ApiPropertyOptional({ description: 'Human-readable description (optional)' })
  @IsOptional()
  @IsString()
  humanize?: string;
}

export class ActionMetadata {
  @ApiProperty({ type: String, description: 'Action title' })
  @IsString()
  title: string;

  @ApiProperty({ type: String, description: 'Action logo' })
  @IsString()
  logo: string;

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
    description: 'Metadata for the action, key-value pairs',
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

  @ApiPropertyOptional({ type: AuthorDto, description: 'Author details' })
  @IsOptional()
  @ValidateNested()
  author?: AuthorDto;

  @ApiProperty({ type: IntentDto, description: 'Intent details' })
  @ValidateNested()
  intent: IntentDto;
}
