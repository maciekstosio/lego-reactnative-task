import config from '@/config'
import {Part} from '@/types'

const mapPart = (response: any): Part => ({
    id: response.part.part_num,
    name: response.part.name.split(',')[0],
    image: response.part?.part_img_url,
})

export const fetchPartsForMinifig = async (set_num: string) => {
    const request = await fetch(`${config.apiBaseUrl}/minifigs/${set_num}/parts?` + new URLSearchParams({
        key: config.apiKey
    }))

    const response = await request.json()

    return response.results.map(mapPart)
}
