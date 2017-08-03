import { Selectors } from '@storefront/core';
import NavigationList from '../../src/navigation-list';
import suite from './_suite';

suite('NavigationList', ({ expect, spy, stub, itShouldHaveAlias }) => {
  let navigationList: NavigationList;

  beforeEach(() => navigationList = new NavigationList());

  describe('constructor()', () => {
    describe('props', () => {
      it('should set initial values', () => {
        expect(navigationList.props).eql(<any>{ fields: []});
      });
    });
  });
});
