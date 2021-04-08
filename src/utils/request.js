import axios from 'axios';

function fetch( url, type, data ) {
    const params = {
        url,
        method: type && type.toLowerCase(),
    };

    // 默认使用application/json类型，特殊类型需要自定义
    if (params.method === 'post') {
        // params.contentType = 'application/json;charset=UTF-8';
        params.headers = {
            'Content-Type': 'application/json; charset=UTF-8',
        };
        if (data) {
            params.data = JSON.stringify(data);
        }
    } else if (params.method === 'get' || !params.type) {
        // axios get请求参数放在params属性中
        params.params = data;
    }
    return new Promise((resolve) => {
        axios({
            crossOrigin: true,
            ...params,
        })
            .then((response) => {
                const responseData = response.data;
                // !isDevEnv &&
                if (response.status >= 200 && response.status < 300) {
                    resolve({ data: responseData });
                } else {
                    console.log('服务器请求报错', params.url, data);
                    // 其他错误信息模块中处理
                    resolve(responseData);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });
}

export default {
    get(url, data) {
        return fetch(url, 'get', data);
    },
    post(url, data) {
        return fetch(url, 'post', data);
    },
};
