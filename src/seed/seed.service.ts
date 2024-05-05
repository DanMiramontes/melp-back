import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import csvParser from 'csv-parser';
import { resolve } from 'path';
import { CreateRestaturantDto } from 'src/restaturant/dto/create-restaturant.dto';

@Injectable()
export class SeedService {

    async runSeed() {

        let data: CreateRestaturantDto[] = [];
        const path = './src/seed/data/restaurantes.csv'
        data = await this.readCsvFile(path);

        

        return {
            data,
            message:'SEED_EXECUTE'
        }
    }


    async readCsvFile(filePath: string): Promise<any[]>{
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
