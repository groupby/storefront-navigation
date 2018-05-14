import { tag } from '@storefront/core';
import RefinementList from '../refinement-list';

@tag('gb-filtered-refinement-list', require('./index.html'))
class FilteredRefinementList extends RefinementList {
  get alias() {
    return 'filteredRefinements';
  }
}

export default FilteredRefinementList;
