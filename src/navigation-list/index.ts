import { alias, tag, Selectors, Tag } from '@storefront/core';

@alias('navigationList')
@tag('gb-navigation-list', require('./index.html'))
class NavigationList {

  props: NavigationList.Props = {
    display: {},
    fields: [],
    labels: {}
  };
  state: NavigationList.State = {
    display: {},
    fields: [],
    labels: {}
  };

  init() {
    this.updateState();
  }

  onUpdate() {
    this.updateState();
  }

  updateState() {
    const defaultLabels = Selectors.navigations(this.flux.store.getState())
      .reduce((labelMap, { label, field }) => Object.assign(labelMap, { [field]: label }), {});
    this.state = <any>{
      ...this.state,
      ...this.props,
      labels: { ...defaultLabels, ...this.props.labels }
    };
  }
}

interface NavigationList extends Tag<NavigationList.Props> { }
namespace NavigationList {
  export interface Props extends Tag.Props, State { }

  export interface State {
    display?: { [key: string]: string };
    fields: string[];
    labels?: { [key: string]: string };
  }
}

export default NavigationList;
