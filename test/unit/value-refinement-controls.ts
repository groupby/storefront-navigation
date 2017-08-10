import AbstractValueRefinementControls from '../../src/abstract-value-refinement-controls';
import ValueRefinementControls from '../../src/value-refinement-controls';
import suite from './_suite';

suite('ValueRefinementControls', ({ expect, itShouldHaveAlias }) => {
  let valueRefinementControls: ValueRefinementControls;

  beforeEach(() => valueRefinementControls = new ValueRefinementControls());

  itShouldHaveAlias(ValueRefinementControls, 'valueControls');

  describe('constructor()', () => {
    it('should extend AbstractValueRefinementControls', () => {
      expect(valueRefinementControls).to.be.an.instanceof(AbstractValueRefinementControls);
    });
  });

  describe('get alias()', () => {
    it('should return the alias string', () => {
      expect(valueRefinementControls.alias).to.eq('valueControls');
    });
  });
});
