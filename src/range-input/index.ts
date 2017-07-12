import { alias, tag, Tag } from '@storefront/core';

@alias('rangeInput')
@tag('gb-range-input', require('./index.html'))
class RangeInput {
  refs: {
    low: HTMLInputElement,
    high: HTMLInputElement
  };
  props: RangeInput.Props = {
    lowPlaceholder: 'Min',
    highPlaceholder: 'Max',
    buttonValue: 'Go'
  };

  init() {
    this.expose('rangeInput', this);
  }
}

interface RangeInput extends Tag { }
namespace RangeInput {
  export interface Props {
    lowPlaceholder?: string;
    highPlaceholder?: string;
    buttonValue?: string;
  }
}

export default RangeInput;
