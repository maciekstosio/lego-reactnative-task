import {useQuery} from 'react-query'
import {fetchPartsForMinifig} from './api/fetchPartsForMinifig'

export const usePartsForMinifig = (num_set: string) => {
    const query = useQuery({
        queryKey: ['minifigParts', num_set],
        queryFn: ({queryKey}) => fetchPartsForMinifig(queryKey[1]),
    })

    return query
}
