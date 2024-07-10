const axios = require('axios');
import { Response } from 'express';

export const getall = async (res: Response, client: any) => {
    try {
        const result = (await client.query('SELECT * FROM "Automobiles"')).rows;
        result.forEach((json: any) => {
            json.id = parseInt(json.id);
        });

        res.status(200).send({data: result});
    } catch (error) {
        res.status(500).send({error: `${error}`})     
    }
}

export const getById = async (res: Response, client: any, id: string): Promise<void> => {
    try {
        if (id === null || id === '' || isNaN(parseInt(id))){
            res.status(400).send({error: "Bad Request, required parameter: id(int)"});
            return;
        }

        const query = 'SELECT * FROM "Automobiles" WHERE id = $1';
        let result: any = (await client.query(query, [id]));
        
        if (result.rows.length === 0) {
            res.status(404).send({error: `Automobile with id ${id} not found.`});
            return;
        }
        result = result.rows[0];
        result.id = parseInt(result.id);

        res.status(200).send({data: result});
        
    } catch (error) {
        res.status(500).send({error: `${error}`});
    }

}

export const getCarInfo = async (res: Response, vin: string): Promise<void> => {
    try {
        if (vin === null || vin === ''){
            res.status(400).send({error: "Bad Request, required parameter: vin(string)"});
            return;
        }

        const URL = `${process.env.CARINFO_API}/vinlookup?vin=${vin}`;
        const config = {
            headers: {
                "X-Api-Key": process.env.CARINFO_API_KEY,
              },
            validateStatus: (status: number) => status >= 200 
        }

        const result = await axios.get(URL, config);
        if (result.data.error){
            res.status(400).send({error: result.data.error});
            return;
        }

        res.status(200).send({data: result.data});
    } catch (error) {
        res.status(500).send({error: `${error}`});
    }
}

export const getCarModels = async (res: Response, parameters: any): Promise<void> => {
    try {
        const queryString = Object.keys(parameters).map(key => key + '=' + parameters[key]).join('&');
        const URL = `${process.env.CARINFO_API}/cars?${queryString}`;
        const config = {
            headers: {
                "X-Api-Key": process.env.CARINFO_API_KEY,
            },
            validateStatus: (status: number) => status >= 200 
        }

        const result = await axios.get(URL, config);
        if (result.data.error){
            res.status(400).send({error: result.data.error});
            return;
        }

        res.status(200).send({data: result.data});
    } catch (error) {
        res.status(500).send({error: `${error}`});
    }
}

export const getNews = async (res: Response, parameters: any): Promise<void> => {
    try {
        const queryString = Object.keys(parameters).map(key => key + '=' + parameters[key]).join('&');
        console.log(queryString);
        const URL = `${process.env.NEWS_API}/everything?${queryString}`;
        const config = {
            headers: {
                "Authorization": `${process.env.NEWS_API_KEY}`
            },
            validateStatus: (status: number) => status >= 200 
        }

        const result = await axios.get(URL, config);
        if (result.data.error){
            res.status(400).send({error: result.data.error});
            return;
        }

        res.status(200).send({data: result.data});

    } catch (error) {
        res.status(500).send({error: `${error}`});
    }
}
