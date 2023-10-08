const MOCKED_REBRICKABLE_URL = 'http://mock.com/api/v3/lego'
const MOCKED_REBRICKABLE_KEY = 'superSecretKey'
const MOCKED_API_URL = 'http://localhost'

export default {
    rebrickableApiKey: process.env.EXPO_PUBLIC_REBRICKABLE_API_KEY ?? MOCKED_REBRICKABLE_KEY,
    rebrickableApiBaseUrl: process.env.EXPO_PUBLIC_REBRICKABLE_API_URL ?? MOCKED_REBRICKABLE_URL,
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? MOCKED_API_URL
}