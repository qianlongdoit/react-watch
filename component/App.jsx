import React from 'react';

import {watch} from "../src";

@watch
class App extends React.Component {
    state = {
        list: [1, 2, 3]
    }

    componentDidMount() {
        console.log('oldDidMount: ------');
    }

    componentWillReceiveProps(nextProps, nextState) {
        console.log('oldReceiveProps: ', nextProps);
    }

    // static getDerivedStateFromProps = (props, state) => {
    //     console.log('getDerivedStateFromProps: ', props, state);
    //     return null
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.oldDidUpdate()
        console.log('oldDidUpdate: ', prevProps, prevState, this.state, this.props);
    }

    watchChange() {
        return {
            state: {
                [`list`]: () => {
                    this.stateChanged();
                }
            },
            props: {
                [`count`]: () => {
                    this.propsChanged();
                }
            }
        }
    }

    oldDidUpdate() {}

    propsChanged() {}

    stateChanged() {}

    render() {
        const {count} = this.props;
        return <div>{count}</div>;
    }
}

export default App