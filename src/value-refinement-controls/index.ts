import { alias, tag } from '@storefront/core';
import AbstractValueRefinementControls from '../abstract-value-refinement-controls';

@alias('valueControls')
@tag('gb-value-refinement-controls', require('./index.html'))
class ValueRefinementControls extends AbstractValueRefinementControls {
  get alias() {
    return 'valueControls';
  }
}

export default ValueRefinementControls;
