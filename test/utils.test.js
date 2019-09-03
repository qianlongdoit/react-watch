import {expect} from 'chai';

import {parseKey} from "../src/utils";

const simpleObject = {
    status: 'success',
    info: null,
    data: {
        "location": "/user",
        "fields": [
            {"name": "receive_time", "dtype": "BIGINT", "comment": "接收时间", "type": "COLUMN"},
            {"name": "source_ip", "dtype": "STRING", "comment": "来源IP", "type": "COLUMN"},
            {"name": "gid", "dtype": "BIGINT", "comment": "网吧ID", "type": "COLUMN"},
            {"name": "showurl ", "dtype": "STRING", "comment": "访问地址", "type": "COLUMN"}
        ],
        'index': undefined
    }
}


describe('parseKey', function () {
    it(`should '/user'`, function () {
        const value = parseKey('data.location', simpleObject);

        expect(value).to.equal('/user');
    });
    it(`should 'source_ip'`, function () {
        const name = parseKey(`data.fields[1].name`, simpleObject);

        expect(name).to.equal('source_ip');
    });
    it(`should 'null'`, function () {
        const name = parseKey(`info`, simpleObject);

        expect(name).to.equal(null);
    });
    it(`should 'undefined'`, function () {
        const name = parseKey(`data.index`, simpleObject);

        expect(name).to.equal(undefined);
    });
    it(`should 'undefined'`, function () {
        const name = parseKey(`data.page`, simpleObject);

        expect(name).to.equal(undefined);
    });
});