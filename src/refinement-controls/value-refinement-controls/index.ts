import { alias, tag, Events, Selectors, Store, Tag } from '@storefront/core';
import RefinementControls from '../controls';

@tag('gb-value-refinement-controls', require('./index.html'))
class ValueRefinementControls extends RefinementControls<RefinementControls.Props, ValueRefinementControls.State> {

  state: ValueRefinementControls.State = {
    moreRefinements: () => this.actions.fetchMoreRefinements(this.props.navigation.field)
  };

  get alias() {
    return 'valueControls';
  }

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

namespace ValueRefinementControls {
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

export default ValueRefinementControls;
