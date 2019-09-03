import {parseKey} from './utils'


export const watch = function (WrappedComponent) {
    return class WatchProps extends WrappedComponent {

        componentWillMount() {
            // console.log('newWillMount: ');
            let oldDidUpdate = this.componentDidUpdate;
            this.componentDidUpdate = function (prevProps, prevState, snapshot) {
                oldDidUpdate && oldDidUpdate.apply(this, arguments);
                if (!this.watchChange) {
                    return console.error(`Can not find watchChange method in ${WrappedComponent.name}`);
                }
                const {state, props} = this.watchChange() || {};
                let stateWatchList = Object.keys(state);
                let propsWatchList = Object.keys(props);

                if (stateWatchList) {
                    stateWatchList.forEach(key => {
                        if (parseKey(key, this.state) !== parseKey(key, prevState)) {
                            state[key](prevProps, prevState);
                        }
                    });
                }

                if (propsWatchList) {
                    propsWatchList.forEach(key => {
                        if (parseKey(key, this.props) !== parseKey(key, prevProps)) {
                            props[key](prevProps, prevState);
                        }
                    });
                }

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
