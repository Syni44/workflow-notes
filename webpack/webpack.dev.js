const path = require('path');

module.exports = {
    entry: {
        chatUI: './src/chat-ui.ts',
        chatLogic: './src/chat-logic.ts',
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.ts',
            '.tsx'
        ]
    },
    output: {
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
    node: {
        fs: 'empty',
        tls: 'empty'
    },
    target: 'web',
    module: {
        "loaders": [
            {
                "test": /\.js/,
                "loader": "babel-loader",
                "exclude": /node_modules/,
                "query": {
                    "presets": [
                        "es2015"
                    ]
                }
            }
        ]
    },

};