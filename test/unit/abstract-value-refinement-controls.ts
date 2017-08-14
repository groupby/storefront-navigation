import { Selectors } from '@storefront/core';
import AbstractValueRefinementControls from '../../src/abstract-value-refinement-controls';
import RefinementControls from '../../src/refinement-controls';
import suite from './_suite';

const MOCK_ALIAS = 'some random alias';

class MockValueRefinement extends AbstractValueRefinementControls {
  get alias() {
    return MOCK_ALIAS;
  }
}

suite('AbstractValueRefinementControls', ({ expect, spy, stub }) => {
  let mockAbstractValueRefinementControls: AbstractValueRefinementControls;

  beforeEach(() => mockAbstractValueRefinementControls = new MockValueRefinement());

  describe('constructor()', () => {
    it('should extend RefinementControls', () => {
      expect(mockAbstractValueRefinementControls).to.be.an.instanceof(RefinementControls);
    });

    describe('state', () => {
      describe('moreRefinements()', () => {
        it('should call actions.fetchMoreRefinements()', () => {
          const fetchMoreRefinements = spy();
          const field = 'myfield';
          mockAbstractValueRefinementControls.props = { navigation: { field } };
          mockAbstractValueRefinementControls.actions = <any>{ fetchMoreRefinements };

          mockAbstractValueRefinementControls.state.moreRefinements();

          expect(fetchMoreRefinements).to.be.calledWith(field);
        });
      });
    });
  });

  describe('transformNavigation()', () => {
    it('should add onClick() handlers', () => {
      const navigation: any = { a: 'b', refinements: [{ c: 'd' }, { e: 'f' }] };

      const transformed = mockAbstractValueRefinementControls.transformNavigation<any>(navigation);

      expect(transformed.refinements).to.have.length(2);
      transformed.refinements.forEach((refinement) => {
        expect(refinement.onClick).to.be.a('function');
      });
    });

    it('should call actions.selectRefinement() when onClick() called', () => {
      const index = 8;
      const field = 'price';
      const navigation: any = { refinements: [{ index }] };
      const selectRefinement = spy();
      mockAbstractValueRefinementControls.actions = <any>{ selectRefinement };
      mockAbstractValueRefinementControls.props = { navigation: { field } };

      const transformed = mockAbstractValueRefinementControls.transformNavigation<any>(navigation);
      transformed.refinements[0].onClick();

      expect(selectRefinement).to.be.calledWithExactly(field, index);
    });

    it('should call actions.deselectRefinement() when onClick() called', () => {
      const index = 8;
      const field = 'price';
      const navigation: any = { refinements: [{ index, selected: true }] };
      const deselectRefinement = spy();
      mockAbstractValueRefinementControls.actions = <any>{ deselectRefinement };
      mockAbstractValueRefinementControls.props = { navigation: { field } };

      const transformed = mockAbstractValueRefinementControls.transformNavigation<any>(navigation);
      transformed.refinements[0].onClick();

      expect(deselectRefinement).to.be.calledWithExactly(field, index);
    });
  });
});
