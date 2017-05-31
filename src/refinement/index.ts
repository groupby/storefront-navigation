import { tag, Tag } from '@storefront/core';
import NavigationDisplay from '../navigation-display';
import RefinementList from '../refinement-list';

@tag('gb-refinement', require('./index.html'))
class Refinement {

  $navigationDisplay: NavigationDisplay.State;
  refinement: RefinementList.Refinement;

  onBeforeMount() {
    // TODO: having this in init() it was not inheritable, should it have been?
    this.expose('refinement', this.refinement);
  }

  onClick(event: Refinement.IndexedClickEvent) {
    event.preventUpdate = true;
    if (this.$navigationDisplay.onClick) {
      this.$navigationDisplay.onClick(event.item.index);
    }
  }
}

interface Refinement extends Tag { }
namespace Refinement {
  export interface IndexedClickEvent extends Event, Tag.Event {
    item: { index: number };
  }
}

export default Refinement;
