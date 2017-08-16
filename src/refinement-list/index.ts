import { tag, Store, Tag } from '@storefront/core';

@tag('gb-refinement-list', require('./index.html'))
class RefinementList {

  props: RefinementList.Props = {
    refinements: []
  };

  get alias() {
    return 'refinements';
  }

  init() {
    this.expose(this.alias, this.props.refinements);
  }

  onUpdate() {
    this.updateAlias(this.alias, this.props.refinements);
  }
}

interface RefinementList extends Tag<RefinementList.Props> { }
namespace RefinementList {
  export interface Props extends Tag.Props {
    refinements: Refinement[];
  }

  export type Refinement = Store.Refinement & { selected: boolean };
}

export default RefinementList;
