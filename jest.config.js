module.exports = {
    preset: 'jest-expo',
    testTimeout: 20000,
    setupFiles: [
        './src/utils/test/setupTestEnv.ts'
    ],
    setupFilesAfterEnv: [
        './src/utils/test/setupTest.ts'
    ],
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
    ],
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1'
    }
}