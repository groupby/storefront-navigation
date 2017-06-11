import { Events, Selectors } from '@storefront/core';
import NavigationDisplay from '../../src/navigation-display';
import suite from './_suite';

suite('NavigationDisplay', ({ expect, spy, stub }) => {
  let navigationDisplay: NavigationDisplay;

  beforeEach(() => navigationDisplay = new NavigationDisplay());

  describe('init()', () => {
    it('should call updateField()', () => {
      const field = 'brand';
      const updateField = navigationDisplay.updateField = spy();
      navigationDisplay.updateNavigation = () => null;
      navigationDisplay.flux = <any>{ on: () => null };
      navigationDisplay.props = <any>{ field };

      navigationDisplay.init();

      expect(updateField).to.be.calledWith(field);
    });

    it('should call updateNavigation()', () => {
      const updateNavigation = navigationDisplay.updateNavigation = spy();
      navigationDisplay.updateField = () => null;
      navigationDisplay.props = <any>{};
      navigationDisplay.flux = <any>{ on: () => null };

      navigationDisplay.init();

      expect(updateNavigation).to.be.called;
    });
  });

  describe('onUpdate()', () => {
    it('should call updateField()', () => {
      const field = 'price';
      const updateField = navigationDisplay.updateField = spy();
      navigationDisplay.field = 'colour';
      navigationDisplay.updateAlias = () => null;
      navigationDisplay.selectNavigation = () => null;
      navigationDisplay.props = { field };

      navigationDisplay.onUpdate();

      expect(updateField).to.be.calledWith(field);
    });

    it('should call updateAlias()', () => {
      const field = 'price';
      const selectNavigation = navigationDisplay.selectNavigation = spy(() => ({ c: 'd' }));
      const updateAlias = navigationDisplay.updateAlias = spy();
      navigationDisplay.field = 'colour';
      navigationDisplay.updateField = () => null;
      navigationDisplay.state = <any>{ a: 'b' };
      navigationDisplay.props = { field };

      navigationDisplay.onUpdate();

      expect(updateAlias).to.be.calledWith('navigationDisplay', { a: 'b', c: 'd' });
      expect(navigationDisplay.state).to.eql({ a: 'b', c: 'd' });
    });
  });

  describe('updateField()', () => {
    it('should remove old class', () => {
      const remove = spy();
      const field = navigationDisplay.field = 'price';
      navigationDisplay.flux = <any>{ on: () => null, off: () => null };
      navigationDisplay.root = <any>{ classList: { remove, add: () => null } };

      navigationDisplay.updateField(field);

      expect(remove).to.be.calledWith('gb-navigation-price');
    });

    it('should add new class', () => {
      const add = spy();
      const field = 'brand';
      navigationDisplay.flux = <any>{ on: () => null, off: () => null };
      navigationDisplay.field = 'price';
      navigationDisplay.root = <any>{ classList: { add, remove: () => null } };

      navigationDisplay.updateField(field);

      expect(add).to.be.calledWith('gb-navigation-brand');
      expect(navigationDisplay.field).to.eq(field);
    });

    it('should remove old listener', () => {
      const off = spy();
      const field = navigationDisplay.field = 'price';
      navigationDisplay.flux = <any>{ on: () => null, off };
      navigationDisplay.root = <any>{ classList: { add: () => null, remove: () => null } };

      navigationDisplay.updateField('brand');

      // tslint:disable-next-line max-line-length
      expect(off).to.be.calledWith(`${Events.SELECTED_REFINEMENTS_UPDATED}:${field}`, navigationDisplay.updateNavigation);
    });

    it('should listen for SELECTED_REFINEMENTS_UPDATED', () => {
      const on = spy();
      const field = 'brand';
      navigationDisplay.field = 'price';
      navigationDisplay.flux = <any>{ off: () => null, on };
      navigationDisplay.root = <any>{ classList: { add: () => null, remove: () => null } };

      navigationDisplay.updateField(field);

      // tslint:disable-next-line max-line-length
      expect(on).to.be.calledWith(`${Events.SELECTED_REFINEMENTS_UPDATED}:${field}`, navigationDisplay.updateNavigation);
    });
  });

  describe('updateNavigation()', () => {
    it('should set the state', () => {
      const extracted = { a: 'b' };
      const set = navigationDisplay.set = spy();
      const selectNavigation = navigationDisplay.selectNavigation = spy(() => extracted);

      navigationDisplay.updateNavigation();

      expect(selectNavigation).to.be.called;
      expect(set).to.be.calledWith(extracted);
    });
  });

  describe('selectNavigation()', () => {
    it('should extract refinements and mark them as selected', () => {
      const navigation = {
        refinements: [{ a: 'b' }, { c: 'd' }, { e: 'f' }],
        selected: [0, 2],
        g: 'h'
      };
      navigationDisplay.field = 'brand';
      navigationDisplay.flux = <any>{
        store: {
          getState: () => ({ data: { navigations: { byId: { brand: navigation } } } })
        }
      };

      const refinements = navigationDisplay.selectNavigation();

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

  describe('isSelected()', () => {
    it('should check if refinement is selected', () => {
      const index = 99;
      const state = { a: 'b' };
      const field = navigationDisplay.field = 'colour';
      const isRefinementSelected = stub(Selectors, 'isRefinementSelected').returns(true);
      navigationDisplay.flux = <any>{ store: { getState: () => state } };

      const selected = navigationDisplay.isSelected(index);

      expect(selected).to.be.true;
      expect(isRefinementSelected).to.be.calledWith(state, field, index);
    });
  });
});
