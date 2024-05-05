import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaturantDto } from './create-restaturant.dto';

export class UpdateRestaturantDto extends PartialType(CreateRestaturantDto) {}
