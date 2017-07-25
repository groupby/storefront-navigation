import { alias, tag, Tag } from '@storefront/core';
import Navigation from '../navigation'

@alias('navigationList')
@tag('gb-navigation-list', require('./index.html'))
class NavigationList {

  $navigation: Navigation;
  rangeInput: any = {};
  defaultRangeInput: string[] = ['variants.ReleaseDate', 'variants.popularity_7days'];
  props: NavigationList.Props = {
    fields: [],
  };

  init() {
    this.expose('navigationList', this);

    const navigationRangeInput = this.$navigation.props.rangeInput;
    const rangeInput = navigationRangeInput ? navigationRangeInput : this.defaultRangeInput;
    rangeInput.forEach((value) => {
      this.rangeInput[value] = value;
    });
  }

  useRangeInput(item) {
    return item in this.rangeInput;
  }
}

interface NavigationList extends Tag<NavigationList.Props> { }
namespace NavigationList {
  export interface Props {
    fields: string[];
  }
}

export default NavigationList;
