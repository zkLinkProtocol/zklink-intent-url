import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class NetworkDto {
  @ApiProperty({ type: String, description: 'Network name' })
  name: string;

  @ApiProperty({ type: String, description: 'Network chain ID' })
  chainId: string;

  @ApiProperty({ type: String, description: 'Contract address' })
  contractAddress: string;
}

export class DAppDto {
  @ApiProperty({ type: String, description: 'DApp name' })
  name: string;

  @ApiPropertyOptional({ type: String, description: 'DApp URL' })
  url?: string;
}

export class AuthorDto {
  @ApiProperty({ type: String, description: 'Author name' })
  name: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Twitter url (optional)',
  })
  x?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'GitHub url (optional)',
  })
  github?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Discord url (optional)',
  })
  discord?: string;
}

export class ComponentDto {
  @ApiProperty({ type: String, description: 'Component name' })
  name: string;

  @ApiProperty({ type: String, description: 'Component label' })
  label: string;

  @ApiProperty({ type: String, description: 'Component description' })
  desc: string;

  @ApiProperty({
    type: String,
    enum: ['input', 'searchSelect', 'searchSelectErc20', 'text'],
    description: 'Component type',
  })
  type: 'input' | 'searchSelect' | 'searchSelectErc20' | 'text';

  @ApiProperty({ type: String, description: 'Validation regex' })
  regex: string;

  @ApiProperty({ type: String, description: 'Regex description' })
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
  options?: {
    label: string;
    value: string;
  }[];
}

export class IntentDto {
  @ApiProperty({
    type: [ComponentDto],
    description: 'List of components',
  })
  components: ComponentDto[];

  @ApiPropertyOptional({ description: 'Human-readable description (optional)' })
  humanize?: string;
}

export class ActionMetadata {
  @ApiProperty({
    type: String,
    description: 'Action title',
  })
  title: string;

  @ApiProperty({
    type: String,
    readOnly: true,
    description: 'Action description',
  })
  description: string;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: { type: 'string' },
    description: 'Metadata for the action, key-value pairs',
  })
  metadata?: {
    [key: string]: string;
  };

  @ApiProperty({
    type: [NetworkDto],
    description: 'Network details',
  })
  networks: NetworkDto[];

  @ApiProperty({
    type: DAppDto,
    description: 'DApp details',
  })
  dApp: DAppDto;

  @ApiPropertyOptional({
    type: AuthorDto,
    description: 'Author details',
  })
  author?: AuthorDto;

  @ApiProperty({
    type: IntentDto,
    description: 'Intent details',
  })
  intent: IntentDto;
}
