import { view, Component } from '@storefront/core';
import NavigationDisplay from '../navigation-display';
import RefinementList from '../refinement-list';

@view('gb-refinement', require('./index.html'))
class Refinement extends Component {
  $navigationDisplay: NavigationDisplay.State;
  refinement: RefinementList.Refinement;

  onBeforeMount() {
    // TODO: having this in the constructor it was not inheritable, should it have been?
    this.expose('refinement', this.refinement);
  }

  onClick(event: Event & { preventUpdate: boolean, item: { index: number } }) {
    event.preventUpdate = true;
    if (this.$navigationDisplay.onClick) {
      this.$navigationDisplay.onClick(event.item.index);
    }
  }
}

export default Refinement;
