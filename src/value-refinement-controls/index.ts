import { alias, tag, Events, Selectors, Store, Tag } from '@storefront/core';
import RefinementControls from '../refinement-controls';

@alias('valueControls')
@tag('gb-value-refinement-controls', require('./index.html'))
class ValueRefinementControls extends RefinementControls<RefinementControls.Props, ValueRefinementControls.State> {

  state: ValueRefinementControls.State = {
    onClick: (index) => {
      // tslint:disable-next-line max-line-length
      this.actions[this.isSelected(index) ? 'deselectRefinement' : 'selectRefinement'](this.props.navigation.field, index);
    },
    moreRefinements: () => this.actions.fetchMoreRefinements(this.props.navigation.field)
  };

  get alias() {
    return 'valueControls';
  }

  isSelected(index: number) {
    return Selectors.isRefinementSelected(this.flux.store.getState(), this.props.navigation.field, index);
  }
}

namespace ValueRefinementControls {
  export interface State {
    more?: boolean;
    onClick(index: number): void;
    moreRefinements(): void;
  }
}

export default ValueRefinementControls;
