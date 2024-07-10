import express, { Request, Response } from 'express';
const app = express();

import { mapRoutes } from "./utils";
import { client, initialize, cleanup } from "./config";

import { getall, getById, getCarInfo, getCarModels, getNews } from './routes/get';
import { postadd, postRandom } from './routes/post';
import { deleteautomobile, deletebrand } from './routes/delete';
import { putupdate, putregenerate } from './routes/put';
import { patchautomobile } from './routes/patch';
import bodyParser from 'body-parser';
import { NextFunction } from 'express';


const port = 3000;
 
initialize(client);
app.use(bodyParser.json());
app.all('/*', function (req: Request, res: Response, next: NextFunction) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers',  'Origin,Accept, X-Requested-With, Content-Type, Authorization, X-Access-Token');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
  

app.get('/automobiles', async (_, res: Response) => {
    console.log('GET /automobiles')
    await getall(res, client);
});
app.get('/automobiles/:id', async (req: Request, res: Response) => {
    console.log('GET /automobiles/:id')
    await getById(res, client, req.params.id);
});
app.get('/carinfo/:vin', async (req: Request, res: Response) => {
    console.log('GET /carinfo/:vin')
    await getCarInfo(res, req.params.vin);
});
app.get('/carinfo', async (req: Request, res: Response) => {
    console.log('GET /carinfo')
    await getCarModels(res, req.query);
});
app.get('/news', async (req: Request, res: Response) => {
    console.log('GET /news')
    await getNews(res, req.query);    
});

app.post('/automobiles', async (req: Request, res: Response) => {
    console.log('POST /automobiles')
    await postadd(res, client, req.body);
});
app.post('/automobiles/random', async (req: Request, res: Response) => {
    console.log('POST /automobiles/random')
    await postRandom(res, client, req.body);
});


app.delete('/automobiles/:id', async (req: Request, res: Response) => {
    console.log('DELETE /automobiles/:id')
    await deleteautomobile(res, client, req.params.id);
});
app.delete('/automobiles/brand/:brand', async (req: Request, res: Response) => {
    console.log('DELETE /automobiles/brand/:brand')
    await deletebrand(res, client, req.params.brand);
});


app.put('/automobiles/:id', async (req: Request, res: Response) => {
    console.log('PUT /automobiles/:id')
    await putupdate(res, client, req.params.id, req.body);
});
app.put('/automobiles/:id/regenerate', async (req: Request, res: Response) => {
    console.log('PUT /automobiles/:id/regenerate')
    await putregenerate(res, client, req.params.id);
});


app.patch('/automobiles/:id', async (req: Request, res: Response) => {
    console.log('PATCH /automobiles/:id')
    await patchautomobile(res, client, req.params.id, req.body);
});

const mappedRoutes = mapRoutes(app);

app.use((req, res) => {
    if (!mappedRoutes.has(req.url)) {
        res.status(404).send({ error: 'Route not found.'});
        return;
    }
    if (!mappedRoutes.get(req.url).includes(req.method)) {
        res.status(405).send({error: 'Method not allowed.'});
        return;
    }
});

var server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})

process.on('SIGINT', async () => {
    console.log('\nReceived SIGINT. Cleaning up and exiting...');
    cleanup(client);
    server.close((err) => {
        process.exit(err ? 1 : 0);
    });
});