const MOCKED_URL = 'http://mock.com/api/v3/lego'
const MOCKED_KEY = 'superSecretKey'

export default {
    apiKey: process.env.EXPO_PUBLIC_API_KEY ?? MOCKED_KEY,
    apiBaseUrl: process.env.EXPO_PUBLIC_API_URL ?? MOCKED_URL
}