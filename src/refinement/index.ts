import { configurable, provide, tag, Selectors, Tag } from '@storefront/core';
import RefinementList from '../refinement-list';
import ValueRefinementControls from '../value-refinement-controls';

@configurable
@provide('refinementDisplay')
@tag('gb-refinement', require('./index.html'))
class Refinement {
  props: Refinement.Props = <Refinement.Props>{
    alwaysShowCount: false,
  };

  state: Refinement.State = {
    total: 0,
  };

  init() {
    this.updateTotal();
  }

  onUpdate() {
    this.updateTotal();
  }

  onClick(event: Refinement.IndexedClickEvent) {
    event.preventUpdate = true;
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  updateTotal() {
    this.state = {
      ...this.state,
      total: this.props.selected && !this.props.or ? this.select(Selectors.recordCount) : this.props.total,
    }
  }
}

interface Refinement extends Tag<Refinement.Props> {}
namespace Refinement {
  export interface Props {
    alwaysShowCount: boolean;
    onClick: () => void;
    or: boolean;
    selected: boolean;
    total: number;
  }

  export interface State {
    total: number;
  }

  export interface IndexedClickEvent extends Event, Tag.Event {
    item: { i: number };
  }
}

export default Refinement;
