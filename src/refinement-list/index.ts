import { tag, Store, Tag } from '@storefront/core';

@tag('gb-refinement-list', require('./index.html'))
class RefinementList {
  props: RefinementList.Props = {
    refinements: [],
  };

  get alias() {
    return 'refinements';
  }

  init() {
    this.provide(this.alias, ({ refinements }) => refinements);
  }
}

interface RefinementList extends Tag<RefinementList.Props> {}
namespace RefinementList {
  export interface Props extends Tag.Props {
    refinements: Refinement[];
  }

  export type Refinement = Store.Refinement & { selected: boolean };
}

export default RefinementList;
