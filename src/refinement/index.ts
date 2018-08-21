import { tag, Tag } from '@storefront/core';
import RefinementList from '../refinement-list';
import ValueRefinementControls from '../value-refinement-controls';

@tag('gb-refinement', require('./index.html'))
class Refinement {
  getTotal() {
    return this.props.total;
  }

  onClick(event: Refinement.IndexedClickEvent) {
    event.preventUpdate = true;
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
}

interface Refinement extends Tag<Refinement.Props> {}
namespace Refinement {
  export interface Props {
    onClick: () => void;
    total: number;
  }

  export interface IndexedClickEvent extends Event, Tag.Event {
    item: { i: number };
  }
}

export default Refinement;
