import { tag, Tag } from '@storefront/core';

@tag('gb-navigation-list', require('./index.html'))
class NavigationList {

  props: NavigationList.Props = {
    display: {},
    fields: []
  };

  init() {
    this.expose('navigationList', this.props);
  }
}

interface NavigationList extends Tag<NavigationList.Props> { }
namespace NavigationList {
  export interface Props extends Tag.Props {
    display?: { [key: string]: string };
    fields: string[];
  }
}

export default NavigationList;
