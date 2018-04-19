import * as express from 'express';
import { DetailsController } from './routes/details.controller';

export class ApiRouting {
    public static ConfigureRoutes(app: express.Router) {
        app.use(DetailsController.route, new DetailsController().router);

        app.use(function (err, req, res, next) {
            ApiRouting.serverError(req, res, err);
        });
    }

    private static serverError(req: express.Request, res: express.Response, error) {
        error = {
            code: error.code,
            message: error.sqlMessage,
        }
        let body = {
            message: error.sqlMessage
        }

        res.sendStatus(error.code).json(body);
    }
}