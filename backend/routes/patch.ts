import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import { QueryResult } from 'pg';

export const patchautomobile = async (res: Response, client: PoolClient, id: string, json: any): Promise<void> => {
    try {
        if (id === null || id === '' || isNaN(parseInt(id))) {
            res.status(400).send({ error: "Bad Request, required parameter: id(int)" });
            return;
        }

        const checkExistenceQuery = `SELECT * FROM "Automobiles" WHERE id = $1;`;
        let result: QueryResult<any> = await client.query(checkExistenceQuery, [id]);

        if (result.rows.length === 0) {
            res.status(404).send({ error: `Automobile with id ${id} not found.` })
            return;
        }

        if (Object.keys(json).length < 1) {
            res.status(400).send({ error: "Bad Request, at least one field is required." });
            return;
        }
                let update = `UPDATE "Automobiles" SET `;
                for (let key in json) {
                    if (key !== 'id') {
                        let value = json[key];
                        if (typeof value === 'string') {
                            value = `'${value}'`;
                        }
                        update += `${key} = ${value}, `;
                    }
                }
                result = (await client.query(update)).rows[0] as QueryResult<any>;
                result.rows.forEach((row) => { row['id'] = parseInt(row['id']); });

                res.status(200).send({ data: result });
        res.status(200).send({ data: result });
    } catch (error) {
        res.status(500).send({ error: `${error}` });
    }
}
