var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var config = {
	debug: true,
	entry: {
		'index.ios': ['./App/index.js']
	},

  output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
	},

  module: {
    loaders: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, "node_modules/react-native-tableview-simple"),
        path.resolve(__dirname, "node_modules/react-native-facebook-login"),
        path.resolve(__dirname, "node_modules/react-native-image-picker"),
        path.resolve(__dirname, "node_modules/react-native-google-places-autocomplete"),
        path.resolve(__dirname, "node_modules/react-native-video"),
        path.resolve(__dirname, "node_modules/react-native-vector-icons"),
        path.resolve(__dirname, "App")
      ],
      loader: 'babel',
      query: {
        stage: 0,
        plugins: []   
      }
    },
    {
      test: /\.(png|jpg)$/, 
      loader: 'url-loader?limit=8192'
    }]
  },

  plugins: []
};

if (process.env.HOT) {

  var hostname = (process.env.DEVICE) ? process.argv[process.argv.length-1] : "localhost";

  config.devtool = 'source-map';
  config.entry['index.ios'].unshift(
    'react-native-webpack-server/hot/entry',
    'webpack-hot-middleware/client?path=http://' + hostname + ':8082/__webpack_hmr&overlay=false'
  );
  config.output.publicPath = 'http://' + hostname + ':8082/';
  config.plugins.unshift(
    new webpack.optimize.OccurenceOrderPlugin(), 
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
  config.module.loaders[0].query.plugins.push('react-transform');
  config.module.loaders[0].query.extra = {
    'react-transform': {
      transforms: [{
        transform: 'react-transform-hmr',
        imports: ['react-native'],
        locals: ['module']
      }]
    }
  };
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;