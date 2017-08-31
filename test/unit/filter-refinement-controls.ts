import FilterRefinementControls from '../../src/filter-refinement-controls';
import ValueRefinementControls from '../../src/value-refinement-controls';
import suite from './_suite';

suite('FilterRefinementControls', ({ expect, itShouldHaveAlias }) => {
  let filterRefinementControls: FilterRefinementControls;

  beforeEach(() => filterRefinementControls = new FilterRefinementControls());

  describe('constructor()', () => {
    it('should extend ValueRefinementControls', () => {
      expect(filterRefinementControls).to.be.an.instanceof(ValueRefinementControls);
    });
  });

  describe('get alias()', () => {
    it('should return the alias string', () => {
      expect(filterRefinementControls.alias).to.eq('filterControls');
    });
  });
});
