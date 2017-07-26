import { Events, Selectors } from '@storefront/core';
import ValueRefinementControls from '../../src/value-refinement-controls';
import suite from './_suite';

suite('ValueRefinementControls', ({ expect, spy, stub }) => {
  let valueRefinementControls: ValueRefinementControls;

  beforeEach(() => valueRefinementControls = new ValueRefinementControls());

  describe('constructor()', () => {
    describe('state', () => {
      describe('onClick()', () => {
        it('should call actions.deselectRefinement() if selected', () => {
          const index = 8;
          const deselectRefinement = spy();
          const isSelected = valueRefinementControls.isSelected = spy(() => true);
          const field = valueRefinementControls.field = 'myfield';
          valueRefinementControls.actions = <any>{ deselectRefinement };

          valueRefinementControls.state.onClick(index);

          expect(isSelected).to.be.calledWith(index);
          expect(deselectRefinement).to.be.calledWith(field, index);
        });

        it('should call actions.selectRefinement() if not selected', () => {
          const index = 8;
          const selectRefinement = spy();
          const field = valueRefinementControls.field = 'myfield';
          valueRefinementControls.isSelected = spy(() => false);
          valueRefinementControls.actions = <any>{ selectRefinement };

          valueRefinementControls.state.onClick(index);

          expect(selectRefinement).to.be.calledWith(field, index);
        });
      });

      describe('moreRefinements()', () => {
        it('should call actions.fetchMoreRefinements()', () => {
          const fetchMoreRefinements = spy();
          const field = valueRefinementControls.field = 'myfield';
          valueRefinementControls.actions = <any>{ fetchMoreRefinements };

          valueRefinementControls.state.moreRefinements();

          expect(fetchMoreRefinements).to.be.calledWith(field);
        });
      });
    });
  });

  describe('init()', () => {
    it('should call updateField()', () => {
      const field = 'brand';
      const updateField = valueRefinementControls.updateField = spy();
      valueRefinementControls.updateNavigation = () => null;
      valueRefinementControls.flux = <any>{ on: () => null };
      valueRefinementControls.props = <any>{ field };

      valueRefinementControls.init();

      expect(updateField).to.be.calledWith(field);
    });

    it('should call updateNavigation()', () => {
      const updateNavigation = valueRefinementControls.updateNavigation = spy();
      valueRefinementControls.updateField = () => null;
      valueRefinementControls.props = <any>{};
      valueRefinementControls.flux = <any>{ on: () => null };

      valueRefinementControls.init();

      expect(updateNavigation).to.be.called;
    });
  });

  describe('onUpdate()', () => {
    it('should call updateField()', () => {
      const field = 'price';
      const updateField = valueRefinementControls.updateField = spy();
      valueRefinementControls.field = 'colour';
      valueRefinementControls.updateAlias = () => null;
      valueRefinementControls.selectNavigation = () => null;
      valueRefinementControls.props = { field };

      valueRefinementControls.onUpdate();

      expect(updateField).to.be.calledWith(field);
    });

    it('should call updateAlias()', () => {
      const field = 'price';
      const selectNavigation = valueRefinementControls.selectNavigation = spy(() => ({ c: 'd' }));
      const updateAlias = valueRefinementControls.updateAlias = spy();
      valueRefinementControls.field = 'colour';
      valueRefinementControls.updateField = () => null;
      valueRefinementControls.state = <any>{ a: 'b' };
      valueRefinementControls.props = { field };

      valueRefinementControls.onUpdate();

      expect(updateAlias).to.be.calledWith('valueControls', { a: 'b', c: 'd' });
      expect(valueRefinementControls.state).to.eql({ a: 'b', c: 'd' });
    });
  });

  describe('updateField()', () => {
    it('should remove old class', () => {
      const remove = spy();
      const field = valueRefinementControls.field = 'price';
      valueRefinementControls.flux = <any>{ on: () => null, off: () => null };
      valueRefinementControls.root = <any>{ classList: { remove, add: () => null } };

      valueRefinementControls.updateField(field);

      expect(remove).to.be.calledWith('gb-navigation-price');
    });

    it('should add new class', () => {
      const add = spy();
      const field = 'brand';
      valueRefinementControls.flux = <any>{ on: () => null, off: () => null };
      valueRefinementControls.field = 'price';
      valueRefinementControls.root = <any>{ classList: { add, remove: () => null } };

      valueRefinementControls.updateField(field);

      expect(add).to.be.calledWith('gb-navigation-brand');
      expect(valueRefinementControls.field).to.eq(field);
    });

    it('should remove old listener', () => {
      const off = spy();
      const field = valueRefinementControls.field = 'price';
      valueRefinementControls.flux = <any>{ on: () => null, off };
      valueRefinementControls.root = <any>{ classList: { add: () => null, remove: () => null } };

      valueRefinementControls.updateField('brand');

      // tslint:disable-next-line max-line-length
      expect(off).to.be.calledWith(`${Events.SELECTED_REFINEMENTS_UPDATED}:${field}`, valueRefinementControls.updateNavigation);
    });

    it('should listen for SELECTED_REFINEMENTS_UPDATED', () => {
      const on = spy();
      const field = 'brand';
      valueRefinementControls.field = 'price';
      valueRefinementControls.flux = <any>{ off: () => null, on };
      valueRefinementControls.root = <any>{ classList: { add: () => null, remove: () => null } };

      valueRefinementControls.updateField(field);

      // tslint:disable-next-line max-line-length
      expect(on).to.be.calledWith(`${Events.SELECTED_REFINEMENTS_UPDATED}:${field}`, valueRefinementControls.updateNavigation);
    });
  });

  describe('updateNavigation()', () => {
    it('should set the state', () => {
      const extracted = { a: 'b' };
      const set = valueRefinementControls.set = spy();
      const selectNavigation = valueRefinementControls.selectNavigation = spy(() => extracted);

      valueRefinementControls.updateNavigation();

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
      const field = valueRefinementControls.field = 'brand';
      valueRefinementControls.flux = <any>{ store: { getState: () => state } };

      const refinements = valueRefinementControls.selectNavigation();

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

  describe('isSelected()', () => {
    it('should check if refinement is selected', () => {
      const index = 99;
      const state = { a: 'b' };
      const field = valueRefinementControls.field = 'colour';
      const isRefinementSelected = stub(Selectors, 'isRefinementSelected').returns(true);
      valueRefinementControls.flux = <any>{ store: { getState: () => state } };

      const selected = valueRefinementControls.isSelected(index);

      expect(selected).to.be.true;
      expect(isRefinementSelected).to.be.calledWith(state, field, index);
    });
  });
});
