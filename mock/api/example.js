const { RequestTypeEnum } = require('../index');

module.exports = {
    getExampleList: {
        method: RequestTypeEnum.GET,
        data: {
            status: 0,
            result: [
                {
                    'id|+1': 1,
                    name: {
                        first: '@FIRST',
                        middle: '@FIRST',
                        last: '@LAST',
                        full: '@first @middle @last'
                    }
                }
            ]
        }
    },
    getExampleById: {
        method: RequestTypeEnum.POST,
        data: {
            status: 0,
            result: 'this is a getExampleById!'
        }
    }
};
