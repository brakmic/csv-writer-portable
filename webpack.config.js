const path = require('path');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    entry: './src/index.ts',
    mode: argv.mode || 'production',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public'),
      library: 'CsvWriter',
      libraryTarget: 'var'
    },
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: 'ts-loader'
        }
      ]
    }
  };
};
