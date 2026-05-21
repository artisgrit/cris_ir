import { globalCSSImports, projectRoot, getFileHashes, calculateFileHash } from './helpers';
import { EnvironmentPlugin } from 'webpack';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const sass = require('sass');
const JSON5 = require('json5');

export const copyWebpackOptions = {
  patterns: [
    {
      from: path.join(__dirname, '..', 'node_modules', '@fortawesome', 'fontawesome-free', 'webfonts'),
      to: path.join('assets', 'fonts'),
      force: undefined
    },
    {
      from: path.join(__dirname, '..', 'src', 'assets', '**', '*.json5').replace(/\\/g, '/'),
      to({ absoluteFilename }) {
        // use [\/|\\] to match both POSIX and Windows separators
        const matches = absoluteFilename.match(/.*[\/|\\]assets[\/|\\](.+)\.json5$/);
        if (matches) {
          const fileHash: string = process.env.NODE_ENV === 'production' ? `.${calculateFileHash(absoluteFilename)}` : '';
          // matches[1] is the relative path from src/assets to the JSON5 file, without the extension
          return path.join('assets', `${matches[1]}${fileHash}.json`);
        }
      },
      transform(content, absoluteFilename) {
        try {
          return JSON.stringify(JSON5.parse(content.toString()));
        } catch (error) {
          throw new Error(`Failed to parse JSON5 asset ${absoluteFilename}: ${error.message}`);
        }
      }
    },
    {
      from: path.join(__dirname, '..', 'src', 'assets'),
      to: 'assets',
      globOptions: {
        ignore: ['**/*.json5'],
      },
    },
    {
      from: path.join(__dirname, '..', 'src', 'themes', '*', 'assets', '**', '*.json5').replace(/\\/g, '/'),
      noErrorOnMissing: true,
      to({ absoluteFilename }) {
        const matches = absoluteFilename.match(/.*[\/|\\]themes[\/|\\]([^\/|^\\]+)[\/|\\]assets[\/|\\](.+)\.json5$/);
        if (matches) {
          const themeName = matches[1];
          const relativePath = matches[2];
          const fileHash: string = process.env.NODE_ENV === 'production' ? `.${calculateFileHash(absoluteFilename)}` : '';
          return path.join('assets', themeName, `${relativePath}${fileHash}.json`);
        }
      },
      transform(content, absoluteFilename) {
        try {
          return JSON.stringify(JSON5.parse(content.toString()));
        } catch (error) {
          throw new Error(`Failed to parse JSON5 theme asset ${absoluteFilename}: ${error.message}`);
        }
      }
    },
    {
      from: path.join(__dirname, '..', 'src', 'themes', '*', 'assets', '**', '*').replace(/\\/g, '/'),
      noErrorOnMissing: true,
      globOptions: {
        ignore: ['**/*.json5'],
      },
      to({ absoluteFilename }) {
        // use [\/|\\] to match both POSIX and Windows separators
        const matches = absoluteFilename.match(/.*[\/|\\]themes[\/|\\]([^\/|^\\]+)[\/|\\]assets[\/|\\](.+)$/);
        if (matches) {
          // matches[1] is the theme name
          // matches[2] is the rest of the path relative to the assets folder
          // e.g. themes/custom/assets/images/logo.png will end up in assets/custom/images/logo.png
          return path.join('assets', matches[1], matches[2]);
        }
      },
    },
    {
      from: path.join(__dirname, '..', 'src', 'robots.txt.ejs'),
      to: 'assets/robots.txt.ejs'
    }
  ]
};

const SCSS_LOADERS = [
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      sassOptions: {
        includePaths: [projectRoot('./')]
      }
    }
  },
];

export const commonExports = {
  plugins: [
    new EnvironmentPlugin({
      languageHashes: getFileHashes(path.join(__dirname, '..', 'src', 'assets', 'i18n'), /.*\.json5/g),
    }),
    new CopyWebpackPlugin(copyWebpackOptions),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack'
      },
      {
        test: /\.scss$/,
        exclude: [
          /node_modules/,
          /(_exposed)?_variables.scss$|[\/|\\]src[\/|\\]themes[\/|\\].+?[\/|\\]styles[\/|\\].+\.scss$/
        ],
        use: [
          ...SCSS_LOADERS,
          {
            loader: 'sass-resources-loader',
            options: {
              resources: globalCSSImports()
            },
          }
        ]
      },
      {
        test: /(_exposed)?_variables.scss$|[\/|\\]src[\/|\\]themes[\/|\\].+?[\/|\\]styles[\/|\\].+\.scss$/,
        exclude: [/node_modules/],
        use: [
          ...SCSS_LOADERS,
        ]
      },
    ],
  },
  ignoreWarnings: [
    /src\/themes\/[^/]+\/.*theme.module.ts is part of the TypeScript compilation but it's unused/,
  ]
};
