module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@types': './types',
            '@components': './components',
            '@screens': './screens',
            '@utils': './utils',
            '@theme': './theme'
          }
        }
      ]
    ],
  };
};
