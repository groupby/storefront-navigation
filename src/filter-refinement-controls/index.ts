import { alias, tag } from '@storefront/core';
import AbstractValueRefinementControls from '../abstract-value-refinement-controls';

@tag('gb-filter-refinement-controls', require('./index.html'))
class FilterRefinementControls extends AbstractValueRefinementControls {

  get alias() {
    return 'filterControls';
  }
}

export default FilterRefinementControls;
