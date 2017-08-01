import { Selectors } from '@storefront/core';
import RefinementControls from '../../src/refinement-controls';
import ValueRefinementControls from '../../src/value-refinement-controls';
import suite from './_suite';

suite('ValueRefinementControls', ({ expect, spy, stub, itShouldHaveAlias }) => {
  let valueRefinementControls: ValueRefinementControls;

  itShouldHaveAlias(ValueRefinementControls, 'valueControls');

  beforeEach(() => valueRefinementControls = new ValueRefinementControls());

  describe('constructor()', () => {
    it('should extend RefinementControls', () => {
      expect(valueRefinementControls).to.be.an.instanceof(RefinementControls);
    });

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
    it('should call super onUpdate()', () => {
      const onUpdate = stub(RefinementControls.prototype, 'onUpdate');
      valueRefinementControls.updateAlias = () => null;

      valueRefinementControls.onUpdate();

      expect(onUpdate).to.be.calledOnce;
    });

    it('should call updateAlias()', () => {
      const updateAlias = valueRefinementControls.updateAlias = spy();
      stub(RefinementControls.prototype, 'onUpdate');

      valueRefinementControls.onUpdate();

      expect(updateAlias).to.be.calledWith('valueControls', valueRefinementControls.state);
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
