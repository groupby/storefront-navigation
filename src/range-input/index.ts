import { alias, tag, Selectors, Tag } from '@storefront/core';

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
    this.label = Selectors.navigation(this.flux.store.getState(), this.props.field).label;
  }

  search = () => {
    const low = parseFloat(this.refs.low.value);
    const high = parseFloat(this.refs.high.value);
    // this.actions.addRefinement(this.props.field, low, high);
    this.actions.updateSearch({
      navigationId: this.props.field,
      high,
      low,
      range: true
    });
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
