import { alias, tag } from '@storefront/core';
import RefinementControls from '../refinement-controls';

@alias('filterControls')
@tag('gb-filter-refinement-controls', require('./index.html'))
class FilterRefinementControls extends RefinementControls {
  get alias() {
    return 'filterControls';
  }
}

export default FilterRefinementControls;
