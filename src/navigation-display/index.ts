import { tag, Events, Store, Tag } from '@storefront/core';
import { Selectors } from '@storefront/flux-capacitor';

@tag('gb-navigation-display', require('./index.html'))
class NavigationDisplay {

  field: string;
  state: NavigationDisplay.State = {
    onClick: (index) => this.flux[this.isSelected(index) ? 'unrefine' : 'refine'](this.field, index)
  };

  onBeforeMount() {
    this.root.classList.add(`gb-navigation-${this.props.field}`);
    this.updateNavigation();
    this.flux.on(`${Events.SELECTED_REFINEMENTS_UPDATED}:${this.props.field}`, this.updateNavigation);
    this.expose('navigationDisplay');
  }

  onUpdate() {
    if (this.field !== this.props.field) {
      this.updateNavigation();
    }
  }

  updateNavigation = () => {
    this.state = {
      ...this.state,
      ...this.extractNavigation(this.flux.store.getState(), this.field = this.props.field)
    };
  }

  extractNavigation(state: Store.State, field: string) {
    const navigation = state.data.navigations.byId[field];
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

interface NavigationDisplay extends Tag<NavigationDisplay.Props, NavigationDisplay.State> { }
namespace NavigationDisplay {
  export interface Props {
    field: string;
  }

  export interface State {
    label?: string;
    more?: boolean;
    onClick(index: number): void;
  }
}

export default NavigationDisplay;
