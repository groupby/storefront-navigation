import AbstractValueRefinementControls from '../../src/abstract-value-refinement-controls';
import FilterRefinementControls from '../../src/filter-refinement-controls';
import suite from './_suite';

suite('FilterRefinementControls', ({ expect, itShouldHaveAlias }) => {
  let filterRefinementControls: FilterRefinementControls;

  beforeEach(() => filterRefinementControls = new FilterRefinementControls());

  itShouldHaveAlias(FilterRefinementControls, 'filterControls');

  describe('constructor()', () => {
    it('should extend AbstractValueRefinementControls', () => {
      expect(filterRefinementControls).to.be.an.instanceof(AbstractValueRefinementControls);
    });
  });

  describe('get alias()', () => {
    it('should return the alias string', () => {
      expect(filterRefinementControls.alias).to.eq('filterControls');
    });
  });
});
