import { tag, Store, Tag } from '@storefront/core';

abstract class AbstractRefinementList {

  props: AbstractRefinementList.Props = {
    refinements: []
  };

  abstract get alias(): string;

  init() {
    this.expose(this.alias, this.props.refinements);
  }

  onUpdate() {
    this.updateAlias(this.alias, this.props.refinements);
  }
}

interface AbstractRefinementList extends Tag<AbstractRefinementList.Props> { }
namespace AbstractRefinementList {
  export interface Props extends Tag.Props {
    refinements: Refinement[];
  }

  export type Refinement = Store.Refinement & { selected: boolean };
}

export default AbstractRefinementList;
