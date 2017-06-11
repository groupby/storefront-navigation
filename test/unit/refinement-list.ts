import RefinementList from '../../src/refinement-list';
import suite from './_suite';

suite('RefinementList', ({ expect }) => {

  describe('constructor()', () => {
    it('should be ok', () => {
      expect(() => new RefinementList()).to.not.throw();
    });
  });
});
