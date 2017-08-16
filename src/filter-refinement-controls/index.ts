import { alias, tag } from '@storefront/core';
import ValueRefinementControls from '../value-refinement-controls';

@tag('gb-filter-refinement-controls', require('./index.html'))
class FilterRefinementControls extends ValueRefinementControls {

  get alias() {
    return 'filterControls';
  }
}

export default FilterRefinementControls;
