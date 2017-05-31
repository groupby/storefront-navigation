import { Events } from '@storefront/core';
import NavigationDisplay from '../../src/navigation-display';
import suite from './_suite';

suite('NavigationDisplay', ({ expect, spy }) => {
  let navigationDisplay: NavigationDisplay;

  beforeEach(() => navigationDisplay = new NavigationDisplay());

  describe('onBeforeMount()', () => {
    it('should add a unique class', () => {
      const add = spy();
      navigationDisplay.root = <any>{ classList: { add } };
      navigationDisplay.props = { field: 'brand' };
      navigationDisplay.flux = <any>{ on: () => null };
      navigationDisplay.updateNavigation = () => null;
      navigationDisplay.expose = () => null;

      navigationDisplay.onBeforeMount();

      expect(add.calledWith('gb-navigation-brand')).to.be.true;
    });

    it('should call updateNavigation()', () => {
      const updateNavigation = navigationDisplay.updateNavigation = spy();
      navigationDisplay.root = <any>{ classList: { add: () => null } };
      navigationDisplay.props = <any>{};
      navigationDisplay.flux = <any>{ on: () => null };
      navigationDisplay.expose = () => null;

      navigationDisplay.onBeforeMount();

      expect(updateNavigation.called).to.be.true;
    });

    it('should listen for SELECTED_REFINEMENTS_UPDATED', () => {
      const on = spy();
      navigationDisplay.updateNavigation = () => null;
      navigationDisplay.root = <any>{ classList: { add: () => null } };
      navigationDisplay.props = <any>{ field: 'colour' };
      navigationDisplay.flux = <any>{ on };
      navigationDisplay.expose = () => null;

      navigationDisplay.onBeforeMount();

      expect(on.calledWith(`${Events.SELECTED_REFINEMENTS_UPDATED}:colour`)).to.be.true;
    });

    it('should call expose()', () => {
      const expose = navigationDisplay.expose = spy();
      navigationDisplay.updateNavigation = () => null;
      navigationDisplay.root = <any>{ classList: { add: () => null } };
      navigationDisplay.flux = <any>{ on: () => null };
      navigationDisplay.props = <any>{};

      navigationDisplay.onBeforeMount();

      expect(expose.calledWith('navigationDisplay')).to.be.true;
    });
  });

  describe('onUpdate()', () => {
    it('should call updateNavigation()', () => {
      const updateNavigation = navigationDisplay.updateNavigation = spy();
      navigationDisplay.props = { field: 'colour' };

      navigationDisplay.onUpdate();

      expect(updateNavigation.called).to.be.true;
    });

    it('should not call updateNavigation() if field does not match', () => {
      navigationDisplay.updateNavigation = () => expect.fail();
      navigationDisplay.props = { field: 'colour' };
      navigationDisplay.field = 'colour';

      navigationDisplay.onUpdate();
    });
  });

  describe('updateNavigation()', () => {
    it('should update the state', () => {
      const state = { a: 'b' };
      const extractNavigation = navigationDisplay.extractNavigation = spy(() => ({ c: 'd' }));
      navigationDisplay.state = <any>{ e: 'f' };
      navigationDisplay.flux = <any>{ store: { getState: () => state } };
      navigationDisplay.props = <any>{ field: 'brand' };

      navigationDisplay.updateNavigation();

      expect(navigationDisplay.state).to.eql({ c: 'd', e: 'f' });
      expect(extractNavigation.calledWith(state, 'brand'));
    });

    it('should update field', () => {
      const field = 'brand';
      navigationDisplay.field = 'colour';
      navigationDisplay.extractNavigation = () => null;
      navigationDisplay.state = <any>{ e: 'f' };
      navigationDisplay.flux = <any>{ store: { getState: () => null } };
      navigationDisplay.props = <any>{ field };

      navigationDisplay.updateNavigation();

      expect(navigationDisplay.field).to.eq(field);
    });
  });

  describe('extractNavigation()', () => {
    it('should extract refinements and mark them as selected', () => {
      const navigation = {
        refinements: [{ a: 'b' }, { c: 'd' }, { e: 'f' }],
        selected: [0, 2],
        g: 'h'
      };
      const state: any = { data: { navigations: { byId: { brand: navigation } } } };

      const refinements = navigationDisplay.extractNavigation(state, 'brand');

      expect(refinements).to.eql({
        refinements: [
          { a: 'b', selected: true },
          { c: 'd', selected: false },
          { e: 'f', selected: true },
        ],
        selected: [0, 2],
        g: 'h'
      });
    });
  });
});
