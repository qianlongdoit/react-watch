import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import {mount, configure} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

import App from '../component/App';
import {watch} from "../src";
// import NoneWatchFn from '../component/NoneWatch';

// configure({ adapter: new Adapter() });

//  原来的componentDidUpdate应该被保留并正确执行
describe('oldDidMount should be remain and called', function () {
    let sandbox;
    let Component;

    //  初始化很重要，否则之前测试的过程状态会被保留，导致结果不准确
    beforeEach(() => {
        Component = watch(App);
        sandbox = sinon.createSandbox();
        sandbox.spy(Component.prototype, 'oldDidUpdate');
        // sandbox.spy(Component.prototype, 'setState');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('oldDidUpdate should be called', function () {
        const wrapper = mount(<Component />);
        const didUpdate = Component.prototype.oldDidUpdate;
        expect(didUpdate).to.have.property('callCount', 0);

        wrapper.setProps({count: 5});
        expect(didUpdate).to.have.property('callCount', 1);
        wrapper.unmount()
    });
});

// 当props or state改变的时候监视的函数有触发，没有监视的函数没有触发
describe('watch props or state change', function () {
    let sandbox;
    let Component;

    beforeEach(() => {
        Component = watch(App);
        sandbox = sinon.createSandbox();
        sandbox.spy(Component.prototype, 'propsChanged');
        sandbox.spy(Component.prototype, 'stateChanged');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('props change', function () {
        const propsFn = Component.prototype.propsChanged;
        const stateFn = Component.prototype.stateChanged;
        const wrapper = mount(<Component count={[1,2,3]} />);

        expect(propsFn).to.have.property('callCount', 0);
        expect(stateFn).to.have.property('callCount', 0);

        let count = wrapper.props().count.slice();
        count.push(5);
        wrapper.setProps({count});
        expect(propsFn).to.have.property('callCount', 1);
        expect(stateFn).to.have.property('callCount', 0);

        wrapper.setProps({text: 'props watch function not trigger'});
        expect(propsFn).to.have.property('callCount', 1);
        expect(stateFn).to.have.property('callCount', 0);
    });

    it('state change', function () {
        const propsFn = Component.prototype.propsChanged;
        const stateFn = Component.prototype.stateChanged;
        const wrapper = mount(<Component count={[1,2,3]} />);

        expect(propsFn).to.have.property('callCount', 0);
        expect(stateFn).to.have.property('callCount', 0);

        let {list, res} = wrapper.state();
        list = list.slice();
        list.push(5);

        wrapper.setState({list: list});
        wrapper.setState({res: res});
        expect(propsFn).to.have.property('callCount', 0);
        expect(stateFn).to.have.property('callCount', 1);


        wrapper.setState({text: 'state watch function not trigger'});
        expect(propsFn).to.have.property('callCount', 0);
        expect(stateFn).to.have.property('callCount', 1);
    });
});
