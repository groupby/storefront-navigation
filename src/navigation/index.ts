import { view, Component, Events, Store } from '@storefront/core';

// TODO can we rename this? hard to have alias for navigation component
// vs alias for a navigtion object
@view('gb-navigation', require('./index.html'))
class Navigation extends Component {

  state: Navigation.State = {
    fields: []
  };

  constructor() {
    super();
    this.expose('navigation');
    this.flux.on(Events.NAVIGATIONS_UPDATED, this.updateFields);
  }

  updateFields = (navigations: Store.Indexed<Store.Navigation>) =>
    this.set({ fields: navigations.allIds })
}

namespace Navigation {
  export interface State {
    fields: string[];
  }
}

export default Navigation;
