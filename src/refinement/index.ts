import { tag, Tag } from '@storefront/core';
import NavigationDisplay from '../navigation-display';
import RefinementList from '../refinement-list';

@tag('gb-refinement', require('./index.html'))
class Refinement {

  $navigationDisplay: NavigationDisplay.State;
  refinement: RefinementList.Refinement;

  init() {
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
