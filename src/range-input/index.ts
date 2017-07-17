import { alias, tag, Tag } from '@storefront/core';

@alias('rangeInput')
@tag('gb-range-input', require('./index.html'))
class RangeInput {

  label: string;
  refs: {
    low: HTMLInputElement,
    high: HTMLInputElement
  };
  props: RangeInput.Props = {
    lowPlaceholder: 'Min',
    highPlaceholder: 'Max',
    buttonValue: 'Go',
  };

  init() {
    this.expose('rangeInput', this);
    if (!this.props.field)
      return;
    const navigation = this.flux.store.getState().data.navigations.byId[this.props.field];
    this.label = navigation.label;
  }

  search = () => {
    const low = this.refs.low.value;
    const high = this.refs.high.value;
    this.actions.updateSearch({
      navigationId: this.props.field,
      high,
      low
    });
    console.log(this.actions)
  }
}

interface RangeInput extends Tag { }
namespace RangeInput {
  export interface Props {
    lowPlaceholder?: string;
    highPlaceholder?: string;
    buttonValue?: string;
    field?: string;
  }
}

export default RangeInput;
