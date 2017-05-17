import { view, Component } from '@storefront/core';
import RefinementList from '../refinement-list';

@view('gb-refinement', require('./index.html'))
class Refinement extends Component {
  refinement: RefinementList.Refinement;

  constructor() {
    super();
    this.expose('refinement', this.refinement);
  }
}

export default Refinement;
