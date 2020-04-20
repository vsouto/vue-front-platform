module.exports = {
  moduleFileExtensions: [ "js", "json", "vue" ],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@lib/(.*)$": "<rootDir>/src/components/lib/$1",
    "^assets/(.*)$": "<rootDir>/src/assets/$1",
    "^icons/(.*)$": "<rootDir>/node_modules/vue-material-design-icons/$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__mocks__/styleMock.js",
    "\\.(css|less)$": "jest-transform-stub"
  },
  snapshotSerializers: [ "jest-serializer-vue" ],
  testMatch: [ "<rootDir>/tests/unit/**/*.spec.(js|jsx|ts|tsx)" ],
  transformIgnorePatterns: [ "<rootDir>/node_modules/(?!babel-jest|jest-vue-preprocessor|vue-material-design-icons)" ],
  collectCoverage: false,
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!src/components/lib/**",
    "!src/main.js"
  ],
  coverageDirectory: "./coverage/"
}
