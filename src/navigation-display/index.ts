import { alias, tag, Events, Selectors, Store, Tag } from '@storefront/core';
import RefinementControls from '../refinement-controls';

@alias('navigationDisplay')
@tag('gb-navigation-display', require('./index.html'))
class NavigationDisplay {

  state: NavigationDisplay.State = <any>{
    isActive: true
  };

  init() {
    this.updateField(this.props.field);
  }

  onUpdate() {
    this.updateField(this.props.field);
  }

  updateField(field: NavigationDisplay.Field) {
    const navigation = this.selectNavigation(field.value);
    this.flux.off(`${Events.SELECTED_REFINEMENTS_UPDATED}:${this.state.value}`, this.updateNavigation);
    this.root.classList.remove(`gb-navigation-${this.state.value}`);
    const label = field.label || navigation.label || field.value;
    this.state = { ...this.state, ...field, label, navigation };
    this.root.classList.add(`gb-navigation-${field.value}`);
    this.flux.on(`${Events.SELECTED_REFINEMENTS_UPDATED}:${field.value}`, this.updateNavigation);
  }

  selectNavigation(field: string): RefinementControls.SelectedNavigation {
    const navigation = Selectors.navigation(this.flux.store.getState(), field);
    return <any>{
      ...navigation,
      refinements: navigation.refinements.map((value, index) => ({
        ...value,
        index,
        or: navigation.or,
        range: navigation.range,
        selected: navigation.selected.includes(index)
      }))
    };
  }

  updateNavigation = () => this.set({ navigation: this.selectNavigation(this.state.value) });

  onToggle = () => this.set({ isActive: !this.state.isActive });
}

interface NavigationDisplay extends Tag<NavigationDisplay.Props, NavigationDisplay.State> { }
namespace NavigationDisplay {
  export interface Props extends Tag.Props {
    field: Field;
  }

  export interface State extends Field {
    isActive: boolean;
    navigation: RefinementControls.SelectedNavigation;
  }

  export type Display = 'value' | 'range' | 'filter';

  export interface Field {
    value: string;
    display: Display;
    label: string;
  }
}

export default NavigationDisplay;
