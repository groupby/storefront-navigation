import { alias, tag, Selectors, Tag } from '@storefront/core';
import NavigationDisplay from '../navigation-display';

@alias('navigationList')
@tag('gb-navigation-list', require('./index.html'))
class NavigationList {

  props: NavigationList.Props = {
    display: {},
    fields: [],
    labels: {}
  };
  state: NavigationList.State = {
    fields: [],
  };

  init() {
    this.updateState();
  }

  onUpdate() {
    this.updateState();
  }

  updateState() {
    this.state = <any>{
      ...this.state,
      fields: this.props.fields.map((value) => ({
        value,
        label: this.props.labels[value],
        display: this.props.display[value],
      }))
    };
  }
}

interface NavigationList extends Tag<NavigationList.Props> { }
namespace NavigationList {
  export interface Props extends Tag.Props {
    display: DisplayMap;
    fields: string[];
    labels: { [key: string]: string };
  }

  export interface State {
    fields: NavigationDisplay.Field[];
  }

  export interface DisplayMap {
    [key: string]: NavigationDisplay.Display;
  }
}

export default NavigationList;
