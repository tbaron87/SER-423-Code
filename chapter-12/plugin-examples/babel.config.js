module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // react-native-reanimated's plugin must be listed LAST.
    // Gesture Handler and Lottie animations rely on Reanimated under the hood.
    plugins: ['react-native-reanimated/plugin'],
  };
};
