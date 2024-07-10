export interface DeleteResponse {
    data: string;
}

export const deleteautomobile = async (
    res: any,
    client: any,
    id: string
): Promise<void> => {
    try {
        if (id === null || id === '' || isNaN(parseInt(id))) {
            res.status(400).send({ error: "Bad Request, required parameter: id(int)" });
            return;
        }

        const checkExistenceQuery = `SELECT * FROM "Automobiles" WHERE id = $1;`;
        const result = await client.query(checkExistenceQuery, [id]);

        if (result.rows.length === 0) {
            res.status(404).send({ error: `Automobile with id ${id} not found.` });
            return;
        }

        const deleteQuery = `DELETE FROM "Automobiles" WHERE id = $1;`;
        client.query(deleteQuery, [id]);

        res.status(204).send({ data: "Automobile deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: `${error}` });
    }
};

export interface DeleteBrandResponse {
    data: string;
}

export const deletebrand = async (
    res: any,
    client: any,
    brand: string
): Promise<void> => {
    try {
        if (brand === undefined || brand === null || brand === '') {
            res.status(400).send({ error: "Bad Request, required parameter: brand(string)" });
            return;
        }

        let carBrand: string = brand.toLowerCase();

        const checkExistenceQuery: string = `SELECT * FROM "Automobiles" WHERE brand = $1;`;
        const result = await client.query(checkExistenceQuery, [carBrand]);

        if (result.rows.length === 0) {
            res.status(404).send({ error: `Automobiles with brand "${carBrand}" not found.` });
            return;
        }

        const deleteQuery: string = `DELETE FROM "Automobiles" WHERE brand = $1;`;
        await client.query(deleteQuery, [carBrand]);

        res.status(204).send({ data: `Automobiles with brand ${carBrand} deleted successfully.` });
    } catch (error) {
        res.status(500).send({ error: `${error}` });
    }
}