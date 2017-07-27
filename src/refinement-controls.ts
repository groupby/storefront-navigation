import { Events, Selectors, Store, Tag } from '@storefront/core';

abstract class RefinementControls<P extends RefinementControls.Props, S extends RefinementControls.State> {

  field: string;

  init() {
    this.updateField(this.props.field);
    this.updateNavigation();
  }

  onUpdate() {
    this.updateField(this.props.field);
    this.state = { ...<any>this.state, ...<any>this.selectNavigation() };
  }

  updateField(field: string) {
    this.flux.off(`${Events.SELECTED_REFINEMENTS_UPDATED}:${this.field}`, this.updateNavigation);
    this.root.classList.remove(`gb-navigation-${this.field}`);
    this.field = field;
    this.root.classList.add(`gb-navigation-${field}`);
    this.flux.on(`${Events.SELECTED_REFINEMENTS_UPDATED}:${field}`, this.updateNavigation);
  }

  updateNavigation = () => this.set(this.selectNavigation());

  selectNavigation(): S {
    const navigation = Selectors.navigation(this.flux.store.getState(), this.field);
    return <any>{
      ...navigation,
      refinements: navigation.refinements.map((value, index) => ({
        ...value,
        selected: navigation.selected.includes(index)
      }))
    };
  }

}

// tslint:disable-next-line max-line-length
interface RefinementControls<P extends RefinementControls.Props = RefinementControls.Props, S extends RefinementControls.State = RefinementControls.State> extends Tag<P, S> { }
namespace RefinementControls {
  export interface Props extends Tag.Props {
    field?: string;
  }

  export interface State extends Partial<Store.Navigation> {
    refinements?: SelectedRefinement[];
  }

  export type SelectedRefinement = Store.Refinement & { selected: boolean };
}

export default RefinementControls;
