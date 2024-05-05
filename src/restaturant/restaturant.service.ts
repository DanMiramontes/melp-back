import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateRestaturantDto } from './dto/create-restaturant.dto';
import { UpdateRestaturantDto } from './dto/update-restaturant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaturant } from './entities/restaturant.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RestaturantService {

  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Restaturant) private readonly restaurantRepository: Repository<Restaturant>,
    private readonly dataSource: DataSource,
  ){}
  async create(createRestaturantDto: CreateRestaturantDto) {
    try {

      const restaturant = await this.restaurantRepository.save( createRestaturantDto);
      return restaturant;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all restaturant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaturant`;
  }

  update(id: number, updateRestaturantDto: UpdateRestaturantDto) {
    return `This action updates a #${id} restaturant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaturant`;
  }

  private handleExceptions( error:any ){
    if( error.code === '23505')
    throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs'); 
  }

  async deleteAllProducts(){
    const query = this.restaurantRepository.createQueryBuilder('restaurant');
    try {
      return await query
      .delete()
      .where({})
      .execute();
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  

  
}
