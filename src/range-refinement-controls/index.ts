import { tag, Tag } from '@storefront/core';
import RefinementControls from '../refinement-controls';

@tag('gb-range-refinement-controls', require('./index.html'), require('./index.css'))
class RangeRefinementControls extends RefinementControls<RangeRefinementControls.Props, RangeRefinementControls.State> {

  refs: {
    low: HTMLInputElement,
    high: HTMLInputElement
  };
  tags: {
    // TODO: give a type!
    slider: any
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
    const selected = refinements[this.props.navigation.selected[0]] || {};
    const min = parseFloat(refinements[0]['low']);
    const max = refinements.reduce((curMax, cur) => Math.max(curMax, cur['high']), -Infinity);
    this.state = { ...this.state,
      min,
      max,
      low: parseFloat(selected['low']) || min,
      high: parseFloat(selected['high']) || max
    };
  }

  onChange = (event: KeyboardEvent) => {
    this.updateProps(parseFloat(this.refs.low.value), parseFloat(this.refs.high.value));
    const slider = this.tags['gb-slider'];
    if (event.target === this.refs.low) {
      slider.moveHandle(slider.state.handleLower, slider.props.low);
    } else {
      slider.moveHandle(slider.state.handleUpper, slider.props.high);
    }
  }

  onClick = () => {
    // TODO: don't send any refinement (clear refinement) if range = full range?
    if (!isNaN(this.state.high) && !isNaN(this.state.low)) {
      if (this.state.low > this.state.high) {
        this.actions.switchRefinement(this.props.navigation.field, this.state.high, this.state.low);
      } else {
        this.actions.switchRefinement(this.props.navigation.field, this.state.low, this.state.high);
      }
    }
  }

  updateProps = (low: number, high: number) => {
    this.set({ low, high });
  }
}

// tslint:disable-next-line max-line-length
interface RangeRefinementControls extends RefinementControls<RangeRefinementControls.Props, RangeRefinementControls.State> { }
namespace RangeRefinementControls {
  export interface Props extends RefinementControls.Props {
    labels: {
      low: string;
      high: string;
      submit: string;
    };
  }

  export interface State extends RefinementControls.State {
    min: number;
    max: number;
    low: number;
    high: number;
  }
}

export default RangeRefinementControls;
