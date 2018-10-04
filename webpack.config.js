const Dotenv = require('dotenv-webpack');
const config = {
  entry: `${__dirname}/client/src/app.js`,
  output: {
    path: `${__dirname}/client/public/js`,
    filename: 'bundle.js'
  },
  mode: 'development',
  node: {
       fs: 'empty'
     },
     plugins: [
       new Dotenv()
     ]
};

module.exports = config;
