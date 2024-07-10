import { PoolClient } from "pg";
import * as Express from 'express';
const { generateRandom } = require('../utils');

export const postadd = async (res: Express.Response, client: PoolClient, json: any) => {
    try {
        if (!json) {
            res.status(400).send({error: 'Bad Request, JSON body is missing'});
            return;
        }

        const requiredFields = ['type', 'brand', 'year', 'color', 'vin'];
        const check = requiredFields.every(field => field in json);
        if (!check) {
            res.status(400).send({error: 'Bad Request, required fields: type, brand, year, color, vin'});   
            return;
        }
        
        const insert = `INSERT INTO "Automobiles" (type, brand, year, color, vin) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [json.type, json.brand, json.year, json.color, json.vin];

        const result = (await client.query(insert, values)).rows[0];
        result.id = parseInt(result.id);
        res.status(201).send({data: result});

    } catch (error) {
        res.status(500).send({error: `${error}`});       
    }
}

export const postRandom = async (res: Express.Response, client: PoolClient, json: any) => {
    try {
        if ('count' in json === false) {
            res.status(400).send({error: "Bad Request, required parameter: count(int)"});
            return;
        }
    
        if (json.count < 1) {
            res.status(400).send({error: "Bad Request, count must be greater than 0"});
            return;
        }
    
    
        const insert = `INSERT INTO "Automobiles" (type, brand, year, color, vin) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const data = generateRandom(json.count);

        let result: object[] = [];
    
        for (const instance of data) {
            const values = [instance.type, instance.brand, instance.year, instance.color, instance.vin];
            const queryResult = await client.query(insert, values);
            result.push(queryResult.rows[0]);
        }

        res.status(201).send({data: result});   

    } catch (error) {
        res.status(500).send({error: `${error}`}); 
    }
}