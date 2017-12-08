import * as path from "path";
import * as webpack from "webpack";
import { smart as mergesmart } from "webpack-merge";

const baseconfig: webpack.Configuration = {
    resolve: {
        alias: {},
        extensions: [".tsx", ".ts", ".js", ".css", ".json", ".md"],
    },
    performance: {
        maxAssetSize: 100000,
        hints: false, //'warning'
    },
};

const basevendorconfig: webpack.Configuration = mergesmart(baseconfig, {
    resolve: {
        alias: {
            react: path.resolve("./node_modules/react"), //force sub node_modules of node_module to use the primary version of react (eg react-context)
            "react-dom": path.resolve("./node_modules/react-dom"), //force sub node_modules of node_module to use the primary version of react (eg react-context)
        },
    },
});

const codetsexclude = [
    /node_modules/,
    /output/,
];

const codetsinclude = [
    path.resolve("./src/browser/client"),
    path.resolve("./src/browser/root"),
];

const baseclientconfigwithoutfiles: webpack.Configuration = mergesmart(basevendorconfig, {
    entry: {
        landing: [
            "babel-polyfill", //https://babeljs.io/docs/usage/polyfill/, note: removing doesnt seem to boost build perf
            path.resolve("./src/browser/client/landing.tsx"),
        ],
    },
    output: {
        publicPath: "/bundle/",
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["react", "stage-0", ["es2015", { modules: false }]],
                            plugins: [
                                "syntax-dynamic-import",
                                "babel-plugin-transform-react-jsx-self",
                                "babel-plugin-transform-react-jsx-source"
                            ],
                        },
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: "tsconfig-browser-client.json",
                            transpileOnly: true,
                            silent: false,
                        },
                    },
                ],
                include: codetsinclude,
                exclude: codetsexclude,
            },
        ],
    },
});

const devclientconfig: webpack.Configuration = mergesmart(baseclientconfigwithoutfiles, {
    devtool: "eval",
    output: {
        path: path.resolve("./output/webpack"),
        filename: "[name].js",
        chunkFilename: "chunk-[name].js",
    },
});

export { devclientconfig };
