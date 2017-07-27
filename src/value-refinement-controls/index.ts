import { alias, tag, Events, Selectors, Store, Tag } from '@storefront/core';
import RefinementControls from '../refinement-controls';

@alias('valueControls')
@tag('gb-value-refinement-controls', require('./index.html'))
class ValueRefinementControls extends RefinementControls<RefinementControls.Props, ValueRefinementControls.State> {

  state: ValueRefinementControls.State = {
    onClick: (index) => {
      if (this.isSelected(index)) {
        this.actions.deselectRefinement(this.field, index);
      } else {
        this.actions.selectRefinement(this.field, index);
      }
    },
    moreRefinements: () => this.actions.fetchMoreRefinements(this.field)
  };

  onUpdate() {
    super.onUpdate();
    this.updateAlias('valueControls', this.state);
  }

  isSelected(index: number) {
    return Selectors.isRefinementSelected(this.flux.store.getState(), this.field, index);
  }
}

interface ValueRefinementControls extends Tag<RefinementControls.Props, ValueRefinementControls.State> { }
namespace ValueRefinementControls {
  export interface State extends RefinementControls.State {
    more?: boolean;
    onClick(index: number): void;
    moreRefinements(): void;
  }
}

export default ValueRefinementControls;
