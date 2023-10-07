import * as yup from 'yup'

export const userDetailsSchema = yup.object({
    fullName: yup.string()
        .min(3, 'must be at least 3 characters long')
        .matches(/(\p{L}\s)+/u, 'should containt only latters and spaces')
        .required(),
    email: yup.string()
        .email()
        .required(),
    adress: yup.string()
        .min(3, 'must be at least 3 characters long')
        .required(),
    city: yup.string()
        .min(3, 'must be at least 3 characters long')
        .required(),
    state: yup.string()
        .min(3, 'must be at least 3 characters long')
        .required(),
    zipcode: yup.string()
        .min(3, 'must be at least 3 characters long')
        .required(),
})


export interface Minifig {
    id: string;
    name: string;
    image: string;
}

export type UserDetails = yup.InferType<typeof userDetailsSchema>;