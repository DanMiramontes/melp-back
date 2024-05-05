import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { CreateRestaturantDto } from 'src/restaturant/dto/create-restaturant.dto';
import { RestaturantService } from 'src/restaturant/restaturant.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaturant } from 'src/restaturant/entities/restaturant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {

    constructor(
        private readonly restaurantService: RestaturantService,
        @InjectRepository( Restaturant )
        private readonly restaurantRepository: Repository<Restaturant>
    ){}

    async runSeed() {

        let data: CreateRestaturantDto[] = [];
        const path = './src/seed/data/restaurantes.csv'
        data = await this.readCsvFile(path);

        await this.deleteTable();
        await this.insertRestaurants(data);

        return {
            data,
            message:'SEED_EXECUTE'
        }
    }

    private async deleteTable(){
        await this.restaurantService.deleteAllRestaurants();
        const queryBuilder = this.restaurantRepository.createQueryBuilder();
        await queryBuilder
           .delete()
           .where({})
           .execute();
    }

    private async insertRestaurants( data: CreateRestaturantDto[]){
        const restaurants = data;
        const insterPromises = [];

        restaurants.forEach( restaurant => {
            const data: CreateRestaturantDto = {
                rating: restaurant.rating,
                name: restaurant.name,
                site: restaurant.site,
                email: restaurant.email,
                phone: restaurant.phone,
                street: restaurant.street,
                city: restaurant.city,
                state: restaurant.state,
                lat: Number(restaurant.lat),
                lng: Number(restaurant.lng)
            }
            insterPromises.push( this.restaurantService.create(data));
        });

        await Promise.all( insterPromises );
        return true;
    }


    private async readCsvFile(filePath: string): Promise<any[]>{
        return new Promise((resolve, reject) =>{
            let result = [];
            const fileContest = readFileSync(filePath,'utf-8');
             result = parse(fileContest, {
                columns: true,  
            })
            resolve(result)
            if(result.length === 0){
                reject(result);
            }
        })
    
    }

}
