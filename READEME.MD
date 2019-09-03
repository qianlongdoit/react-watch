# watch in react
Some feature like watch in Vue, when detected state or props changed then do something.

### Install
`npm install watch-in-react -s`

### Usage
```javascript
import React from 'react'
import watch from 'watch-in-props'

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