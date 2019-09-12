import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import {mount, configure} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

import App from '../component/App';
import {watch} from "../src";
// import NoneWatchFn from '../component/NoneWatch';

// configure({ adapter: new Adapter() });
let Component = watch(App);

//  原来的componentDidUpdate应该被保留并正确执行
// describe('oldDidMount should be remain and called', function () {
//     const spy = sinon.spy(Component.prototype, 'oldDidUpdate');
//     afterEach(() => {
//         sinon.restore();
//     });
//
//     it('oldDidUpdate should be called', function () {
//         const wrapper = mount(<Component/>);
//         expect(spy).to.have.property('callCount', 0);
//
//         wrapper.setProps({count: 5});
//         expect(spy).to.have.property('callCount', 1);
//         // wrapper.unmount()
//     });
// });

// 当props or state改变的时候监视的函数有触发，没有监视的函数没有触发
describe('watch props or state change', function () {
    const propsFn = sinon.spy(Component.prototype, 'propsChanged');
    const stateFn = sinon.spy(Component.prototype, 'stateChanged');
    const setState = sinon.spy(Component.prototype, 'setState');
    const wrapper = mount(<Component count={[1,2,3]} />);

    afterEach(() => {
        setState.restore();
        stateFn.resetHistory();
        propsFn.resetHistory();
    });
    it('props change', function () {
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
        // const propsFn = sinon.spy(App.prototype, 'propsChanged');
        // const stateFn = sinon.spy(App.prototype, 'stateChanged');
        // 注释这一句后测试就无法通过了？？
        // const set = sinon.spy(App.prototype, 'setState');

        // const wrapper = mount(<App/>);
        expect(propsFn).to.have.property('callCount', 0);
        expect(stateFn).to.have.property('callCount', 0);

        let {list, res} = wrapper.state();
        list = list.slice();
        list.push(5);
        // res.data.database.name = 'uv';

        wrapper.setState({list: list});
        wrapper.setState({res: res});
        expect(propsFn).to.have.property('callCount', 0);
        expect(stateFn).to.have.property('callCount', 1);

        wrapper.setState({text: 'state watch function not trigger'});
        expect(propsFn).to.have.property('callCount', 0);
        expect(stateFn).to.have.property('callCount', 1);
    });
});

// describe('watch state change', function () {
//     const wrapper = mount(<Component />);
//     const propsFn = sinon.spy(Component.prototype, 'propsChanged');
//     const stateFn = sinon.spy(Component.prototype, 'stateChanged');
//
//     afterEach(() => {
//         propsFn.resetHistory();
//         stateFn.resetHistory();
//     });
//
//     it('state change', function () {
//         //  注释这一句后测试就无法通过了？？
//         // const set = sinon.spy(App.prototype, 'setState');
//
//         expect(propsFn).to.have.property('callCount', 0);
//         expect(stateFn).to.have.property('callCount', 0);
//
//         let {list, res} = wrapper.state();
//         list = list.slice();
//         list.push(5);
//         // res.data.database.name = 'uv';
//
//         wrapper.setState({list: list});
//         // wrapper.setState({res: res});
//         expect(propsFn).to.have.property('callCount', 0);
//         // expect(set).to.have.property('callCount', 1);
//         expect(stateFn).to.have.property('callCount', 1);
//
//         // wrapper.setState({text: 'state watch function not trigger'});
//         // expect(propsFn).to.have.property('callCount', 0);
//         // expect(stateFn).to.have.property('callCount', 1);
//     });
//
//     it('count should be remain', function () {
//         expect(stateFn).to.have.property('callCount', 0);
//     });
// });
