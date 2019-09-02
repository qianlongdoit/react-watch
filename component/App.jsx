import React from 'react';

import {watch} from "../src";

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

export default watch(App)