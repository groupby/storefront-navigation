import { alias, tag, Events, ProductTransformer, Selectors, Store, Structure, Tag } from '@storefront/core';

@alias('refinementPill')
@tag('gb-refinement-pill', require('./index.html'))
class RefinementPill {
  props: RefinementPill.Props = {
    refinement: undefined,
  };
}

interface RefinementPill extends Tag<RefinementPill.Props> { }
namespace RefinementPill {
  export interface Props extends Tag.Props {
    refinement: PillsRefinement;
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
