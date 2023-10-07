import {useQuery} from 'react-query'
import {fetchRandomMinifigs} from './api/fetchRandomMinifigs'

export const useRandomMinifigs = (n: number = 5) => {
    const query = useQuery({
        queryKey: ['randomMinifigs', n] as [string, number],
        queryFn: ({queryKey}) => fetchRandomMinifigs(queryKey[1]),
    })

    return query
}
