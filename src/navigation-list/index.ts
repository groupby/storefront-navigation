import { provide, tag, Selectors, Tag } from '@storefront/core';
import NavigationDisplay from '../navigation-display';

@provide('navigationList', (props) => props)
@tag('gb-navigation-list', require('./index.html'))
class NavigationList {
  props: NavigationList.Props = <any>{
    fields: [],
  };
}

interface NavigationList extends Tag<NavigationList.Props> {}
namespace NavigationList {
  export interface Props extends Tag.Props {
    collapse: boolean;
    fields: NavigationDisplay.Field[];
  }

  export interface DisplayMap {
    [key: string]: NavigationDisplay.Display;
  }
}

export default NavigationList;
