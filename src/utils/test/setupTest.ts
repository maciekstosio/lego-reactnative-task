// https://github.com/testing-library/jest-native/issues/146#issuecomment-1539084484
import '@testing-library/jest-native/extend-expect'
import {queryClient} from '@/AppContainer'

queryClient.setDefaultOptions({
    queries: {
        retry: 0,   
    },
    mutations: {
        retry: 0,
    },
})


afterEach(() => {
    queryClient.clear()
    jest.clearAllMocks()
})
