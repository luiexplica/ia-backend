import { PartialType } from '@nestjs/mapped-types';
import { CreateMikroDto } from './create-mikro.dto';

export class UpdateMikroDto extends PartialType(CreateMikroDto) {}
