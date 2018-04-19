import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as cors from 'cors';
import * as path from 'path';
import { ApiRouting } from '../api.routing';

export class NodeServerConfig {
    private router: express.Router = express.Router();

    constructor() { }

    public initializeNodeServerConfig(app: express.Express, port: any) {
        app.set('port', port);
        app.use(cors({credentials: true, origin: 'http://localhost:90'}));
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.use(express.static(path.join(__dirname, 'dist')));
        this.configureBaseRoute(app);
        ApiRouting.ConfigureRoutes(this.router)
    }

    public ShowConnectionStatus(app: express.Express, port: any) {
        app.listen(port, () => {
            console.log(`Server started on port: ${port}`);
        });
    }
    
    private configureBaseRoute(app: express.Express) {
        app.use('/', this.router);
    }
}