import { Selectors } from '@storefront/core';
import RefinementControls from '../../src/refinement-controls';
import AbstractValueRefinementControls from '../../src/abstract-value-refinement-controls';
import suite from './_suite';

const MOCK_ALIAS = 'MockAlias';

class MockAbstractValueRefinementControls extends AbstractValueRefinementControls {
  get alias() {
    return MOCK_ALIAS;
  }
}

suite('AbstractValueRefinementControls', ({ expect, spy, stub }) => {
  let mockAbstractValueRefinementControls: AbstractValueRefinementControls;

  beforeEach(() => mockAbstractValueRefinementControls = new MockAbstractValueRefinementControls());

  describe('constructor()', () => {
    it('should extend RefinementControls', () => {
      expect(mockAbstractValueRefinementControls).to.be.an.instanceof(RefinementControls);
    });

    describe('state', () => {
      describe('onClick()', () => {
        it('should call actions.deselectRefinement() if selected', () => {
          const index = 8;
          const deselectRefinement = spy();
          const isSelected = mockAbstractValueRefinementControls.isSelected = spy(() => true);
          const field = mockAbstractValueRefinementControls.field = 'myfield';
          mockAbstractValueRefinementControls.actions = <any>{ deselectRefinement };

          mockAbstractValueRefinementControls.state.onClick(index);

          expect(isSelected).to.be.calledWith(index);
          expect(deselectRefinement).to.be.calledWith(field, index);
        });

        it('should call actions.selectRefinement() if not selected', () => {
          const index = 8;
          const selectRefinement = spy();
          const field = mockAbstractValueRefinementControls.field = 'myfield';
          mockAbstractValueRefinementControls.isSelected = spy(() => false);
          mockAbstractValueRefinementControls.actions = <any>{ selectRefinement };

          mockAbstractValueRefinementControls.state.onClick(index);

          expect(selectRefinement).to.be.calledWith(field, index);
        });
      });

      describe('moreRefinements()', () => {
        it('should call actions.fetchMoreRefinements()', () => {
          const fetchMoreRefinements = spy();
          const field = mockAbstractValueRefinementControls.field = 'myfield';
          mockAbstractValueRefinementControls.actions = <any>{ fetchMoreRefinements };

          mockAbstractValueRefinementControls.state.moreRefinements();

          expect(fetchMoreRefinements).to.be.calledWith(field);
        });
      });
    });
  });

  describe('onUpdate()', () => {
    it('should call super onUpdate()', () => {
      const onUpdate = stub(RefinementControls.prototype, 'onUpdate');
      mockAbstractValueRefinementControls.updateAlias = () => null;

      mockAbstractValueRefinementControls.onUpdate();

      expect(onUpdate).to.be.calledOnce;
    });

    it('should call updateAlias()', () => {
      const updateAlias = mockAbstractValueRefinementControls.updateAlias = spy();
      stub(RefinementControls.prototype, 'onUpdate');

      mockAbstractValueRefinementControls.onUpdate();

      expect(updateAlias).to.be.calledWith(MOCK_ALIAS, mockAbstractValueRefinementControls.state);
    });
  });

  describe('isSelected()', () => {
    it('should check if refinement is selected', () => {
      const index = 99;
      const state = { a: 'b' };
      const field = mockAbstractValueRefinementControls.field = 'colour';
      const isRefinementSelected = stub(Selectors, 'isRefinementSelected').returns(true);
      mockAbstractValueRefinementControls.flux = <any>{ store: { getState: () => state } };

      const selected = mockAbstractValueRefinementControls.isSelected(index);

      expect(selected).to.be.true;
      expect(isRefinementSelected).to.be.calledWith(state, field, index);
    });
  });
});
