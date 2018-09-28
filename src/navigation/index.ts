import { configurable, provide, origin, tag, StoreSections, Events, Selectors, Store, Tag } from '@storefront/core';
import NavigationDisplay from '../navigation-display';
import NavigationList from '../navigation-list';

@configurable
@provide('navigation')
@origin('navigation')
@tag('gb-navigation', require('./index.html'))
class Navigation {
  props: Navigation.Props = {
    alwaysShowTotals: false,
    display: {},
    labels: {},
    collapse: true,
    showOnlyAvailableNavHeaders: false,
    storeSection: StoreSections.DEFAULT,
  };
  state: Navigation.State = {
    fields: [],
  };

  init() {
    switch (this.props.storeSection) {
      case StoreSections.PAST_PURCHASES:
        this.subscribe(Events.PAST_PURCHASE_NAVIGATIONS_UPDATED, this.updateFields);
        this.updateFields(this.select(Selectors.pastPurchaseNavigationsObject));
        break;
      case StoreSections.SEARCH:
        this.subscribe(Events.NAVIGATIONS_UPDATED, this.updateFields);
        this.updateFields(this.select(Selectors.navigationsObject));
        break;
    }
  }

  updateFields = (navigations: Store.Indexed<Store.Navigation>) => {
    const { collapse } = this.props;
    let isActive: boolean | number = true;
    if (typeof collapse !== 'boolean') {
      isActive = collapse.isActive;
    }
    const navs = this.props.showOnlyAvailableNavHeaders && this.props.storeSection === StoreSections.SEARCH
      ? this.select(Selectors.availableNavigations).map((nav) => nav.field)
      : navigations.allIds;

    this.set({
      fields: navs.map((value, index) => ({
        value,
        display: this.props.display[value],
        label: this.props.labels[value],
        active: typeof isActive === 'boolean' ? isActive : index < isActive,
        alwaysShowTotals: this.props.alwaysShowTotals,
      })),
    });
  };
}

interface Navigation extends Tag<Navigation.Props, Navigation.State> {}
namespace Navigation {
  export interface Props {
    alwaysShowTotals: boolean;
    display: NavigationList.DisplayMap;
    labels: { [key: string]: string };
    collapse:
      | boolean
      | {
          isActive: boolean | number;
        };
    showOnlyAvailableNavHeaders: boolean;
    storeSection: string;
  }

  export interface State {
    fields: NavigationDisplay.Field[];
  }
}

export default Navigation;
