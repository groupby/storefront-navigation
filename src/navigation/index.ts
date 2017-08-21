import { alias, configurable, origin, tag, Events, Store, Tag } from '@storefront/core';
import NavigationDisplay from '../navigation-display';
import NavigationList from '../navigation-list';

@configurable
@alias('navigation')
@origin('navigation')
@tag('gb-navigation', require('./index.html'))
class Navigation {

  props: Navigation.Props = {
    display: {},
    labels: {},
    collapse: true,
    defaultOpen: 3
  };
  state: Navigation.State = {
    fields: []
  };

  init() {
    this.flux.on(Events.NAVIGATIONS_UPDATED, this.updateFields);
  }

  updateFields = (navigations: Store.Indexed<Store.Navigation>) =>
    this.set({
      fields: navigations.allIds.map((value, index) => ({
        value,
        display: this.props.display[value],
        label: this.props.labels[value],
        active: index < this.props.defaultOpen
      }))
    })
}

interface Navigation extends Tag<Navigation.Props, Navigation.State> { }
namespace Navigation {
  export interface Props extends Tag.Props {
    display: NavigationList.DisplayMap;
    labels: { [key: string]: string };
    collapse: boolean;
    defaultOpen?: number;
  }

  export interface State {
    fields: NavigationDisplay.Field[];
  }
}

export default Navigation;
