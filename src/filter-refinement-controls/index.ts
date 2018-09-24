import { tag } from '@storefront/core';
import ValueRefinementControls from '../value-refinement-controls';

@tag('gb-filter-refinement-controls', require('./index.html'))
class FilterRefinementControls extends ValueRefinementControls {
  get alias() {
    return 'filterControls';
  }

  selectAllRefinements = () => this.actions.selectAllRefinements(this.props.navigation.field)

  fetchMoreRefinements = () => {
    if (this.state.more) {
      this.state.moreRefinements();
    }
  }
}

export default FilterRefinementControls;
