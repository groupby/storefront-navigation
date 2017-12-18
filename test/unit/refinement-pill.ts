import { Events } from '@storefront/core';
import RefinementPill from '../../src/refinement-pill';
import suite from './_suite';

suite('RefinementPill', ({ expect }) => {
  describe('constructor()', () => {
    describe('props', () => {
      it('should have no initial value', () => {
        const tag = new RefinementPill();

        expect(tag.props).to.be.undefined;
      });
    });
  });
});
