import { Events, Selectors } from '@storefront/core';
import RefinementControls from '../../src/refinement-controls';
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

  describe('onUpdate()', () => {
    let superOnUpdate;
    beforeEach(() => superOnUpdate = RefinementControls.prototype.onUpdate);
    afterEach(() => RefinementControls.prototype.onUpdate = superOnUpdate);

    it('should call super onUpdate()', () => {
      const onUpdate = spy();
      const superInstance = { onUpdate };
      RefinementControls.prototype.onUpdate = onUpdate;
      valueRefinementControls.updateAlias = () => null;

      valueRefinementControls.onUpdate();

      expect(onUpdate).to.be.calledOnce;
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
