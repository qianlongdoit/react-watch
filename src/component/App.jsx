import React from 'react';

export default class App extends React.Component{
    state = {
        list: [
            {id: 0},
            {id: 1},
        ]
    }

    componentDidMount = () => {
        console.log('oldDidMount: ------');
    }

    componentWillReceiveProps = (nextProps, nextState) => {
        console.log('oldReceiveProps: ', nextProps);
    }

    getDerivedStateFromProps = (props, state) => {
        console.log('getDerivedStateFromProps: ', props, state);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        console.log('oldDidUpdate: ', prevProps, prevState, this.state);
    }

    watchChange = () => {
        return {
            state: {
                [`list`]: () => { this.fetchList(); console.log('fetchList') }
            },
            props: {
                [`count`]: () => { console.log('updateProps') }
            }
        }
    }

    fetchList = () => {
        console.log('fetch');
    }

    changeState = e => {
        this.setState({
            a: []
        })
    }

    render() {
        return <div>title</div>;
    }
}