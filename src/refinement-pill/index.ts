import { alias, view, Events, ProductTransformer, Selectors, Store, Structure, Tag } from '@storefront/core';

view('gb-refinement-pill', require('./index.html'));
class RefinementPill {
  props: RefinementPill.Props = {
    refinement: undefined,
  };
}

interface RefinementPill extends Tag<RefinementPill.Props> { }
namespace RefinementPill {
  export interface Props extends Tag.Props {
    refinement: Store.Refinement & {
      onClick: Function,
      onClose?: Function,
      selected: boolean,
      value: string,
      display?: string,
    };
  }
}

export default RefinementPill;
