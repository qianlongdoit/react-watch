import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import App from '../component/App';
// import NoneWatchFn from '../component/NoneWatch';

import {mount, configure} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });


//  原来的componentDidUpdate应该被保留并正确执行
describe('oldDidMount should be remain and called', function () {
    afterEach(() => {
        sinon.restore();
    });

    it('oldDidUpdate should be called', function () {
        const spy = sinon.spy(App.prototype, 'oldDidUpdate');
        const wrapper = mount(<App />);
        expect(spy).to.have.property('callCount', 0);

        wrapper.setProps({count: 5});
        expect(spy).to.have.property('callCount', 1);
    });
});

//  当props or state改变的时候监视的函数有触发，没有监视的函数没有触发
describe('watch props or state change', function () {

    afterEach(() => {
        sinon.restore();
    });

    it('props change', function () {
        const propsFn = sinon.spy(App.prototype, 'propsChanged');
        const stateFn = sinon.spy(App.prototype, 'stateChanged');

        const wrapper = mount(<App count={0} />);
        expect(propsFn).to.have.property('callCount', 0);
        expect(stateFn).to.have.property('callCount', 0);

        wrapper.setProps({count: 5});
        expect(propsFn).to.have.property('callCount', 1);
        expect(stateFn).to.have.property('callCount', 0);

        wrapper.setProps({text: 'props not watch'});
        expect(propsFn).to.have.property('callCount', 1);
        expect(stateFn).to.have.property('callCount', 0);

    });

    it('simple state change', function () {
        const propsFn = sinon.spy(App.prototype, 'propsChanged');
        const stateFn = sinon.spy(App.prototype, 'stateChanged');

        const wrapper = mount(<App count={0}/>);
        expect(propsFn).to.have.property('callCount', 0);
        expect(stateFn).to.have.property('callCount', 0);

        wrapper.setState({list: []});
        expect(propsFn).to.have.property('callCount', 0);
        expect(stateFn).to.have.property('callCount', 1);

        wrapper.setState({text: 'state not watch'});
        expect(propsFn).to.have.property('callCount', 0);
        expect(stateFn).to.have.property('callCount', 1);
    });
});

