const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
// const isProduction = env === 'production';
const CSSExtract = new MiniCssExtractPlugin({ filename : 'styles.css' });
  return {
    mode : env.production ? 'production' : 'development',
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: [
          {
            loader : MiniCssExtractPlugin.loader
           },
           {
             loader : 'css-loader',
             options : {
               sourceMap : true
             }
           },
           {
             loader : 'sass-loader',
             options : {
               sourceMap : true
             }
           }
        ]
      }]
    },
    plugins : [
      CSSExtract,
      new TerserPlugin({
        terserOptions: {
         compress: argv.mode === 'production' // only if `--mode production` was passed
        }
      })
    ],
    devtool: env.production ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback : true
    }
  };
};

