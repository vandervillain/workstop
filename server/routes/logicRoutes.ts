import express from 'express';
import { WorkLogic, QuerySettings } from '../logic/workLogic';

var router = express.Router();

router.get('/', function(req, res) { res.send(''); });
router.get('/categories', function(req, res) { 
    var bl = new WorkLogic();
    res.json(bl.getCategories());
});

router.post('/work', function(req, res) { 
    console.log("req.user:");
    console.log(req.user);
    var bl = new WorkLogic();
    var qs = req.body as QuerySettings;
    res.json(bl.getWork(qs));
});

export default router;