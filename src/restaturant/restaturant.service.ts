import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateRestaturantDto } from './dto/create-restaturant.dto';
import { UpdateRestaturantDto } from './dto/update-restaturant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaturant } from './entities/restaturant.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1, status = true } = paginationDto;
    const totalPage = await this.restaurantRepository.count({
      where : {
        status
      }
    });
    
    const currentPage = page;
    const perPage = limit

    return {
      data: await this.restaurantRepository.find({
        select: {
          id: true,
          rating: true,
          name: true,
          site: true,
          email: true,
          phone: true,
          street: true,
          city: true,
          state: true,
          lat: true,
          lng:  true,

        },
        skip: ( currentPage - 1 ) * perPage,
        take: perPage,
        where : {
          status
        },
      }),
      meta: {
        total: totalPage,
        page: currentPage,
        lastPage: Math.ceil( totalPage / perPage)
      }
    }
  }

  async findOne(id: string) {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id }
    });

    if( !restaurant) {
      throw new BadRequestException({
        status: HttpStatus.NOT_FOUND,
        message: `Restaurant with id ${ id } not found` 
      });
    }
    
    return restaurant;
  }

  async update(id: string, updateRestaturantDto: UpdateRestaturantDto) {
    await this.findOne(id);

    const response = await this.restaurantRepository.update(id, updateRestaturantDto);

    return {
      id,
      data: updateRestaturantDto,
      response
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    const restaurant = await this.restaurantRepository.update(id,{ status: false});

    if( !restaurant ) throw new NotFoundException(`Product with id ${ id } not found`);
  }

  private handleExceptions( error:any ){
    if( error.code === '23505')
    throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs'); 
  }

  async deleteAllRestaurants(){
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
