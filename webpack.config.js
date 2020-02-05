const path = require('path')

module.exports = {
    entry: ["@babel/polyfill", "./src/app.js"],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/, //test only files that end in .js
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 3000,
        proxy: { "/backend": { target: 'http://localhost:3001', secure: false }  }
    }
};