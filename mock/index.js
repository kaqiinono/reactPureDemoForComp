const fs = require('fs');
const path = require('path');
const mock = require('mockjs');

const RequestTypeEnum = {
    GET: 'get',
    PUT: 'put',
    DELETE: 'delete',
    POST: 'post',
};

/* 读取mock下的所有js文件 */
function findSync(startPath) {
    const result = [];
    const files = fs.readdirSync(startPath);

    files.forEach(val => {
        const file = path.join(startPath, val);
        const stats = fs.statSync(file);

        if (stats.isDirectory()) {
            result.push(...findSync(file));
        } else if (stats.isFile()) {
            result.push(file);
        }
    });

    return result;
}

/* 通过require获取js文件中导出的函数，执行并传递app参数 */
const mockServer = (middlewares, devServer) => {
    findSync(path.resolve(__dirname, './api')).forEach(dir => {
        // eslint-disable-next-line import/no-dynamic-require,global-require
        const services = require(dir);
        Object.keys(services).map(sk => {
            const curService = services[sk];
            return devServer.app.get(`/mock/api/${sk}`, (req, res) => {
                res.json(mock.mock(curService.data));
            });
        });
    });
    console.log('Mock: service started successfully ✔');
    return middlewares;
};

module.exports = {
    mockServer,
    RequestTypeEnum,
};
