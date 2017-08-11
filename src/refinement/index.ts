import { tag, Tag } from '@storefront/core';
import RefinementList from '../refinement-list';
import ValueRefinementControls from '../value-refinement-controls';

@tag('gb-refinement', require('./index.html'))
class Refinement {

  $refinement: ValueRefinementControls.ActionableRefinement;

  onClick(event: Refinement.IndexedClickEvent) {
    event.preventUpdate = true;
    if (this.$refinement.onClick) {
      this.$refinement.onClick();
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
