import RangeInput from '../../src/range-input';
import suite from './_suite';

suite('RangeInput', ({ expect }) => {
  let rangeInput: RangeInput;

  beforeEach(() => rangeInput = new RangeInput());

  describe('constructor', () => {
    describe('props', () => {
      it('should set initial value', () => {
        expect(rangeInput.props).to.eql({
          lowPlaceholder: 'Min',
          highPlaceholder: 'Max',
          buttonValue: 'Go'
        });
      });
    });
  });
});
