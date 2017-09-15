import { tag, Store, Tag } from '@storefront/core';
import { Slider } from '@storefront/structure';
import RefinementControls from '../refinement-controls';

@tag('gb-range-refinement-controls', require('./index.html'), require('./index.css'))
class RangeRefinementControls extends RefinementControls<RangeRefinementControls.Props, RangeRefinementControls.State> {

  refs: {
    low: HTMLInputElement,
    high: HTMLInputElement
  };
  tags: {
    slider: Slider
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
    const refinements: Store.RangeRefinement[] = <any>this.props.navigation.refinements;
    const selected = refinements[this.props.navigation.selected[0]] || {};
    const min = refinements[0]['low'];
    const max = Math.max(...refinements.map((refinement) => refinement['high']));

    this.state = { ...this.state,
      min,
      max,
      low: selected['low'] || min,
      high: selected['high'] || max
    };
  }

  onChange = (event: KeyboardEvent) => {
    this.updateSelected(parseFloat(this.refs.low.value), parseFloat(this.refs.high.value));
    const slider = this.tags['gb-slider'];
    if (event.target === this.refs.low) {
      slider.moveHandle(slider.refs.lower, slider.props.low);
    } else {
      slider.moveHandle(slider.refs.upper, slider.props.high);
    }
  }

  onClick = () => {
    if (!isNaN(this.state.high) && !isNaN(this.state.low)) {
      if (this.state.low > this.state.high) {
        this.actions.switchRefinement(this.props.navigation.field, this.state.high, this.state.low);
      } else {
        this.actions.switchRefinement(this.props.navigation.field, this.state.low, this.state.high);
      }
    }
  }

  updateSelected = (low: number, high: number) => this.set({ low, high });

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
