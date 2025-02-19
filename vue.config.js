module.exports = {
  lintOnSave: false, //这里禁止使用eslint-loader 
  publicPath: process.env.NODE_ENV === 'production' ?
    "./" :
    "/"
}