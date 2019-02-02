import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavationItems from './NavigationItems';
import NavationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavitionItems />', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper =shallow(<NavationItems />);

    });

    it('should render two <NavationItems /> elements if not authenticated', ()=>{
        
        expect(wrapper.find(NavationItem)).toHaveLength(2);
    });
    it('should render three <NavationItems /> elements if authenticated', ()=>{
        // wrapper = shallow(<NavationItems isAuthenticated />);
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavationItem)).toHaveLength(3);
    })
    it('should render three <NavationItems /> elements if authenticated', ()=>{
        wrapper = shallow(<NavationItems isAuthenticated />);
        
        expect(wrapper.contains(<NavationItem link='/logout'>Logout</NavationItem>)).toHaveLength(1);
    })
} );