import Refinement from '../../src/refinement';
import suite from './_suite';

suite('Refinement', ({ expect, spy, stub }) => {
  let refinement: Refinement;

  beforeEach(() => refinement = new Refinement());

  describe('init()', () => {
    it('should call expose', () => {
      const expose = refinement.expose = spy();
      const ref = refinement.refinement = <any>{ a: 'b' };

      refinement.init();

      expect(expose.calledWith('refinement', refinement));
    });
  });
});
