import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'restaurants'})
export class Restaturant {

    @PrimaryGeneratedColumn('uuid')
    id: string;

 
    @Column('float')
    rating: number;


    @Column('text')
    name: string;


    @Column('text')
    site: string;


    @Column('text')
    email: string;


    @Column('text')
    phone: string;

    @Column('text')
    street: string;

 
    @Column('text')
    city: string;


    @Column('text')
    state: string;

    @Column({
        type: 'double precision',
        comment: 'Latitude value for the location'
    })
    lat: number;

    @Column({
        type: 'double precision',
        comment: 'Longitude value for the location'
    })
    lng: number;

    @Column({
        default: true
    })
    status: Boolean;
}



