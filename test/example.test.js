import React from 'react';
import PropTypes from 'prop-types';
import {expect} from 'chai';
import sinon from 'sinon';
import {mount, configure} from 'enzyme';
import {watch} from "../src";

// @watch
class Foo extends React.Component {
    componentWillReceiveProps() {

    }

    watchChange() {
        return {
            state: {
                [`list`]: () => { this.stateChanged(); console.log('fetchList') }
            },
            props: {
                [`count`]: () => { this.propsChange(); console.log('updateProps') }
            }
        }
    }

    propsChange() {
        console.log('propsChange');
    }

    stateChanged() {
        console.log('stateChanged');
    }

    render() {
        const { name } = this.props;
        return (
            <div>
                {name}
            </div>
        );
    }
}

// Foo.propTypes = {
//     name: PropTypes.string.isRequired,
// };

describe('test case', function () {
    it('should be ok', function () {
        const spy = sinon.spy(Foo.prototype, 'componentWillReceiveProps');

        const wrapper = mount(<Foo foo="bar"/>);
        expect(spy).to.have.property('callCount', 0);
        wrapper.setProps({foo: 'foo'});
        expect(spy).to.have.property('callCount', 1);
    })
})