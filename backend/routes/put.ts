import { PoolClient } from 'pg';
import { generateRandom } from '../utils';
import * as Express from 'express';

export const putupdate = async (res: Express.Response, client: PoolClient, id: string, json: any): Promise<void> => {
    try {
        const requiredFields: string[] = ['type', 'brand', 'year', 'color', 'vin'];
        let check: boolean = requiredFields.every((field: string) => field in json);
        if (!check) {
            res.status(400).send({error: 'Bad Request, required fields: type, brand, year, color, vin'});
            return;
        }

        check = isNaN(parseInt(id));
        if (check) {
            res.status(400).send({error: 'Bad Request, required parameter: id(int)'});
            return;
        }

        const checkExistenceQuery: string = `SELECT * FROM "Automobiles" WHERE id = $1;`;
        const result = await client.query(checkExistenceQuery, [id]);

        if (result.rows.length === 0) {
            res.status(404).send({message: `Automobile with id ${id} not found.`});
            return;
        }

        let update: string = `UPDATE "Automobiles" SET type=$1, brand=$2, year=$3, color=$4, vin=$5 WHERE id=$6;`;
        let values: any[] = [json.type, json.brand, json.year, json.color, json.vin, id];

        await client.query(update, values);

        res.status(200).send({data: {id: parseInt(id), ...json}})
    } catch (error) {
        res.status(500).send({error: `${error}`});
    }
}

export const putregenerate = async (res: Express.Response, client: PoolClient, id: string): Promise<void> => {
    try {
        if (id === null || id === '' || isNaN(parseInt(id))){
            res.status(400).send({error: "Bad Request, required parameter: id(int)"});
            return;
        }

        const checkExistenceQuery: string = `SELECT * FROM "Automobiles" WHERE id = $1;`;
        const result = await client.query(checkExistenceQuery, [id]);
        if (result.rows.length === 0) {
            res.status(404).send({error: `Automobile with id ${id} not found.`});
            return;
        }

        interface Automobile {
            type: string;
            brand: string;
            year: number;
            color: string;
            vin: string;
        }

        let data: Automobile = generateRandom(1)[0];
        let update: string = `UPDATE "Automobiles" SET type = $1, brand = $2, year = $3, color = $4, vin = $5 WHERE id = $6;`;
        let values: any[] = [data.type, data.brand, data.year, data.color, data.vin, id];

        await client.query(update, values);

        res.status(200).send({data: {id: parseInt(id), ...data}});

    } catch (error) {
        res.status(500).send({error: `${error}`});
    }
}
