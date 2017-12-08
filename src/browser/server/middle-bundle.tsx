import * as webpack from "webpack";

export function BindBundle(app, express) {

    console.info("... using webpack-config-dev");
    var time1 = new Date();
    var webpackconfig = require("./../bundle/webpack-config-dev").default; //4s to parse

    const compiler = webpack(webpackconfig);
    //debug(webpackconfig);
    app.use(
        require("webpack-dev-middleware")(compiler, {
            noInfo: false,
            watch: true,
            watchOptions: {
                aggregateTimeout: 500,
                poll: 2000, //seems to stablise HMR file change detection
                ignored: /node_modules|logs|output/,
            },
            //lazy: true, //dont use this, slow start + does pick up HMR
            quiet: false,
            stats: {
                // http://webpack.github.io/docs/node.js-api.html#stats-tojson
                hash: false,
                version: true,
                timings: false,
                assets: false,
                chunks: false,
                chunkModules: false,
                modules: false,
                children: false, //https://stackoverflow.com/questions/36542602/webpack-extract-text-plugin-prints-a-lot
                cached: false,
                reasons: false,
                source: false,
                chunkOrigins: false,
                //---
                colors: true,
            },
            publicPath: webpackconfig.output.publicPath,
        })
    );
}
