module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  automock: false,
  setupFiles: [
    './setupJest.js'
  ]
}
