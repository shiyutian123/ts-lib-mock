/**
 * @type {Partial<jest.InitialOptions>}
 */
const config = {
  // 对于 ts 代码和当前 node 还不支持的 js 代码，需要使用相应的转换器转换一下
  transform: {
    // 使用 ts-jest 转换 ts 代码。 ts 文件路径匹配 "^.+\\.tsx?$" 的，才会被转换。
    '^.+\\.tsx?$': 'ts-jest',
    // 使用 babel-jest 转换 js 代码。 js 文件路径匹配 "^.+\\.jsx?$" 的，才会被转换。
    '^.+\\.jsx?$': 'babel-jest',
  },
  // 转换过程中，需要被忽略的文件。
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(moment|core-js|babel-runtime|regenerator-runtime|lodash)/',
  ],
  // 是否搜集单测覆盖率信息。
  collectCoverage: false,
  // 匹配单测 spec 文件。
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$',
  testRegex: '(/__tests__/.*|(\\.|/)(mock-generate.spec))\\.(tsx?)$',
  // 支持的源码后缀名。
  moduleFileExtensions: ['ts', 'js'],
  globals: {
    'ts-jest': {
      // 过了 ts-jest 转换器，就不要过 babel 转换器了。
      skipBabel: true,
    },
  },
  testPathIgnorePatterns: ['/(node_modules|lib|coverage|types)/'],
}

module.exports = config
