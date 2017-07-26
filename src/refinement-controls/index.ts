abstract class RefinementControls {
  init() {
    this.updateField(this.props.field);
  }

  onUpdate() {
    this.updateField(this.props.field);
    this.state = { ...this.state, ...this.selectNavigation() };
    this.updateAlias('valueControls', this.state);
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

namespace RefinementControls {
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

export default RefinementControls;
