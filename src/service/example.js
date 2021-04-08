import request from '../utils/request';

const prefix = '/mock';

export async function getExampleList(data) {
    // console.log('online', isOnline());
    return request.get(`${prefix}/getExampleList`, { data });
}

export async function onSiteModelSave(data) {
    return request.post(`${prefix}/getExampleById`, { data });
}
