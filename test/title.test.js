import React from 'react';
import {expect} from 'chai';
import App from '../src/component/App';

import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Enzyme mount 测试 ', function () {
    it('App\'s title should be title', function () {
        // const wrapper = mount(<App />);

        expect(wrapper.text()).to.equal('title')
    });
});