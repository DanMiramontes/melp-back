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
      where: { id },
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

  async statistics(latitude: Number, longitude: Number, radius: Number){

    if(!latitude || !longitude || !radius){
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: `latitude, longitude, radius is needed` 
      });
    }

    const lat = Number(latitude);
    const lng = Number(longitude);
    const rad = Number(radius);

    try {
      const response = await this.restaurantRepository
      .createQueryBuilder('restaurants')
      .select("AVG(restaurants.rating)", "avg")
      .addSelect("STDDEV_POP(restaurants.rating)", "stdRating")
      .addSelect("COUNT(*)", "count")
      .where(
       `(6371000 * acos(cos(radians(:lat)) * cos(radians(restaurants.lat)) * cos(radians(restaurants.lng) - radians(:lng)) + sin(radians(:lat)) * sin(radians(restaurants.lat)))) < :radius`,
       { lat, lng, radius }
     )
     .getRawOne();

     return {
      count : Number(response.count),
      avg: response.stdRating,
      std: response.avg
     }

    } catch (error) {
      this.handleExceptions(error);
      
    }
  }
  
  private handleExceptions( error:any ){
    if( error.code === '23505')
    throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs'); 
  }
  
  
}
