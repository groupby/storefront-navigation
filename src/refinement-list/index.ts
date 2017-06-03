import { tag, Store, Tag } from '@storefront/core';

@tag('gb-refinement-list', require('./index.html'))
class RefinementList {

  props: RefinementList.Props = {
    refinements: []
  };

  init() {
    this.expose('refinements', this.props.refinements);
  }
}

interface RefinementList extends Tag<RefinementList.Props> { }
namespace RefinementList {
  export interface Props {
    refinements: Refinement[];
  }

  export type Refinement = Store.Refinement & { selected: boolean };
}

export default RefinementList;
