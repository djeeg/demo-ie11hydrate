import * as React from "react";
import { renderToNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import * as fs from "fs";
import * as path from "path";
import Layout from "../root/Layout";
import * as getRawBody from "raw-body";

export function BindPage(app) {
    app.get("/", handleRoute);
}

function handleRoute(req, res, next) {

    const context: any = {};
    var component = (
        <StaticRouter location={req.originalUrl} context={context}>
            <div id="router">
                <Layout />
            </div>
        </StaticRouter>
    );

    let streamHTML: any = renderToNodeStream(component);
    getRawBody(streamHTML, {
        //length: req.headers['content-length'],
        //limit: '1mb',
        encoding: "utf8"
    }).then(function(appHTML) {

        if (context.url) {
            res.redirect(302, context.url);
        } else {
            
            //todo: do react-helment replacements

            var pathtotemplate = path.resolve(
                __dirname,
                "../../..",
                "src/page.html"
            );
            var pagetemplate = fs.readFileSync(pathtotemplate);
            console.log("appHTML--------------------------------------------------------");
            console.log(appHTML);
            var html = (pagetemplate+"").replace("[[pagecontent]]", appHTML);

            res.header("Content-Type", "text/html");
            res.status(200).send(html);
        }
    });
}
