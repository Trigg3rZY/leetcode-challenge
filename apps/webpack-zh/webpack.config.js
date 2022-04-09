const path = require('path');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: './apps/webpack-zh/src/index.js',

  mode: 'production',

  output: {
    path: path.resolve(__dirname, '../../dist/webpack-zh'),
    filename: '[name].[chunkhash:8].js',
    clean: true,
  },

  optimization: {
    runtimeChunk: true,

    splitChunks: {
      filename: '[name].[chunkhash:8].js',
      name(_module, chunks, cacheGroupKey) {
        const allChunksNames = chunks.map((item) => item.name).join('~');
        return `${cacheGroupKey}~${allChunksNames}`;
      },
      chunks: 'all',
      minSize: 100,
      minChunks: 1,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
        },
        module1: {
          test: /[\\/]module-1[\\/]/,
        },
        module2: {
          test: /[\\/]module-2[\\/]/,
        },
        common: {
          test: /[\\/]common[\\/]/,
        },
      },
    },
  },
};
