import { tag, Store, Tag } from '@storefront/core';
import { Slider } from '@storefront/structure';
import RefinementControls from '../refinement-controls';

@tag('gb-slider-refinement-controls', require('./index.html'))
// tslint:disable-next-line max-line-length
class SliderRefinementControls extends RefinementControls<SliderRefinementControls.Props, SliderRefinementControls.State> {

  tags: {
    slider: Slider,
    rangeSelector: Tag
  };
  props: SliderRefinementControls.Props = <any>{
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
    const rangeSelector = this.tags['gb-range-selector'];
    this.updateSelected(parseFloat(rangeSelector.refs.low.value), parseFloat(rangeSelector.refs.high.value));
    const slider = this.tags['gb-slider'];
    if (event.target === rangeSelector.refs.low) {
      slider.moveHandle(slider.refs.lower, slider.props.low);
    } else {
      slider.moveHandle(slider.refs.upper, slider.props.high);
    }
  }

  updateSelected = (low: number, high: number) => this.set({ low, high });

}

// tslint:disable-next-line max-line-length
interface SliderRefinementControls extends RefinementControls<SliderRefinementControls.Props, SliderRefinementControls.State> { }
namespace SliderRefinementControls {
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

export default SliderRefinementControls;
