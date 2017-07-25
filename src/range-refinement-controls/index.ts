import { alias, tag, Selectors, Tag } from '@storefront/core';

@tag('gb-range-refinement-controls', require('./index.html'))
class RangeRefinementControls {

  label: string;
  refs: {
    low: HTMLInputElement,
    high: HTMLInputElement
  };
  props: RangeRefinementControls.Props = {
    labels: {
      low: 'Min',
      high: 'Max',
      submit: 'Submit'
    }
  };

  init() {
    this.expose('rangeControls', this.props);
    this.label = Selectors.navigation(this.flux.store.getState(), this.props.field).label;
  }

  search = () => {
    const low = parseFloat(this.refs.low.value);
    const high = parseFloat(this.refs.high.value);
    this.actions.addRefinement(this.props.field, low, high);
  }
}

interface RangeRefinementControls extends Tag { }
namespace RangeRefinementControls {
  export interface Props {
    field?: string;
    labels: {
      low: string;
      high: string;
      submit: string;
    }
  }
}

export default RangeRefinementControls;
