const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "/order-app/",
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/mixins.scss"; @import "@/styles/breakpoints.scss";`,
      },
    },
  },
});
