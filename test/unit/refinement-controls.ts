import { Events, Selectors } from '@storefront/core';
import RefinementControls from '../../src/refinement-controls';
import suite from './_suite';

class MockRefinementControls extends RefinementControls { }

suite('RefinementControls', ({ expect, spy, stub }) => {
  let refinementControls;

  beforeEach(() => refinementControls = new MockRefinementControls());

  describe('init()', () => {
    it('should call updateField()', () => {
      const field = 'brand';
      const updateField = refinementControls.updateField = spy();
      refinementControls.updateNavigation = () => null;
      refinementControls.flux = <any>{ on: () => null };
      refinementControls.props = <any>{ field };

      refinementControls.init();

      expect(updateField).to.be.calledWith(field);
    });
  });

  describe('onUpdate()', () => {
    it('should call updateField()', () => {
      const field = 'price';
      const updateField = refinementControls.updateField = spy();
      refinementControls.field = 'colour';
      refinementControls.updateAlias = () => null;
      refinementControls.selectNavigation = () => null;
      refinementControls.props = { field };

      refinementControls.onUpdate();

      expect(updateField).to.be.calledWith(field);
    });

    it('should update state', () => {
      const field = 'price';
      const selectNavigation = refinementControls.selectNavigation = spy(() => ({ c: 'd' }));
      refinementControls.field = 'colour';
      refinementControls.updateField = () => null;
      refinementControls.state = <any>{ a: 'b' };
      refinementControls.props = { field };

      refinementControls.onUpdate();

      expect(refinementControls.state).to.eql({ a: 'b', c: 'd' });
    });
  });

  describe('updateField()', () => {
    it('should remove old class', () => {
      const remove = spy();
      const field = refinementControls.field = 'price';
      refinementControls.flux = <any>{ on: () => null, off: () => null };
      refinementControls.root = <any>{ classList: { remove, add: () => null } };

      refinementControls.updateField(field);

      expect(remove).to.be.calledWith('gb-navigation-price');
    });

    it('should add new class', () => {
      const add = spy();
      const field = 'brand';
      refinementControls.flux = <any>{ on: () => null, off: () => null };
      refinementControls.field = 'price';
      refinementControls.root = <any>{ classList: { add, remove: () => null } };

      refinementControls.updateField(field);

      expect(add).to.be.calledWith('gb-navigation-brand');
      expect(refinementControls.field).to.eq(field);
    });

    it('should remove old listener', () => {
      const off = spy();
      const field = refinementControls.field = 'price';
      refinementControls.flux = <any>{ on: () => null, off };
      refinementControls.root = <any>{ classList: { add: () => null, remove: () => null } };

      refinementControls.updateField('brand');

      // tslint:disable-next-line max-line-length
      expect(off).to.be.calledWith(`${Events.SELECTED_REFINEMENTS_UPDATED}:${field}`, refinementControls.updateNavigation);
    });

    it('should listen for SELECTED_REFINEMENTS_UPDATED', () => {
      const on = spy();
      const field = 'brand';
      refinementControls.field = 'price';
      refinementControls.flux = <any>{ off: () => null, on };
      refinementControls.root = <any>{ classList: { add: () => null, remove: () => null } };

      refinementControls.updateField(field);

      // tslint:disable-next-line max-line-length
      expect(on).to.be.calledWith(`${Events.SELECTED_REFINEMENTS_UPDATED}:${field}`, refinementControls.updateNavigation);
    });
  });

  describe('updateNavigation()', () => {
    it('should set the state', () => {
      const extracted = { a: 'b' };
      const set = refinementControls.set = spy();
      const selectNavigation = refinementControls.selectNavigation = spy(() => extracted);

      refinementControls.updateNavigation();

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
      const state = { i: 'j' };
      const navigationSelector = stub(Selectors, 'navigation').returns(navigation);
      const field = refinementControls.field = 'brand';
      refinementControls.flux = <any>{ store: { getState: () => state } };

      const refinements = refinementControls.selectNavigation();

      expect(refinements).to.eql({
        refinements: [
          { a: 'b', selected: true },
          { c: 'd', selected: false },
          { e: 'f', selected: true },
        ],
        selected: [0, 2],
        g: 'h'
      });
      expect(navigationSelector).to.be.calledWithExactly(state, field);
    });
  });
});
