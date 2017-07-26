import { Events, Selectors, Tag } from '@storefront/core';

abstract class RefinementControls {

  field: string;
  props: RefinementControls.Props;
  state: RefinementControls.State;

  init() {
    this.updateField(this.props.field);
  }

  onUpdate() {
    this.updateField(this.props.field);
    this.state = { ...this.state, ...this.selectNavigation() };
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

}

interface RefinementControls extends Tag<RefinementControls.Props, RefinementControls.State> { }
namespace RefinementControls {
  export interface Props {
    field: string;
  }

  export interface State {
    label?: string;
  }
}

export default RefinementControls;
