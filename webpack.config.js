const webpack = require('webpack');
const path = require('path');
const PROD = process.argv.indexOf('-p') >= 0;

const config = {
  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, ''),
  dir_client : 'src',
  dir_dist   : 'dist',
  dir_node_modules : 'node_modules',

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_babel : {
    cacheDirectory : true,
    plugins        : ['transform-runtime'],
    presets        : ['es2015', 'react', 'stage-0']
  },
  compiler_devtool         : 'source-map'
};

// ------------------------------------
// Utilities
// ------------------------------------
function base () {
  const args = [config.path_base].concat([].slice.call(arguments));
  return path.resolve.apply(path, args)
}

config.utils_paths = {
  base   : base,
  client : base.bind(null, config.dir_client),
  dist   : base.bind(null, config.dir_dist),
  node_modules : base.bind(null, config.dir_node_modules)
};

const paths = config.utils_paths;

// ------------------------------------
// Entry Points
// ------------------------------------
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    root: paths.client(),
    extensions: ['', '.js', '.jsx', '.json']
  },
  externals: {
    'd3': 'd3'
  },
  module: {
    noParse: []
  }
};

// ------------------------------------
// Entry Points
// ------------------------------------
webpackConfig.entry = paths.client('index.js');

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  libraryTarget: 'umd',
  path: paths.dist(),
  filename: PROD ? `pd3.min.js` : `pd3.js`,
};

// ------------------------------------
// Plugins
// ------------------------------------
if (PROD) {
  webpackConfig.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: { unused: true, dead_code: true, warnings: false }
    })
  ];
}
else {
  webpackConfig.plugins = [];
}

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: config.compiler_babel
}, {
  test: /\.json$/,
  loader: 'json'
}];

module.exports = webpackConfig;
