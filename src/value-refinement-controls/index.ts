import { alias, tag, Events, Selectors, Store, Tag } from '@storefront/core';
import AbstractValueRefinementControls from '../abstract-value-refinement-controls';
import RefinementControls from '../refinement-controls';

@tag('gb-value-refinement-controls', require('./index.html'))
class ValueRefinementControls extends AbstractValueRefinementControls {

  get alias() {
    return 'valueControls';
  }
}

export default ValueRefinementControls;
