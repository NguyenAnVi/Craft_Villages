import * as httpRequest from '~/utils/httpRequest';
const API_URL = '/Product/';

export const getProduct = (_id: string, accessToken: string) => {
    return httpRequest.get(API_URL + `getProduct/${_id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
};
export const getAllProduct = (ProductId: string, accessToken: string) => {
    return httpRequest.get(API_URL + `getAllProduct/${ProductId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
};
export const updateProfile = (ProductId: string, data: object, accessToken: string) => {
    return httpRequest.post(API_URL + `updateProfile/${ProductId}`, data, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
}
export const deleteProduct = (ProductId: string, accessToken: string) => {
    return httpRequest.deleteOne(API_URL + `deleteProduct/${ProductId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
};