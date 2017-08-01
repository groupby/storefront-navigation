import AbstractRefinementList from '../../src/abstract-refinement-list';
import RefinementList from '../../src/refinement-list';
import suite from './_suite';

suite('RefinementList', ({ expect }) => {
  let refinementList: RefinementList;

  beforeEach(() => refinementList = new RefinementList());

  describe('constructor()', () => {
    it('should extend from AbstractRefinementList', () => {
      expect(refinementList).to.be.an.instanceof(AbstractRefinementList);
    });
  });

  describe('get alias()', () => {
    it('should return alias name', () => {
      expect(refinementList.alias).to.eq('refinements');
    });
  });
});
