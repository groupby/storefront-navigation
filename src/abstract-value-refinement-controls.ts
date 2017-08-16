import { alias, tag, Events, Selectors, Store, Tag } from '@storefront/core';
import RefinementControls from './refinement-controls';

// tslint:disable-next-line max-line-length
abstract class AbstractValueRefinementControls extends RefinementControls<RefinementControls.Props, AbstractValueRefinementControls.State> {

  state: AbstractValueRefinementControls.State = {
    moreRefinements: () => this.actions.fetchMoreRefinements(this.props.navigation.field)
  };

  abstract get alias(): string;

  // tslint:disable-next-line max-line-length
  transformNavigation<T extends RefinementControls.SelectedNavigation>(navigation: RefinementControls.SelectedNavigation): T {
    return <any>{
      ...navigation,
      refinements: navigation.refinements.map((refinement) => ({
        ...refinement,
        // tslint:disable-next-line max-line-length
        onClick: () => this.actions[refinement.selected ? 'deselectRefinement' : 'selectRefinement'](this.props.navigation.field, refinement.index)
      }))
    };
  }
}

namespace AbstractValueRefinementControls {
  export interface State {
    more?: boolean;
    moreRefinements(): void;
  }

  export interface ActionableNavigation extends RefinementControls.SelectedNavigation {
    refinements: ActionableRefinement[];
  }

  export type ActionableRefinement = RefinementControls.SelectedRefinement & {
    onClick: () => void;
  };
}

export default AbstractValueRefinementControls;
