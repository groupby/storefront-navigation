import { tag, Store, Tag } from '@storefront/core';
import AbstractRefinementList from '../abstract-refinement-list';

@tag('gb-refinement-list', require('./index.html'))
class RefinementList extends AbstractRefinementList {
  get alias() {
    return 'refinements';
  }
}

export default RefinementList;
