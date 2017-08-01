import { Selectors } from '@storefront/core';
import NavigationList from '../../src/navigation-list';
import suite from './_suite';

suite('NavigationList', ({ expect, spy, stub, itShouldHaveAlias }) => {
  let navigationList: NavigationList;

  beforeEach(() => navigationList = new NavigationList());

  itShouldHaveAlias(NavigationList, 'navigationList');

  describe('constructor()', () => {
    describe('props', () => {
      it('should set initial values', () => {
        expect(navigationList.props).eql(<any>{ display: {}, fields: [], labels: {} });
      });
    });

    describe('state', () => {
      it('should set initial values', () => {
        expect(navigationList.state).eql(<any>{ display: {}, fields: [], labels: {} });
      });
    });
  });

  describe('init()', () => {
    it('should call updateState()', () => {
      const updateState = navigationList.updateState = spy();

      navigationList.init();

      expect(updateState).to.be.called;
    });
  });

  describe('onUpdate()', () => {
    it('should call updateState()', () => {
      const updateState = navigationList.updateState = spy();

      navigationList.onUpdate();

      expect(updateState).to.be.called;
    });
  });

  describe('updateState()', () => {
    it('should update state with label overrides and defaults', () => {
      const state = { a: 'b' };
      const navigations = [{ field: 'c', label: 'C' }, { field: 'd', label: 'D' }, { field: 'e', label: 'E' }];
      const navigationsSelector = stub(Selectors, 'navigations').returns(navigations);
      navigationList.flux = <any>{ store: { getState: () => state } };
      navigationList.state = <any>{ f: 'g' };
      navigationList.props = <any>{ labels: { d: 'D2' }, h: 'i' };

      navigationList.updateState();

      expect(navigationList.state).to.eql({
        f: 'g',
        h: 'i',
        labels: { c: 'C', d: 'D2', e: 'E' }
      });
    });
  });
});
