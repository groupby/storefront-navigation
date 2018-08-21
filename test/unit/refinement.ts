import { Selectors } from '@storefront/core';
import Refinement from '../../src/refinement';
import suite from './_suite';

suite('Refinement', ({ expect, spy, stub }) => {
  let refinement: Refinement;

  beforeEach(() => (refinement = new Refinement()));

  describe('onClick()', () => {
    it('should set preventUpdate', () => {
      const event: any = {};
      refinement.props = {} as any;

      refinement.onClick(event);

      expect(event.preventUpdate).to.be.true;
    });

    it('should call props.onClick()', () => {
      const onClick = spy();
      refinement.props = <any>{ onClick };

      refinement.onClick(<any>{});

      expect(onClick).to.be.called;
    });
  });

  describe('getTotal()', () => {
    it('should return the total if it exists', () => {
      const total = 1024;
      refinement.props = <any>{ total };

      expect(refinement.getTotal()).to.eq(total);
    });

    it('should return the record count if the refinement is selected and not or-able', () => {
      const count = 1024;
      refinement.select = spy(() => count);
      refinement.props = <any>{
        or: false,
        selected: true,
      };

      expect(refinement.getTotal()).to.eq(count);
    });
  });
});
