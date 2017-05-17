import { view, Component } from '@storefront/core';

@view('gb-navigation-list', require('./index.html'), [
  { name: 'fields', default: [] }
])
class NavigationList extends Component { }

export default NavigationList;
