import { Events } from '@storefront/core';
import NavigationDisplay from '../../src/navigation-display';
import suite from './_suite';

suite('NavigationDisplay', ({ expect, spy }) => {
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

      expect(updateNavigation.called).to.be.true;
    });

    it('should listen for SELECTED_REFINEMENTS_UPDATED', () => {
      const on = spy();
      navigationDisplay.updateNavigation = () => null;
      navigationDisplay.updateField = () => null;
      navigationDisplay.field = 'colour';
      navigationDisplay.flux = <any>{ on };
      navigationDisplay.props = <any>{};

      navigationDisplay.init();

      expect(on.calledWith(`${Events.SELECTED_REFINEMENTS_UPDATED}:colour`)).to.be.true;
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

    it('should not call updateField() if field is the same', () => {
      navigationDisplay.updateNavigation = () => expect.fail();
      navigationDisplay.props = { field: 'colour' };
      navigationDisplay.field = 'colour';

      navigationDisplay.onUpdate();
    });
  });

  describe('updateField()', () => {
    it('should remove old class', () => {
      const remove = spy();
      const field = navigationDisplay.field = 'price';
      navigationDisplay.root = <any>{ classList: { remove, add: () => null } };

      navigationDisplay.updateField(field);

      expect(remove).to.be.calledWith('gb-navigation-price');
    });

    it('should add new class', () => {
      const add = spy();
      const field = 'brand';
      navigationDisplay.field = 'price';
      navigationDisplay.root = <any>{ classList: { add, remove: () => null } };

      navigationDisplay.updateField(field);

      expect(add).to.be.calledWith('gb-navigation-brand');
      expect(navigationDisplay.field).to.eq(field);
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
});
