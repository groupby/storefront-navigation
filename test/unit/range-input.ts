import RangeInput from '../../src/range-input';
import suite from './_suite';

suite('RangeInput', ({ expect }) => {
  describe('constructor', () => {
    it('should be ok', () => {
      expect(() => new RangeInput()).to.not.throw();
    });
  });
});
