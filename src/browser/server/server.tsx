import * as http from "http";
import * as express from "express";
const app = express();

import { BindBundle } from "./middle-bundle";
BindBundle(app, express);
import { BindPage as BindLandingPage } from "./middle-landing";
BindLandingPage(app);

let port = 3100;

http.createServer(app).listen(port, function(err) {
    if (err) {
        console.error("server handler", port, err);
    } else {
        console.info("server ready on", port);
    }
});
