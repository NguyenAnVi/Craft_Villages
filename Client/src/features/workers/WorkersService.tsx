import * as httpRequest from '~/utils/httpRequest';
const API_URL = '/Workers/';

export const getWorkers = (_id: string, accessToken: string) => {
    return httpRequest.get(API_URL + `getWorkers/${_id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
};
export const getAllWorkers = (WorkersId: string, accessToken: string) => {
    return httpRequest.get(API_URL + `getAllWorkers/${WorkersId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
};
export const updateProfile = (WorkersId: string, data: object, accessToken: string) => {
    return httpRequest.post(API_URL + `updateProfile/${WorkersId}`, data, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
}
export const deleteWorkers = (WorkersId: string, accessToken: string) => {
    return httpRequest.deleteOne(API_URL + `deleteWorkers/${WorkersId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
};