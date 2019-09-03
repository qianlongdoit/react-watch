import React from 'react';

import {watch} from "../src";

@watch
class NoneWatchFn extends React.Component {
    render() {
        return <div>没有watch函数</div>
    }
}

export default NoneWatchFn