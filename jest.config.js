module.exports = {
  moduleNameMapper: {
    '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest', // Use Babel para transformar arquivos JS/JSX
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/', // Transforma também o módulo axios
  ],
};