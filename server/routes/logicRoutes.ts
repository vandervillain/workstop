import express from 'express';
import { BusinessLogic, QuerySettings } from '../logic/businessLogic';

var router = express.Router();

router.get('/', function(req, res) { res.send(''); });

router.get('/populate', function(req, res) { 
    var bl = new BusinessLogic();
    bl.populateDb();
    res.send('done'); 
});

router.get('/categories', function(req, res) { 
    var bl = new BusinessLogic();
    bl.getCategories().then(r => res.json(r));
});

router.get('/post/:id', function(req, res) { 
    var bl = new BusinessLogic();
    bl.getPost(req.params.id).then(r => res.json(r));
});

router.post('/post/:id', function(req, res) { 
    var bl = new BusinessLogic();
    if (req.params.id) { // update
        res.json({});
    }
    else { // create
        bl.createPost(req.body).then(r => res.json(r));
    }
});

router.post('/posts', function(req, res) { 
    var bl = new BusinessLogic();
    var qs = req.body as QuerySettings;
    bl.getPosts(qs).then(r => res.json(r));
});

export default router;