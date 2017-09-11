import { tag, Tag } from '@storefront/core';
import RefinementControls from '../refinement-controls';

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

  init() {
    const refinements = this.props.navigation.refinements;
    const low = refinements[0]['low'];
    const high = refinements[refinements.length - 1]['high'];
    console.log(low, high);
    this.state = { ...this.state, low, high };
  }

  onClick = () => {
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

  export interface State {
    low: number;
    high: number;
  }
}

export default RangeRefinementControls;
