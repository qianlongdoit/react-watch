# watch in react
Some feature like watch in Vue, when state or props changes are detected then do something.

### Install
```bash
npm install @st-fed/react-watch -s
```

### Usage
```javascript
import React from 'react'
import {watch} from '@st-fed/react-watch'

@watch
class Page extends React.Component {
    
    //  return what you want to watch
    watchChange() {
        return {
            state: {
                [`list`]: (prevProps, prevState) => {
                    this.stateChanged();
                }
            },
            props: {
                [`count`]: (prevProps, prevState) => {
                    this.propsChanged();
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