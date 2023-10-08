import {useMutation} from 'react-query'
import {Order} from '@/types'
import {postOrder} from './api/postOrder'

export const mutatePlaceOrder = () => {
    const mutation = useMutation({
        mutationFn: (order: Order) => postOrder(order),
    })

    return mutation
}
