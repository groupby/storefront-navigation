import { alias, configurable, origin, tag, Events, Store, Tag } from '@storefront/core';
import NavigationList from '../navigation-list';

@configurable
@alias('navigation')
@origin('navigation')
@tag('gb-navigation', require('./index.html'))
class Navigation {

  props: Navigation.Props = {
    display: {},
    labels: {}
  };
  state: Navigation.State = {
    fields: []
  };

  init() {
    this.flux.on(Events.NAVIGATIONS_UPDATED, this.updateFields);
  }

  updateFields = (navigations: Store.Indexed<Store.Navigation>) =>
    this.set({ fields: navigations.allIds })
}

interface Navigation extends Tag<Navigation.Props, Navigation.State> { }
namespace Navigation {
  export interface Props extends Tag.Props {
    display: NavigationList.DisplayMap;
    labels: { [key: string]: string };
  }

  export interface State {
    fields: string[];
  }
}

export default Navigation;
