import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import { Init as initAuth } from './auth/passport';
import accountRoutes from './routes/accountRoutes';
import logicRoutes from './routes/logicRoutes';

class Server {
    public app: express.Application;
    isProduction: boolean;

    constructor() {
        this.app = express();
        this.app.use(morgan('combined')); // log every request to the console
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.isProduction = this.app.get('env') === 'production';

        //this.sessionConfig();
        //initFacebookAuth(this.app);
        initAuth(this.app);
        this.mountRoutes();
    }

    // private sessionConfig() {
    //     var sess: any = {
    //         genid: (req: any) => { uid.sync(18) },
    //         secret: 'd0899e5e-a695-40e8-83b4-9c48487783df',
    //         cookie: {
    //             maxAge: 60000,
    //             secure: false
    //         },
    //         resave: false,
    //         saveUninitialized: false
    //     };

    //     if (this.isProduction) {
    //         this.app.set('trust proxy', 1) // trust first proxy
    //         sess.cookie.secure = true // serve secure cookies
    //     }

    //     this.app.use(session(sess));
    // }

    private mountRoutes() {       
        this.app.use('/auth/logout', function(req, res) {
            var logout = (req, res) => {
                req.logout();
                res.redirect('http://localhost:3000/logout');
            };
        
            if (req.session) {
                req.session.destroy((e) => logout(req, res));
            } else logout(req, res);
        });

        this.app.use('/account', passport.authenticate('jwt', {session: false}), accountRoutes);
        this.app.use('/', passport.authenticate('jwt', {session: false}), logicRoutes);
    }
}

export default new Server().app;