const path = require("path");

module.exports = {
    devtool: "source-map",
    entry: "./src",
    mode: "production",
    module: {
        rules: [
            {
                exclude: /(node_modules|bower_components)/,
                test: /\.jsx?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["babel-plugin-transform-class-properties"],
                    },
                },
            },
        ],
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "lib"),
        libraryTarget: "commonjs-module",
    },
    resolve: {
        extensions: [".js", ".jsx"],
        modules: [path.resolve("./src"), path.resolve("./node_modules")],
    },
};
