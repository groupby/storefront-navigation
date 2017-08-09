import { Events, Selectors } from '@storefront/core';
import NavigationDisplay from '../../src/navigation-display';
import suite from './_suite';

suite('NavigationDisplay', ({ expect, spy, stub, itShouldHaveAlias }) => {
  let navigationDisplay: NavigationDisplay;

  beforeEach(() => navigationDisplay = new NavigationDisplay());

  itShouldHaveAlias(NavigationDisplay, 'navigationDisplay');

  describe('constructor()', () => {
    describe('props', () => {
      it('should set initial value', () => {
        expect(navigationDisplay.props).to.eql({
          icons: {
            toggleClosed: '/img/maximize.svg',
            toggleOpen: '/img/minimize.svg',
          }
        });
      });
    });

    describe('state', () => {
      it('should set initial value', () => {
        expect(navigationDisplay.state.isActive).to.be.true;
      });
    });
  });

  describe('init()', () => {
    it('should call updateField()', () => {
      const field = 'brand';
      const updateField = navigationDisplay.updateField = spy();
      navigationDisplay.props = <any>{ field };

      navigationDisplay.init();

      expect(updateField).to.be.calledWith(field);
    });
  });

  describe('onUpdate()', () => {
    it('should call updateField()', () => {
      const field = 'brand';
      const updateField = navigationDisplay.updateField = spy();
      navigationDisplay.props = <any>{ field };

      navigationDisplay.onUpdate();

      expect(updateField).to.be.calledWith(field);
    });
  });

  describe('updateField()', () => {
    it('should remove old class', () => {
      const remove = spy();
      const oldField = 'price';
      navigationDisplay.selectNavigation = () => ({});
      navigationDisplay.state = <any>{ value: 'price' };
      navigationDisplay.flux = <any>{ on: () => null, off: () => null };
      navigationDisplay.root = <any>{ classList: { remove, add: () => null } };

      navigationDisplay.updateField(<any>{});

      expect(remove).to.be.calledWith('gb-navigation-price');
    });

    it('should add new class', () => {
      const add = spy();
      navigationDisplay.selectNavigation = () => ({});
      navigationDisplay.flux = <any>{ on: () => null, off: () => null };
      navigationDisplay.root = <any>{ classList: { add, remove: () => null } };

      navigationDisplay.updateField(<any>{ value: 'brand' });

      expect(add).to.be.calledWith('gb-navigation-brand');
    });

    it('should override label', () => {
      const field: any = { value: 'brand', label: 'Brand2' };
      const navigation: any = { c: 'd', label: 'Brand' };
      navigationDisplay.selectNavigation = () => navigation;
      navigationDisplay.state = <any>{ a: 'b' };
      navigationDisplay.flux = <any>{ on: () => null, off: () => null };
      navigationDisplay.root = <any>{ classList: { add: () => null, remove: () => null } };

      navigationDisplay.updateField(field);

      expect(navigationDisplay.state.label).to.eq('Brand2');
    });

    it('should fallback to field name', () => {
      const field: any = { value: 'brand' };
      const navigation: any = { c: 'd' };
      navigationDisplay.selectNavigation = () => navigation;
      navigationDisplay.state = <any>{ a: 'b' };
      navigationDisplay.flux = <any>{ on: () => null, off: () => null };
      navigationDisplay.root = <any>{ classList: { add: () => null, remove: () => null } };

      navigationDisplay.updateField(field);

      expect(navigationDisplay.state.label).to.eq('brand');
    });

    it('should update the state', () => {
      const field: any = { value: 'brand' };
      const navigation: any = { c: 'd', label: 'Brand' };
      navigationDisplay.selectNavigation = () => navigation;
      navigationDisplay.state = <any>{ a: 'b' };
      navigationDisplay.flux = <any>{ on: () => null, off: () => null };
      navigationDisplay.root = <any>{ classList: { add: () => null, remove: () => null } };

      navigationDisplay.updateField(field);

      expect(navigationDisplay.state).to.eql({ a: 'b', value: 'brand', label: 'Brand', navigation });
    });

    it('should remove old listener', () => {
      const off = spy();
      const field = 'price';
      navigationDisplay.selectNavigation = () => ({});
      navigationDisplay.state = <any>{ value: field };
      navigationDisplay.flux = <any>{ on: () => null, off };
      navigationDisplay.root = <any>{ classList: { add: () => null, remove: () => null } };

      navigationDisplay.updateField(<any>{ value: 'brand' });

      // tslint:disable-next-line max-line-length
      expect(off).to.be.calledWith(`${Events.SELECTED_REFINEMENTS_UPDATED}:${field}`, navigationDisplay.updateNavigation);
    });

    it('should listen for SELECTED_REFINEMENTS_UPDATED', () => {
      const on = spy();
      const field = 'brand';
      navigationDisplay.selectNavigation = () => ({});
      navigationDisplay.state = <any>{ value: 'price' };
      navigationDisplay.flux = <any>{ off: () => null, on };
      navigationDisplay.root = <any>{ classList: { add: () => null, remove: () => null } };

      navigationDisplay.updateField(<any>{ value: field });

      // tslint:disable-next-line max-line-length
      expect(on).to.be.calledWith(`${Events.SELECTED_REFINEMENTS_UPDATED}:${field}`, navigationDisplay.updateNavigation);
    });
  });

  describe('selectNavigation()', () => {
    it('should extract refinements and mark them as selected', () => {
      const navigation = {
        refinements: [{ a: 'b' }, { c: 'd' }, { e: 'f' }],
        selected: [0, 2],
        or: false,
        range: true,
        g: 'h'
      };
      const state = { i: 'j' };
      const field = 'brand';
      const navigationSelector = stub(Selectors, 'navigation').returns(navigation);
      navigationDisplay.flux = <any>{ store: { getState: () => state } };

      const refinements = navigationDisplay.selectNavigation(field);

      expect(refinements).to.eql({
        refinements: [
          { a: 'b', index: 0, selected: true, or: false, range: true },
          { c: 'd', index: 1, selected: false, or: false, range: true },
          { e: 'f', index: 2, selected: true, or: false, range: true },
        ],
        selected: [0, 2],
        or: false,
        range: true,
        g: 'h'
      });
      expect(navigationSelector).to.be.calledWithExactly(state, field);
    });
  });

  describe('updateNavigation()', () => {
    it('should set navigation', () => {
      const extracted = { a: 'b' };
      const field = 'brand';
      const set = navigationDisplay.set = spy();
      const selectNavigation = navigationDisplay.selectNavigation = spy(() => extracted);
      navigationDisplay.state = <any>{ value: field };

      navigationDisplay.updateNavigation();

      expect(selectNavigation).to.be.calledWith(field);
      expect(set).to.be.calledWith({ navigation: extracted });
    });
  });

  describe('onToggle()', () => {
    it('should set isActive true', () => {
      const set = navigationDisplay.set = spy();
      navigationDisplay.state = <any>{ isActive: false };

      navigationDisplay.onToggle();

      expect(set).to.be.calledWith({ isActive: true });
    });

    it('should set isActive false', () => {
      const set = navigationDisplay.set = spy();
      navigationDisplay.state = <any>{ isActive: true };

      navigationDisplay.onToggle();

      expect(set).to.be.calledWith({ isActive: false });
    });
  });
});
