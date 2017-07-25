import { alias, tag, Tag } from '@storefront/core';
import Navigation from '../navigation'

@alias('navigationList')
@tag('gb-navigation-list', require('./index.html'))
class NavigationList {

  $navigation: Navigation;
  rangeInput: any = {};
  defaultRangeInput: any = { 'variants.ReleaseDate': 'variants.ReleaseDate', 'variants.popularity_7days': 'variants.popularity_7days' };
  props: NavigationList.Props = {
    fields: [],
  };

  init() {
    this.expose('navigationList', this);

    const navigationRangeInput = this.$navigation.props.rangeInput;
    this.rangeInput = navigationRangeInput ? navigationRangeInput : this.defaultRangeInput;
  }
}

interface NavigationList extends Tag<NavigationList.Props> { }
namespace NavigationList {
  export interface Props {
    fields: string[];
  }
}

export default NavigationList;
