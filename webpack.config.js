const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

process.env.NODE_ENV = 'test' || 'development';

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path:'.env.test' });
} else {
  require('dotenv').config({ path:'.env.development' });
}

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });
  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
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
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }]
    },
    plugins: [
      CSSExtract,
      new TerserPlugin({
        terserOptions: {
          compress: isProduction === 'production' // only if `--mode production` was passed
        },
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production' || 'development'),
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
        'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID)
      })
    ],
    devtool: process.env.NODE_ENV ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    },
    stats : {
      errorDetails: true
    }
  };
};

