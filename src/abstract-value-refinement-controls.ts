import { alias, tag, Events, Selectors, Store, Tag } from '@storefront/core';
import RefinementControls from './refinement-controls';

abstract class AbstractValueRefinementControls extends RefinementControls<RefinementControls.Props, AbstractValueRefinementControls.State> {

  state: AbstractValueRefinementControls.State = {
    onClick: (index) => {
      if (this.isSelected(index)) {
        this.actions.deselectRefinement(this.field, index);
      } else {
        this.actions.selectRefinement(this.field, index);
      }
    },
    moreRefinements: () => this.actions.fetchMoreRefinements(this.field)
  };

  abstract get alias(): string;

  onUpdate() {
    super.onUpdate();
    this.updateAlias(this.alias, this.state);
  }

  isSelected(index: number) {
    return Selectors.isRefinementSelected(this.flux.store.getState(), this.field, index);
  }
}

interface AbstractValueRefinementControls extends Tag<RefinementControls.Props, AbstractValueRefinementControls.State> { }
namespace AbstractValueRefinementControls {
  export interface State extends RefinementControls.State {
    more?: boolean;
    onClick(index: number): void;
    moreRefinements(): void;
  }
}

export default AbstractValueRefinementControls;
