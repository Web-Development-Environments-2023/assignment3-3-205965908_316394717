module.exports = {
  configureWebpack: {
    devtool: "eval-source-map"
  },
  devServer: {
    // host: "132.72.65.211"
    host: "localhost",
    proxy: "https://spoonacular.com/"
  }
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};
