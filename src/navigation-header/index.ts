import { tag, Tag } from '@storefront/core';
import NavigationDisplay from '../navigation-display';

@tag('gb-navigation-header', require('./index.html'), require('./index.css'))
class NavigationHeader {

  props: NavigationHeader.Props = <any>{
    icons: {}
  };

  init() {
    this.expose('navigationHeader', this.props);
  }
}

interface NavigationHeader extends Tag { }
namespace NavigationHeader {
  export interface Props extends Tag.Props {
    icons: NavigationDisplay.Icons;
    label: string;
    isActive: boolean;
    collapse: boolean;
    onToggle: (active: boolean) => void;
  }
}

export default NavigationHeader;
