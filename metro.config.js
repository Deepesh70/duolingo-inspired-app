const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const defaultResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Zustand 5's web ESM middleware uses import.meta.env, which Expo web's
  // classic Metro bundle cannot execute. Target only that import and leave
  // package exports enabled for dependencies such as react-native-web.
  if (platform === "web" && moduleName === "zustand/middleware") {
    return {
      filePath: require.resolve("zustand/middleware"),
      type: "sourceFile",
    };
  }

  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativewind(config);
