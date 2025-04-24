/* eslint-env node */
module.exports = {
  // 按需导入
  plugins: [
    require('postcss-each-variables'),
    require('postcss-nested'),
    require('postcss-each')({
      plugins: {
        // 在each前应用
        beforeEach: [
          require('postcss-for'),
          require('postcss-color-mix')
        ]
      }
    }),
  ]
}