import { tag, Store, Tag } from '@storefront/core';
import { Slider } from '@storefront/structure';
import RangeRefinementControls from '../range-refinement-controls';
import RefinementControls from '../refinement-controls';

@tag('gb-slider-refinement-controls', require('./index.html'))
// tslint:disable-next-line max-line-length
class SliderRefinementControls extends RangeRefinementControls {

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
}

export default SliderRefinementControls;
