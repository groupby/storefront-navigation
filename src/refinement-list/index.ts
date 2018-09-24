import { tag, Store, Tag } from '@storefront/core';
const RETURN_KEY_CODE = 13;

@tag('gb-refinement-list', require('./index.html'))
class RefinementList {
  props: RefinementList.Props = {
    refinements: [],
    itemProps: {},
  };

  state={
    filteredRefinements : []
  }


  handleChange(e){
    const { target } = e;
    this.set({
      filteredRefinements : this.props.refinements.filter((refinement) => refinement.value.toLowerCase().includes(target.value.toLowerCase()))
    })
  }

  handleSelect(e){
    const { keyCode, target } = e;
    if(keyCode === RETURN_KEY_CODE) {
      const foundItem = this.state.filteredRefinements.find(
        (filteredRefinement) => filteredRefinement.value.toLowerCase() === target.value.toLowerCase());

      if(foundItem && foundItem.onClick) {
        foundItem.onClick();
      }
    }
  }


  get alias() {
    return 'refinements';
  }

  init() {
    this.provide(this.alias, ({ refinements }) => refinements);
    this.state={
      filteredRefinements : this.props.refinements
    }
  }
}

interface RefinementList extends Tag<RefinementList.Props> {}
namespace RefinementList {
  export interface Props {
    refinements: Refinement[];
    itemProps?: object;
  }

  export type Refinement = Store.Refinement & { selected: boolean, value: string };
}

export default RefinementList;
