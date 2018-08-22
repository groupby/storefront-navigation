import { configurable, provide, tag, Selectors, Store, Tag } from '@storefront/core';
import RefinementList from '../refinement-list';
import ValueRefinementControls from '../value-refinement-controls';

@provide('refinementDisplay')
@tag('gb-refinement', require('./index.html'))
class Refinement {
  props: Refinement.Props = {
    alwaysShowTotal: false,
  };

  state: Refinement.State = {
    total: 0,
    showTotal: false,
    label: '',
  };

  init() {
    this.updateState();
  }

  onUpdate() {
    this.updateState();
  }

  updateState() {
    this.state = {
      ...this.state,
      total: this.getTotal(),
      showTotal: this.shouldShowTotal(),
      label: this.getLabel(),
    };
  }

  onClick(event: Refinement.IndexedClickEvent) {
    event.preventUpdate = true;
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  getTotal() {
    return this.props.selected && !this.props.or ? this.select(Selectors.recordCount) : this.props.total;
  }

  shouldShowTotal() {
    return this.state.total > 0 && (this.props.alwaysShowTotal || !this.props.selected);
  }

  getLabel() {
    return this.props.range ? this.props.low + ' - ' + this.props.high : this.props.value;
  }
}

interface Refinement extends Tag<Refinement.Props> {}
namespace Refinement {
  export interface Props {
    alwaysShowTotal?: boolean;
    onClick?: () => void;
    or?: boolean;
    selected?: boolean;
    total?: number;
    value?: string;
    range?: boolean;
    low?: number;
    high?: number;
  }

  export interface State {
    total: number;
    showTotal: boolean;
    label: string;
  }

  export interface IndexedClickEvent extends Event, Tag.Event {
    item: { i: number };
  }
}

export default Refinement;
