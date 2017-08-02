import { alias, tag, Selectors, Tag } from '@storefront/core';
import NavigationDisplay from '../navigation-display';

@tag('gb-navigation-list', require('./index.html'))
class NavigationList {

  props: NavigationList.Props = {
    fields: [],
  };
}

interface NavigationList extends Tag<NavigationList.Props> { }
namespace NavigationList {
  export interface Props extends Tag.Props {
    fields: NavigationDisplay.Field[];
  }

  export interface DisplayMap {
    [key: string]: NavigationDisplay.Display;
  }
}

export default NavigationList;
