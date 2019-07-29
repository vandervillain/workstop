import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import { Init as initAuth } from './utils/auth';
import accountRoutes from './routes/accountRoutes';
import logicRoutes from './routes/logicRoutes';
import { User, Comment, Post } from './logic/schema';

class Server {
    public app: express.Application;
    isProduction: boolean;

    constructor() {
        this.app = express();
        this.app.use(morgan('combined')); // log every request to the console
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.isProduction = this.app.get('env') === 'production';

        initAuth(this.app);
        this.mountRoutes();
    }

    private mountRoutes() {       
        this.app.use('/auth/logout', function(req, res) {
            var logout = (req, res) => {
                req.logout();
                res.redirect('http://localhost:3000/logout');
            };
        
            //if (req.session) {
                //req.session.destroy((e) => logout(req, res));
            //} else 
            logout(req, res);
        });

        this.app.use('/account', passport.authenticate('jwt', {session: false}), accountRoutes);
        this.app.use('/', logicRoutes);
    }
}

export default new Server().app;