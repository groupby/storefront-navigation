import { tag, Tag } from '@storefront/core';
import ValueRefinementControls from '../value-refinement-controls';
import RefinementList from '../refinement-list';

@tag('gb-refinement', require('./index.html'))
class Refinement {

  $valueControls: ValueRefinementControls.State;

  onClick(event: Refinement.IndexedClickEvent) {
    event.preventUpdate = true;
    if (this.$valueControls.onClick) {
      this.$valueControls.onClick(event.item.i);
    }
  }
}

interface Refinement extends Tag { }
namespace Refinement {
  export interface IndexedClickEvent extends Event, Tag.Event {
    item: { i: number };
  }
}

export default Refinement;
