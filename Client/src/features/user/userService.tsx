import * as httpRequest from '~/utils/httpRequest';
const API_URL = '/user/';

export const getUser = (_id: string, accessToken: string) => {
    return httpRequest.get(API_URL + `getUser/${_id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
};
export const updateProfile = (data: any, accessToken: string) => {
    return httpRequest.post(API_URL + "updateProfile", data, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
}