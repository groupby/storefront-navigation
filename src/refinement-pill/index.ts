import { alias, tag, Events, ProductTransformer, Selectors, Store, Structure, Tag } from '@storefront/core';

@alias('refinementPill')
@tag('gb-refinement-pill', require('./index.html'))
class RefinementPill {
  props: RefinementPill.Props = {
    refinement: undefined,
  };

  state: RefinementPill.State = {
    refinement: undefined,
    onClick: undefined,
    onClose: undefined,
    selected: false
  };

  init() {
    this.updateState();
  }
  onUpdate() {
    this.updateState();
    this.updateAlias('refinementPill', this.state);
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
    display?: string,
  };
}

export default RefinementPill;
