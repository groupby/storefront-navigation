import * as Core from '@storefront/core';
import NavigationDisplay from '../navigation-display';
import NavigationList from '../navigation-list';

@Core.configurable
@Core.provide('navigation')
@Core.origin('navigation')
@Core.tag('gb-navigation', require('./index.html'))
class Navigation {
  props: Navigation.Props = {
    display: {},
    labels: {},
    collapse: true,
  };
  state: Navigation.State = {
    fields: [],
  };

  init() {
    this.subscribe(Core.Events.NAVIGATIONS_UPDATED, this.updateFields);
  }

  onBeforeMount() {
    this.updateFields(this.select(Core.Selectors.navigationsObject));
  }

  updateFields = (navigations: Core.Store.Indexed<Core.Store.Navigation>) => {
    const { collapse } = this.props;
    let isActive: boolean | number = true;
    if (typeof collapse !== 'boolean') {
      isActive = collapse.isActive;
    }

    this.set({
      fields: navigations.allIds.map((value, index) => ({
        value,
        display: this.props.display[value],
        label: this.props.labels[value],
        active: typeof isActive === 'boolean' ? isActive : index < isActive,
      })),
    });
  };
}

interface Navigation extends Core.Tag<Navigation.Props, Navigation.State> {}
namespace Navigation {
  export interface Props {
    display: NavigationList.DisplayMap;
    labels: { [key: string]: string };
    collapse:
      | boolean
      | {
          isActive: boolean | number;
        };
  }

  export interface State {
    fields: NavigationDisplay.Field[];
  }
}

export default Navigation;
