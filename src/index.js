import {parseKey} from './utils'


export const watch = function (WrappedComponent) {
    // let oldDidUpdate = WrappedComponent.prototype.componentDidUpdate;
    // console.log(oldDidUpdate, WrappedComponent.prototype);
    // console.log(WrappedComponent.prototype);

    return class WatchProps extends WrappedComponent {

        componentWillMount() {
            // console.log('newWillMount: ');
            let oldDidUpdate = this.componentDidUpdate;
            this.componentDidUpdate = function (prevProps, prevState, snapshot) {
                oldDidUpdate && oldDidUpdate.apply(this, arguments);
                const {state, props} = this.watchChange() || {};
                // console.log('newDidUpdate: ', state, props, prevProps, prevState);
                let stateWatchList = Object.keys(state);
                let propsWatchList = Object.keys(props);

                stateWatchList.forEach(key => {
                    if (parseKey(key, this.state) !== parseKey(key, prevState)) {
                        state[key]();
                    }
                });
                propsWatchList.forEach(key => {
                    // let p1 = parseKey(key, this.props)
                    // let p2 = parseKey(key, prevProps);
                    // console.log(p1, p2, '~~~~~~~', p1 !== p2);
                    if (parseKey(key, this.props) !== parseKey(key, prevProps)) {
                        props[key]();
                    }
                });

            }
        }

        // componentDidMount() {
        //     console.log('wrapperDidMount: ', oldDidUpdate, super.prototype);
        // }

        // componentWillReceiveProps(nextProps, nextState) {
        //     console.log('newReceiveProps: ', nextProps);
        // }

        //  这个函数不会触发
        // componentDidUpdate (prevProps, prevState, snapshot) {
        //     oldDidUpdate && oldDidUpdate.apply(this, arguments);
        //     const {state, props} = this.watchChange();
        //     this.componentDidUpdate();
        //     console.log('newUpdate: ', this);
        // }

        render() {
            return super.render();
        }
    }
}
