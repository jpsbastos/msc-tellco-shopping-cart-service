import express from "express";
import * as bodyParser from "body-parser";
import { Router } from "./src/routes/router";
import mongoose from "mongoose";
import { errorHandler } from "./src/helpers/error-handler";

const app: express.Application = express();
const routePrv: Router = new Router();

const MONGODB_URI = process.env.MONGODB_URI;

// support application/json type post data
app.use(bodyParser.json());
//support application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log ('ERROR connecting to: ' + MONGODB_URI + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + MONGODB_URI);
    }
});

routePrv.routes(app);

app.use(errorHandler);

app.listen( process.env.port || 5002, () => {
    console.log('Express server listening on port ' + process.env.port || 5002);
});
