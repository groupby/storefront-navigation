import { Selectors } from '@storefront/core';
import RefinementControls from '../../src/refinement-controls';
import ValueRefinementControls from '../../src/value-refinement-controls';
import suite from './_suite';

suite('ValueRefinementControls', ({ expect, spy, stub }) => {
  let valueRefinementControls: ValueRefinementControls;

  beforeEach(() => (valueRefinementControls = new ValueRefinementControls()));

  describe('constructor()', () => {
    it('should extend RefinementControls', () => {
      expect(valueRefinementControls).to.be.an.instanceof(RefinementControls);
    });

    describe('state', () => {
      describe('moreRefinements()', () => {
        it('should call actions.fetchMoreRefinements()', () => {
          const fetchMoreRefinements = spy();
          const field = 'myfield';
          valueRefinementControls.props = { navigation: { field } };
          valueRefinementControls.actions = <any>{ fetchMoreRefinements };

          valueRefinementControls.state.moreRefinements();

          expect(fetchMoreRefinements).to.be.calledWith(field);
        });
      });

      describe('selectAllRefinements()', () => {
        it('should call actions.selectAllRefinements()', () => {
          const selectAllRefinements = spy();
          const field = 'myfield';
          valueRefinementControls.props = { navigation: { field } };
          valueRefinementControls.actions = <any>{ selectAllRefinements };

          valueRefinementControls.state.selectAllRefinements();

          expect(selectAllRefinements).to.be.calledWith(field);
        });
      });
    });
  });

  describe('alias', () => {
    it('should return alias name', () => {
      expect(valueRefinementControls.alias).to.eq('valueControls');
    });
  });

  describe('transformNavigation()', () => {
    it('should add onClick() handlers', () => {
      const navigation: any = { a: 'b', refinements: [{ c: 'd' }, { e: 'f' }] };

      const transformed = valueRefinementControls.transformNavigation<any>(navigation);

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
      valueRefinementControls.actions = <any>{ selectRefinement };
      valueRefinementControls.props = { navigation: { field } };

      const transformed = valueRefinementControls.transformNavigation<any>(navigation);
      transformed.refinements[0].onClick();

      expect(selectRefinement).to.be.calledWithExactly(field, index);
    });

    it('should call actions.deselectRefinement() when onClick() called', () => {
      const index = 8;
      const field = 'price';
      const navigation: any = { refinements: [{ index, selected: true }] };
      const deselectRefinement = spy();
      valueRefinementControls.actions = <any>{ deselectRefinement };
      valueRefinementControls.props = { navigation: { field } };

      const transformed = valueRefinementControls.transformNavigation<any>(navigation);
      transformed.refinements[0].onClick();

      expect(deselectRefinement).to.be.calledWithExactly(field, index);
    });
  });
});
