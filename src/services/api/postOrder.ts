import config from '@/config'
import {Order} from '@/types'

export const postOrder = async (order: Order) => {
    const response = await fetch(`${config.apiUrl}/placeOrder`, {
        method: 'POST',
        body: JSON.stringify(order),
    })

    if (!response.ok) throw new Error(response.status.toString())

    return {}
}

