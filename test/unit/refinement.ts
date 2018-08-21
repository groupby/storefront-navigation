import { Selectors } from '@storefront/core';
import Refinement from '../../src/refinement';
import suite from './_suite';

suite('Refinement', ({ expect, spy, stub, itShouldProvideAlias }) => {
  let refinement: Refinement;

  beforeEach(() => (refinement = new Refinement()));

  itShouldProvideAlias(Refinement, 'refinementDisplay');

  describe('constructor()', () => {
    describe('props', () => {
      it('should set initial values', () => {
        expect(refinement.props).to.eql({ alwaysShowTotal: false });
      });
    });

    describe('state', () => {
      it('should set initial value', () => {
        expect(refinement.state).to.eql({ total: 0 });
      });
    });
  });

  describe('init()', () => {
    it('should set state', () => {
      const total = 1024;
      const updateTotal = refinement.updateTotal = spy();

      refinement.init();

      expect(updateTotal).to.be.called;
    });
  });

  describe('onUpdate()', () => {
    it('should update the total', () => {
      const total = 1024;
      const updateTotal = refinement.updateTotal = spy();
      refinement.state = <any>{ total: 1 };

      refinement.onUpdate();

      expect(updateTotal).to.be.called;
    });
  });

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

  describe('updateTotal()', () => {
    it('should return the total if it exists', () => {
      const total = 1024;
      refinement.props = <any>{ total };

      refinement.updateTotal();

      expect(refinement.state).to.eql({ total });
    });

    it('should return the record count if the refinement is selected and not or-able', () => {
      const count = 1024;
      refinement.select = spy(() => count);
      refinement.props = <any>{
        or: false,
        selected: true,
      };

      refinement.updateTotal();

      expect(refinement.state).to.eql({ total: count });
    });
  });
});
