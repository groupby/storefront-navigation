import AbstractRefinementList from '../../src/abstract-refinement-list';
import FilteredRefinementList from '../../src/filtered-refinement-list';
import suite from './_suite';

suite('FilteredRefinementList', ({ expect }) => {
  let filteredRefinementList: FilteredRefinementList;

  beforeEach(() => filteredRefinementList = new FilteredRefinementList());

  describe('constructor()', () => {
    it('should extend RefinementList', () => {
      expect(filteredRefinementList).to.be.an.instanceof(AbstractRefinementList);
    });
  });

  describe('get alias()', () => {
    it('should return alias name', () => {
      expect(filteredRefinementList.alias).to.eq('filteredRefinements');
    });
  });
});
