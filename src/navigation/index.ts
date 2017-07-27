import { alias, configurable, origin, tag, Events, Store, Tag } from '@storefront/core';

@configurable
// TODO can we rename this? hard to have alias for navigation component
// vs alias for a navigation object
@alias('navigation')
@origin('navigation')
@tag('gb-navigation', require('./index.html'))
class Navigation {

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
  export interface Props {
    display?: { [key: string]: string };
  }

  export interface State {
    fields: string[];
  }
}

export default Navigation;
