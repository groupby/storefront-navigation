import { provide, tag, Selectors, Store, Tag } from '@storefront/core';
import RefinementList from '../refinement-list';
import ValueRefinementControls from '../value-refinement-controls';

@provide('refinementDisplay')
@tag('gb-refinement', require('./index.html'))
class Refinement {
  props: Refinement.Props = {
    alwaysShowTotal: false,
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
      showTotal: this.getShowTotal(),
      label: this.getLabel(),
      orType: this.getOrType(),
      cancelDisplay: this.getCancelDisplay(),
    };
  }

  getTotal = () => (this.props.selected && !this.props.or ? this.select(Selectors.recordCount) : this.props.total);
  getShowTotal = () => this.getTotal() > 0 && (this.props.alwaysShowTotal || !this.props.selected);
  getLabel = () => (this.props.range ? this.props.low + ' - ' + this.props.high : this.props.value);
  getOrType = () => (this.props.or ? 'checkbox' : 'button');
  getCancelDisplay = () => !this.props.or && !!this.props.selected;

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
    orType: string;
    cancelDisplay: boolean;
  }

  export interface IndexedClickEvent extends Event, Tag.Event {
    item: { i: number };
  }
}

export default Refinement;
