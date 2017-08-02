import { Events, Selectors, Store, Tag } from '@storefront/core';

abstract class RefinementControls<P extends RefinementControls.Props, S extends RefinementControls.State> {

  abstract get alias(): string;

  init() {
    this.updateState();
    this.expose(this.alias, this.state);
  }

  onUpdate() {
    this.updateState();
    this.updateAlias(this.alias, this.state);
  }

  updateState() {
    this.state = { ...<any>this.state, ...this.props.navigation };
  }
}

// tslint:disable-next-line max-line-length
interface RefinementControls<P extends RefinementControls.Props = RefinementControls.Props, S extends RefinementControls.State = RefinementControls.State> extends Tag<P, S> { }
namespace RefinementControls {
  export interface Props extends Tag.Props {
    navigation: SelectedNavigation;
  }

  export interface State extends SelectedNavigation { }

  export interface SelectedNavigation extends Partial<Store.Navigation> {
    refinements?: SelectedRefinement[];
  }

  export type SelectedRefinement = Store.Refinement & { selected: boolean };
}

export default RefinementControls;
