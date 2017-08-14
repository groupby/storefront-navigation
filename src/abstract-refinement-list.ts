import { Store, Tag } from '@storefront/core';

abstract class AbstractRefinementList {

  props: AbstractRefinementList.Props = {
    refinements: []
  };

  abstract get alias(): string;

  init() {
    this.expose('refinements', this.props.refinements);
  }

  onUpdate() {
    this.updateAlias('refinements', this.props.refinements);
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
