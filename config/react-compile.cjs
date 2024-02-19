//This is used to correct the src for react-scripts compilation

const path = require("path");

module.exports = {
  paths: function (paths, env) {
    paths.appPath = path.resolve(__dirname, "../web");
    paths.appBuild = path.resolve(__dirname, "../dist/web");
    paths.appPublic = path.resolve(__dirname, "../web/public");
    paths.appHtml = path.resolve(__dirname, "../web/public/index.html");
    paths.appIndexJs = path.resolve(__dirname, "../web/src/index.tsx");
    paths.appSrc = path.resolve(__dirname, "../web/src");
    paths.testsSetup = path.resolve(__dirname, "../web/src/setupTests.js");
    paths.appTypeDeclarations = path.resolve(
      __dirname,
      "../web/src/react-app-env.d.ts"
    );
    paths.publicUrlOrPath = "/";
    paths.appTsConfig = path.resolve(__dirname, "typescript/react.json");

    return paths;
  },
};
