import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
// import App from '../component/App';
import {watch} from "../src";

import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });
// @watch
class App extends React.Component{
    state = {
        list: [
            {id: 0},
            {id: 1},
        ]
    }

    componentDidMount() {
        console.log('oldDidMount: ------');
    }

    componentWillReceiveProps(nextProps, nextState) {
        console.log('oldReceiveProps: ', nextProps);
    }

    static getDerivedStateFromProps = (props, state) => {
        console.log('getDerivedStateFromProps: ', props, state);
        return null
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        console.log('oldDidUpdate: ', prevProps, prevState, this.state, this.props);
    }

    watchChange() {
        return {
            state: {
                [`list`]: () => { this.stateChanged(); console.log('fetchList') }
            },
            props: {
                [`count`]: () => { this.propsChange(); console.log('updateProps') }
            }
        }
    }

    propsChange() {
        console.log('propsChange');
    }

    stateChanged() {
        console.log('stateChanged');
    }

    changeState = e => {
        this.setState({
            a: []
        })
    }

    render() {
        const {count} = this.props;
        return <div>{count}</div>;
    }
}

//  测试当props改变的时候监视的函数有触发，没有监视的函数没有触发
describe('calls componentDidMount', function () {
    it('App\'s title should be title', function () {
        // const spy = sinon.spy(App.prototype, 'componentWillReceiveProps');
        //
        // const wrapper = mount(<App count={0}/>);
        // expect(spy).to.have.property('callCount', 0);
        //
        // wrapper.setProps({count: 5});
        //
        // console.log(wrapper.debug());
        // expect(spy).to.have.property('callCount', 1);

        const spy = sinon.spy(App.prototype, 'componentWillReceiveProps');

        const wrapper = mount(<App count="bar"/>);
        expect(spy).to.have.property('callCount', 0);
        wrapper.setProps({count: 'foo'});
        expect(spy).to.have.property('callCount', 1);
    });

});
