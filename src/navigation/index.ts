import { tag, Events, Store, Tag } from '@storefront/core';

// TODO can we rename this? hard to have alias for navigation component
// vs alias for a navigtion object
@tag('gb-navigation', require('./index.html'))
class Navigation {

  state: Navigation.State = {
    fields: []
  };

  init() {
    this.expose('navigation');
    this.flux.on(Events.NAVIGATIONS_UPDATED, this.updateFields);
  }

  updateFields = (navigations: Store.Indexed<Store.Navigation>) =>
    this.set({ fields: navigations.allIds })
}

interface Navigation extends Tag<any, Navigation.State> { }
namespace Navigation {
  export interface State {
    fields: string[];
  }
}

export default Navigation;
