# watch in react
Some feature like watch in Vue, when state or props changes are detected then do something.

### Install
```bash
npm install react-watch -s
```

### Usage
```javascript
import React from 'react'
import {watch} from 'react-watch'

@watch
class Page extends React.Component {
    
    //  return what you want to watch
    watchChange() {
        return {
            state: {
                [`list`]: (prevProps, prevState) => {
                    //  do something when state changed
                    // this.stateChanged();
                }
            },
            props: {
                [`count`]: (prevProps, prevState) => {
                    // do something when props changed
                    // this.propsChanged();
                }
            }
        }
      }
      
      propsChanged() {}
      
      stateChanged() {}
      
      render() {
        const {count} = this.props;
        return <div>{count}</div>;
      }
}

```

### Advices
- state 改变的监测是通过setState函数来触发的，所以每次的setState都认为是state改变了；
- props 改变的监测是监测preProps和props对比的结果，所以props的书写一定要准守规范，每次
返回一个新的对象，这样才可以准确监测到改变；
- 不要在watch的state或props里面继续改变被监听的属性，否则会死循环