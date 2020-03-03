const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    localIdentName: "[local]--[hash:base64:5]",
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" }
  })
);