import express from 'express';
import { IncomingForm } from 'formidable';
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

// create
router.post('/post', function(req, res) { 
    var form = new IncomingForm();
    form.parse(req, (e, fields, files) => {
        if (!e) {
            var bl = new BusinessLogic();
            bl.createPost(fields).then(r => res.json(r));
        }
    });
});

// update
router.post('/post/:id', function(req, res) { 
    var bl = new BusinessLogic();
    res.json({});
});

router.post('/posts', function(req, res) { 
    var bl = new BusinessLogic();
    var qs = req.body as QuerySettings;
    bl.getPosts(qs).then(r => res.json(r));
});

export default router;