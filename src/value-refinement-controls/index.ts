import { tag, Events, Selectors, Store, Tag } from '@storefront/core';
import RefinementControls from '../refinement-controls';

@tag('gb-value-refinement-controls', require('./index.html'))
class ValueRefinementControls extends RefinementControls<RefinementControls.Props, ValueRefinementControls.State> {
  state: ValueRefinementControls.State = {
    moreRefinements: () => this.actions.fetchMoreRefinements(this.props.navigation.field),
    selectAllRefinements: () => this.actions.selectAllRefinements(this.props.navigation.field)
  };

  get alias() {
    return 'valueControls';
  }

  transformNavigation<T extends RefinementControls.SelectedNavigation>(
    navigation: RefinementControls.SelectedNavigation
  ): T {
    return <any>{
      ...navigation,
      refinements: navigation.refinements.map((refinement) => ({
        ...refinement,
        onClick: () =>
          this.actions[refinement.selected ? 'deselectRefinement' : 'selectRefinement'](
            this.props.navigation.field,
            refinement.index
          ),
      })),
    };
  }
}

namespace ValueRefinementControls {
  export interface State {
    more?: boolean;
    moreRefinements(): void;
    selectAllRefinements(): void;
  }

  export interface ActionableNavigation extends RefinementControls.SelectedNavigation {
    refinements: ActionableRefinement[];
  }

  export type ActionableRefinement = RefinementControls.SelectedRefinement & {
    onClick: () => void;
  };
}

export default ValueRefinementControls;
