import { tag } from '@storefront/core';

@tag('gb-navigation-list', require('./index.html'))
class NavigationList {
  props: NavigationList.Props = {
    fields: []
  };
}

namespace NavigationList {
  export interface Props {
    fields: string[];
  }
}

export default NavigationList;
