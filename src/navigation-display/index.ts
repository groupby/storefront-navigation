import { alias, tag, Tag } from '@storefront/core';

@alias('navigationDisplay')
@tag('gb-navigation-display', require('./index.html'))
class NavigationDisplay {

  state: NavigationDisplay.State = {
    isActive: true,
    toggleDisplay: () => console.log('click'),
  };

}

interface NavigationDisplay extends Tag<NavigationDisplay.Props, NavigationDisplay.State> { }
namespace NavigationDisplay {
  export interface Props extends Tag.Props {
    label: string;
  }

  export interface State {
    isActive: boolean;
    toggleDisplay(): void;
  }
}

export default NavigationDisplay;
