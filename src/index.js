import _ from 'underscore'
import {parseKey} from './utils'


const addProxy = function (target) {
    let proxy = new Proxy(target, {
        get: function (target, key, receiver) {
            console.log('get trigger: +++++++++');
            return target[key]
        },
        set: function (target, key, receiver) {
            console.log('set trigger: ------------');
            return target[key]
        }
    });

    return proxy;
}

/**js中相等的比较可以参考underscore中的isEqual函数
 * 参考 https://github.com/lessfish/underscore-analysis/blob/master/underscore-1.8.3.js/src/underscore-1.8.3.js#L1094-L1190
 *
 * 如果添加了重复的key，key所对应的fn是会执行2次吗？
 * 如果watch的是多个key的数学运算的结果呢，可以正确的解析吗？
 * 所以针对上面的问题，我们需要建立一个不重复的key对应一个fn
 */
export const watch = function (WrappedComponent) {
    return class WatchProps extends WrappedComponent {

        componentWillMount() {
            let oldSetState = WrappedComponent.prototype.setState;
            let oldDidUpdate = this.componentDidUpdate;
            if (!this.watchChange) {
                return console.error(`Can not find watchChange in ${WrappedComponent.name}`);
            }
            const {state, props} = this.watchChange();
            const stateWatchList = Object.keys(state);
            const propsWatchList = Object.keys(props);

            //  用来存储上一次的preState, preProps
            let memory = {state: {}, props: {}};

            this.componentDidUpdate = function (prevProps, prevState, snapshot) {
                oldDidUpdate && oldDidUpdate.apply(this, arguments);

                if (stateWatchList) {
                    stateWatchList.forEach(key => {
                        const [found, current] = parseKey(key, this.state);
                        // const previous = memory.state.hasOwnProperty(key) ? memory.state[key] : parseKey(key, prevState);
                        //
                        // if (current !== previous) {
                        //     state[key]()
                        // }

                        if (found) {
                            memory.state[key] = current;
                        }
                    });
                }

                if (propsWatchList) {
                    propsWatchList.forEach(key => {
                        const [found, current] = parseKey(key, this.props);
                        const previous = memory.props.hasOwnProperty(key) ? memory.props[key] : parseKey(key, prevProps)[1];

                        if (found && !_.isEqual(current, previous)) {
                            props[key](current, previous)
                        }

                        memory.props[key] = current;
                    });
                }
            }

            //  每次 setState 就认为要监测的值发生了一次变化，但是对于 set 相同的 state 无法区分！
            WrappedComponent.prototype.setState = function (partialState, callback) {
                // console.log(this.state, partialState, memory);
                if (typeof partialState === 'object' && stateWatchList) {
                    stateWatchList.forEach(key => {
                        let [found, value] = parseKey(key, partialState);
                        if (found) {
                            console.log('called: %%%%%%', key);
                            state[key](value, memory.state[key]);
                        }
                    })
                }

                console.log('called: @@@@@@@');
                oldSetState.apply(this, arguments);
            };
        }

        /**使用Proxy监测state的变化
         * 如果setState是使用一个新的obj去赋值的话，会把原来的Proxy给覆盖掉，造成监测失效
         * 需要每次didUpdate的时候再次添加Proxy
         */
        // componentWillMount() {
        //     if (!this.watchChange) {
        //         return console.error(`Can not find watchChange in ${WrappedComponent.name}`);
        //     }
        //     const {state, props} = this.watchChange();
        //     const stateWatchList = Object.keys(state);
        //
        //     // if (stateWatchList) {
        //     //     stateWatchList.forEach(key => {
        //     //         let value = parseKey(key, this.state);
        //     //         value = addProxy(value);
        //     //     })
        //     // }
        //
        //     this.state.res.data.database = addProxy(this.state.res.data.database);
        // }

        render() {
            return super.render();
        }
    }
}
