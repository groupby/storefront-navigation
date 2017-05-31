import { tag } from '@storefront/core';

@tag('gb-navigation-list', require('./index.html'), [
  { name: 'fields', default: [] }
])
export default class NavigationList { }
