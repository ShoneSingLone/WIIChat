module.exports = {
  devServer: {
    proxy: "http://localhost:7001",
    overlay: {
      open: true,
      errors: true,
      warnings: false
    }
  },
  lintOnSave: false
};
