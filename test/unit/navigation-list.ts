import { Selectors } from '@storefront/core';
import NavigationList from '../../src/navigation-list';
import suite from './_suite';

suite('NavigationList', ({ expect, spy, stub, itShouldHaveAlias }) => {
  let navigationList: NavigationList;

  beforeEach(() => navigationList = new NavigationList());

  describe('constructor()', () => {
    describe('props', () => {
      it('should set initial values', () => {
        expect(navigationList.props).eql(<any>{ fields: [] });
      });
    });
  });

  describe('init()', () => {
    it('should call expose()', () => {
      const props = navigationList.props = <any>{ a: 'b' };
      const expose = navigationList.expose = spy();

      navigationList.init();

      expect(expose).to.be.calledWithExactly('navigationList', props);
    });
  });
});
