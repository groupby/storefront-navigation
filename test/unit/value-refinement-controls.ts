import { Selectors } from '@storefront/core';
import AbstractValueRefinementControls from '../../src/abstract-value-refinement-controls';
import ValueRefinementControls from '../../src/value-refinement-controls';
import suite from './_suite';

suite('ValueRefinementControls', ({ expect, spy, stub, itShouldHaveAlias }) => {
  let valueRefinementControls: ValueRefinementControls;

  beforeEach(() => valueRefinementControls = new ValueRefinementControls());

  describe('constructor()', () => {
    it('should extend AbstractValueRefinementControls', () => {
      expect(valueRefinementControls).to.be.an.instanceof(AbstractValueRefinementControls);
    });
  });

  describe('alias', () => {
    it('should return alias name', () => {
      expect(valueRefinementControls.alias).to.eq('valueControls');
    });
  });
});
