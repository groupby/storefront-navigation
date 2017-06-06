import { alias, tag, Events, Selectors, Store, Tag } from '@storefront/core';

@alias('navigationDisplay')
@tag('gb-navigation-display', require('./index.html'))
class NavigationDisplay {

  field: string;
  state: NavigationDisplay.State = {
    onClick: (index) => {
      if (this.isSelected(index)) {
        this.flux.unrefine(this.field, index);
      } else {
        this.flux.refine(this.field, index);
      }
    },
    moreRefinements: () => this.flux.moreRefinements(this.field)
  };

  init() {
    this.updateField(this.props.field);
    this.updateNavigation();
    this.flux.on(`${Events.SELECTED_REFINEMENTS_UPDATED}:${this.field}`, this.updateNavigation);
  }

  onUpdate() {
    if (this.props.field !== this.field) {
      this.updateField(this.props.field);
      this.state = { ...this.state, ...this.selectNavigation() };
      this.updateAlias('navigationDisplay', this.state);
    }
  }

  updateField(field: string) {
    this.root.classList.remove(`gb-navigation-${this.field}`);
    this.root.classList.add(`gb-navigation-${this.field = field}`);
  }

  updateNavigation = () => this.set(this.selectNavigation());

  selectNavigation() {
    const navigation = this.flux.store.getState().data.navigations.byId[this.field];
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
    moreRefinements(): void;
  }
}

export default NavigationDisplay;
