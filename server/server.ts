import express from 'express';
import bodyParser from 'body-parser';
import { WorkLogic, QuerySettings } from './logic/workLogic';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.mountRoutes();
    }

    private mountRoutes (): void {
        var router = express.Router();

        router.get('/', function(req, res) { res.send(''); });
        
        router.get('/categories', function(req, res) { 
            var bl = new WorkLogic();
            res.json(bl.getCategories());
        });

        router.post('/work', function(req, res) { 
            var bl = new WorkLogic();
            var qs = req.body as QuerySettings;
            res.json(bl.getWork(qs));
        });

        this.app.use('/', router);
    }
}

export default new Server().app;