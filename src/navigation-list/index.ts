import { alias, tag, Tag } from '@storefront/core';

@alias('navigationList')
@tag('gb-navigation-list', require('./index.html'))
class NavigationList {

  rangeInput: any = {};
  props: NavigationList.Props = {
    fields: [],
    rangeInput: []
  };

  init() {
    this.expose('navigationList', this);
    this.props.rangeInput.forEach((value) => {
      this.rangeInput[value] = value;
    });
  }

  useRangeInput(item) {
    return item in this.rangeInput;
  }
}

interface NavigationList extends Tag { }
namespace NavigationList {
  export interface Props {
    fields: string[];
    rangeInput: string[];
  }
}

export default NavigationList;
