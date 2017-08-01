import { alias, tag } from '@storefront/core';
import ValueRefinementControls from '../value-refinement-controls';

@alias('filterControls')
@tag('gb-filter-refinement-controls', require('./index.html'))
class FilterRefinementControls extends ValueRefinementControls { }

export default FilterRefinementControls;
