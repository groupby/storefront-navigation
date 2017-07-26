import { alias, tag, Events, Selectors, Store, Tag } from '@storefront/core';

@alias('valueControls')
@tag('gb-value-refinement-controls', require('./index.html'))
class ValueRefinementControls {

  field: string;
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

  init() {
    this.updateField(this.props.field);
    this.updateNavigation();
  }

  onUpdate() {
    this.updateField(this.props.field);
    this.state = { ...this.state, ...this.selectNavigation() };
    this.updateAlias('valueRefinementControls', this.state);
  }

  updateField(field: string) {
    this.flux.off(`${Events.SELECTED_REFINEMENTS_UPDATED}:${this.field}`, this.updateNavigation);
    this.root.classList.remove(`gb-navigation-${this.field}`);
    this.field = field;
    this.root.classList.add(`gb-navigation-${field}`);
    this.flux.on(`${Events.SELECTED_REFINEMENTS_UPDATED}:${field}`, this.updateNavigation);
  }

  updateNavigation = () => this.set(this.selectNavigation());

  selectNavigation() {
    const navigation = Selectors.navigation(this.flux.store.getState(), this.field);
    return {
      ...navigation,
      refinements: navigation.refinements.map((value, index) => ({
        ...value,
        selected: navigation.selected.includes(index)
      }))
    };
  }

  isSelected(index: number) {
    return Selectors.isRefinementSelected(this.flux.store.getState(), this.field, index);
  }
}

interface ValueRefinementControls extends Tag<ValueRefinementControls.Props, ValueRefinementControls.State> { }
namespace ValueRefinementControls {
  export interface Props {
    field: string;
  }

  export interface State {
    label?: string;
    more?: boolean;
    onClick(index: number): void;
    moreRefinements(): void;
  }
}

export default ValueRefinementControls;
