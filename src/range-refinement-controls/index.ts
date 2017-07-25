import { alias, tag, Selectors, Tag } from '@storefront/core';

@tag('gb-range-refinement-controls', require('./index.html'))
class RangeRefinemnetControls {

  label: string;
  refs: {
    low: HTMLInputElement,
    high: HTMLInputElement
  };
  props: RangeRefinemnetControls.Props = {
    buttonValue: 'Go',
    labels: {
      low: 'Min',
      high: 'Max'
    }
  };

  init() {
    this.expose('rangeRefinementControls', this.props);
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

interface RangeRefinemnetControls extends Tag { }
namespace RangeRefinemnetControls {
  export interface Props {
    buttonValue: string;
    field?: string;
    labels: {
      low: string;
      high: string;
    }
  }
}

export default RangeRefinemnetControls;
