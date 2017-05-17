import { view, Component, Store } from '@storefront/core';

@view('gb-navigation-display', require('./index.html'))
class NavigationDisplay extends Component {
  field: string;
  props: NavigationDisplay.Props;
  state: NavigationDisplay.State;

  constructor() {
    super();
  }

  onBeforeMount() {
    this.root.classList.add(`gb-navigation-${this.props.field}`);
    this.updateNavigation();
    this.expose('navigationDisplay');
  }

  onUpdate() {
    if (this.field !== this.props.field) {
      this.updateNavigation();
    }
  }

  updateNavigation() {
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
}

namespace NavigationDisplay {
  export interface Props {
    field: string;
  }
  export interface State {
    label: string;
    more: boolean;
    // refinements:
  }
}

export default NavigationDisplay;
