import config from '@/config'
import {Part} from '@/types'

const mapPart = (response: any): Part => ({
    id: response.part.part_num,
    name: response.part.name.split(',')[0],
    image: response.part?.part_img_url,
})

export const fetchPartsForMinifig = async (set_num: string) => {
    const response = await fetch(`${config.rebrickableApiBaseUrl}/minifigs/${set_num}/parts?` + new URLSearchParams({
        key: config.rebrickableApiKey
    }))

    if (!response.ok) throw new Error(response.status.toString());

    const result = await response.json()

    return result.results.map(mapPart) as Part[]
}
