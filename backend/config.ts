const { Client } = require('pg');
require('dotenv').config({path: 'variables.env'});



export const client = new Client({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE
})

export interface Automobile {
    id: number;
    type: string;
    brand: string;
    year: number;
    color: string;
    vin: string;
}

export const initialize = (client: any): void => {
    client.connect().then(() => {
        const drop: string = 'DROP TABLE IF EXISTS "Automobiles"';
        const create: string = `CREATE TABLE "Automobiles" (
            id BIGSERIAL PRIMARY KEY,
            type VARCHAR(255) NOT NULL,
            brand VARCHAR(255) NOT NULL,
            year INTEGER NOT NULL,
            color VARCHAR(255) NOT NULL,
            vin VARCHAR(255) NOT NULL
        )`;

        client.query(drop, (err: Error, _: any) => { if (err) console.log("Error dropping table: " + err) });
        client.query(create, (err: Error, _: any) => { if (err) console.log("Error creating table: " + err) });

        console.log('Connected to the database');
    }).catch((err: Error) => {
        console.log('Error: ' + err);
        process.exit(1);
    });
}

export const cleanup = (client: any): void => {
    client.end().then(() => {
        console.log('Disconnected from the database');
    }).catch((err: Error) => {
        console.log('Error: ' + err);
        process.exit(1);
    })
}

// CREATE TABLE "Automobiles" (
//     id SERIAL PRIMARY KEY,
//     type VARCHAR(255) NOT NULL,
//     brand VARCHAR(255) NOT NULL,
//     year INTEGER NOT NULL,
//     color VARCHAR(255) NOT NULL,
//     vin VARCHAR(255) NOT NULL
// );