import { view, Component, Store } from '@storefront/core';

@view('gb-refinement-list', require('./index.html'), [
  { name: 'refinements', default: [] }
])
class RefinementList extends Component {
  props: RefinementList.Props;
}

namespace RefinementList {
  export interface Props {
    refinements: Refinement[];
  }
  export type Refinement = Store.Refinement & { selected: boolean };
}

export default RefinementList;
