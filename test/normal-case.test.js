import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import {mount, configure} from 'enzyme';


import App from '../component/App';

describe('test without watch', function () {
    let stateFn ;
    let sandbox;

    beforeEach(()=> {
        sandbox = sinon.createSandbox();
        stateFn = sandbox.stub(App.prototype, 'setState');
    });

    afterEach(() => {
        stateFn.resetHistory();
        stateFn.restore();
        sandbox.restore();
    });

    it('normal case test', function () {
        const wrapper = mount(<App />);
        expect(stateFn).to.have.property('callCount', 0);

        let {list, res} = wrapper.state();
        list = list.slice();
        list.push(5);

        wrapper.setState({list: list});
        expect(stateFn).to.have.property('callCount', 1);

        wrapper.setState({text: 'state watch function not trigger'});
        expect(stateFn).to.have.property('callCount', 2);
    });
});
