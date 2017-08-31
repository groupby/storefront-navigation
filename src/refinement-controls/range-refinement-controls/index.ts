import { tag, Tag } from '@storefront/core';
import RefinementControls from '../controls';

@tag('gb-range-refinement-controls', require('./index.html'))
class RangeRefinementControls extends RefinementControls<RangeRefinementControls.Props> {

  refs: {
    low: HTMLInputElement,
    high: HTMLInputElement
  };
  props: RangeRefinementControls.Props = <any>{
    labels: {
      low: 'Min',
      high: 'Max',
      submit: 'Submit'
    }
  };

  get alias() {
    return 'rangeControls';
  }

  onClick() {
    const low = parseFloat(this.refs.low.value);
    const high = parseFloat(this.refs.high.value);
    this.actions.addRefinement(this.props.navigation.field, low, high);
  }
}

interface RangeRefinementControls extends RefinementControls<RangeRefinementControls.Props> { }
namespace RangeRefinementControls {
  export interface Props extends RefinementControls.Props {
    labels: {
      low: string;
      high: string;
      submit: string;
    };
  }
}

export default RangeRefinementControls;
