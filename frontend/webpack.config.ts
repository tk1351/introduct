import path from 'path'
import { WebpackOptionsNormalized } from 'webpack'

const option: WebpackOptionsNormalized = {
  mode: 'development',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  experiments: {},
  externals: {},
  externalsPresets: {},
  infrastructureLogging: {},
  node: {},
  optimization: {},
  plugins: [],
  resolveLoader: {},
  snapshot: {},
  stats: {},
  watchOptions: {},
  context: path.join(__dirname, 'src'),
  entry: {
    main: {
      import: ['./index.tsx'],
    },
  },
  // entry: './index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets',
  },
  module: {
    defaultRules: [],
    generator: {},
    parser: {},
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{ loader: 'file-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'static'),
    open: true,
    port: 3000,
    proxy: {
      '/api': 'http://backend:8080',
    },
  },
}

export default option
