import { alias, tag, Events, ProductTransformer, Selectors, Store, Structure, Tag } from '@storefront/core';

@alias('refinementPill')
@tag('gb-refinement-pill', require('./index.html'))
class RefinementPill {
  props: RefinementPill.Props = <any>{};

  state: RefinementPill.State = <any>{ selected: false };

  init() {
    this.updateState();
  }
  onUpdate() {
    this.updateState();
  }

  updateState() {
    const refinement = this.props.refinement;

    this.state = {
      refinement,
      onClick: refinement.onClick,
      onClose: refinement.onClose,
      selected: !!refinement.selected,
    };
  }
}

interface RefinementPill extends Tag<RefinementPill.Props, RefinementPill.State> { }
namespace RefinementPill {
  export interface Props extends Tag.Props {
    refinement: PillsRefinement;
  }

  export interface State {
    refinement: PillsRefinement;
    selected?: any;
    onClick: Function;
    onClose: Function;
  }

  export type PillsRefinement = Store.Refinement & {
    onClick: Function,
    onClose?: Function,
    selected: boolean,
    value: string,
    display?: string,
  };
}

export default RefinementPill;
