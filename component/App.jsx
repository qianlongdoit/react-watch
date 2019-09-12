import React from 'react';

import {watch} from "../src";

// @watch
class App extends React.Component {
    state = {
        list: [1, 2, 3],
        res: {
            status: 'success',
            data: {
                database: {
                    name: 'pv'
                },
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.oldDidUpdate()
    }

    watchChange() {
        return {
            state: {
                [`list`]: () => {
                    this.stateChanged();
                },
                // [`lista`]: () => {
                //     this.stateChanged();
                // }
            },
            props: {
                [`count`]: () => {
                    this.propsChanged();
                }
            }
        }
    }

    oldDidUpdate() {}

    propsChanged() {
        console.log('~~~~~~ detected props changed');
    }

    stateChanged() {
        console.log('~~~~~~ detected state changed');
    }

    render() {
        const {count} = this.props;
        return <div>{count}</div>;
    }
}

export default App