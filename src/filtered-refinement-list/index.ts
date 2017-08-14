import { tag } from '@storefront/core';
import AbstractRefinementList from '../abstract-refinement-list';

@tag('gb-filtered-refinement-list', require('./index.html'))
class FilteredRefinementList extends AbstractRefinementList {

  get alias() {
    return 'filteredRefinements';
  }
}

export default FilteredRefinementList;
