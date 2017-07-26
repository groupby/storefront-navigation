import RefinementControls from '../../src/refinement-controls';
import suite from './_suite';

class MockRefinementControls extends RefinementControls { }

suite('RefinementControls', ({ expect }) => {

  describe('constructor()', () => {
    it('should be ok', () => {
      expect(() => new MockRefinementControls()).to.not.throw();
    });
  });
});
