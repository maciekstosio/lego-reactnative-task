import sampleSize from 'lodash/sampleSize'
import config from '@/config'
import {Minifig} from '@/types'

const HARRY_POTTER_THEME_ID = 246
const PAGE_SIZE = Number.MAX_SAFE_INTEGER

const mapMinifig = (response: any): Minifig => ({
    id: response.set_num,
    name: response.name.split(',')[0],
    image: response?.set_img_url,
    url: response?.set_url,
})

export const fetchRandomMinifigs = async (n: number) => {
    /*
        This is simplest and cleanest solution with assumption that number of figures doesn't change rapidly and it is
        realtivly small - so I don't think it's worth to make premature optimisation and make the code confusing. Alternativly when the 
        number of elements can be large we could random 5 numbers between 0 and count from the first request 
        and make N calls for page_number = random_value[i] and page_size = 1. 
    */
    const response = await fetch(`${config.rebrickableApiBaseUrl}/minifigs?` + new URLSearchParams({
        in_theme_id: HARRY_POTTER_THEME_ID.toString(),
        page_size: PAGE_SIZE.toString(),
        key: config.rebrickableApiKey
    }))

    if (!response.ok) throw new Error(response.status.toString());

    const result = await response.json()

    const randomMinifigs = sampleSize(result.results, n)

    return randomMinifigs.map(mapMinifig)
}
