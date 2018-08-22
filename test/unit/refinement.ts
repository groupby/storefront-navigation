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
  });

  describe('init()', () => {
    it('should set state', () => {
      const total = 1024;
      const updateState = (refinement.updateState = spy());

      refinement.init();

      expect(updateState).to.be.called;
    });
  });

  describe('onUpdate()', () => {
    it('should update the total', () => {
      const total = 1024;
      const updateState = (refinement.updateState = spy());

      refinement.onUpdate();

      expect(updateState).to.be.called;
    });
  });

  describe('updateState()', () => {
    it('should update the state', () => {
      const total = 100;
      const showTotal = true;
      const label = 'ok';
      const orType = 'button';
      const cancelDisplay = true;
      stub(refinement, 'getTotal').returns(total);
      stub(refinement, 'getShowTotal').returns(showTotal);
      stub(refinement, 'getLabel').returns(label);
      stub(refinement, 'getOrType').returns(orType);
      stub(refinement, 'getCancelDisplay').returns(cancelDisplay);
      refinement.state = <any>{ a: 'b' };

      refinement.updateState();

      expect(refinement.state).to.eql({
        a: 'b',
        total,
        showTotal,
        label,
        orType,
        cancelDisplay,
      });
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

  describe('getTotal()', () => {
    it('should return the total if it exists', () => {
      const total = 1024;
      refinement.props = <any>{ total };
      refinement.getShowTotal = () => true;

      expect(refinement.getTotal()).to.eq(total);
    });

    it('should return the record count if the refinement is selected and not or-able', () => {
      const count = 1024;
      refinement.select = () => count;
      refinement.getShowTotal = () => true;
      refinement.props = <any>{
        or: false,
        selected: true,
      };

      expect(refinement.getTotal()).to.eql(count);
    });
  });

  describe('getShowTotal()', () => {
    const truthTable = [
      { total: 0, alwaysShowTotal: false, selected: false, or: false, expected: false },
      { total: 0, alwaysShowTotal: false, selected: false, or: true, expected: false },
      { total: 0, alwaysShowTotal: false, selected: true, or: false, expected: false },
      { total: 0, alwaysShowTotal: false, selected: true, or: true, expected: false },
      { total: 0, alwaysShowTotal: true, selected: false, or: false, expected: false },
      { total: 0, alwaysShowTotal: true, selected: false, or: true, expected: false },
      { total: 0, alwaysShowTotal: true, selected: true, or: false, expected: false },
      { total: 0, alwaysShowTotal: true, selected: false, or: true, expected: false },
      { total: 0, alwaysShowTotal: true, selected: true, or: false, expected: false },
      { total: 0, alwaysShowTotal: true, selected: true, or: true, expected: false },
      { total: 1, alwaysShowTotal: false, selected: false, or: false, expected: true },
      { total: 1, alwaysShowTotal: false, selected: false, or: true, expected: true },
      { total: 1, alwaysShowTotal: false, selected: true, or: false, expected: false },
      { total: 1, alwaysShowTotal: false, selected: true, or: true, expected: false },
      { total: 1, alwaysShowTotal: true, selected: false, or: false, expected: true },
      { total: 1, alwaysShowTotal: true, selected: false, or: true, expected: true },
      { total: 1, alwaysShowTotal: true, selected: true, or: false, expected: true },
      { total: 1, alwaysShowTotal: true, selected: true, or: true, expected: true },
    ];

    truthTable.forEach(({ total, alwaysShowTotal, selected, or, expected }) => {
      it(`should return ${expected} for total: ${
        total ? '>0' : '0'
      }, alwaysShowTotal: ${alwaysShowTotal}, selected: ${selected}, or: ${or}`, () => {
        refinement.props = { alwaysShowTotal, selected, or };
        refinement.getTotal = () => total;

        expect(refinement.getShowTotal()).to.eq(expected);
      });
    });
  });

  describe('getLabel()', () => {
    it('should return the value', () => {
      const value = 'value';
      refinement.props = { range: false, value };

      expect(refinement.getLabel()).to.eq(value);
    });

    it('should return a range', () => {
      refinement.props = {
        range: true,
        low: 4,
        high: 10,
      };

      expect(refinement.getLabel()).to.eq('4 - 10');
    });
  });

  describe('getOrType()', () => {
    it('should return "checkbox"', () => {
      refinement.props = { or: true };

      expect(refinement.getOrType()).to.eq('checkbox');
    });

    it('should return "button"', () => {
      refinement.props = { or: false };

      expect(refinement.getOrType()).to.eq('button');
    });
  });

  describe('getCancelDisplay()', () => {
    it('should return true', () => {
      refinement.props = { or: false, selected: true };

      expect(refinement.getCancelDisplay()).to.eq(true);
    });

    it('should return false', () => {
      refinement.props = { or: true, selected: true };

      expect(refinement.getCancelDisplay()).to.eq(false);

      refinement.props = { or: true, selected: false };

      expect(refinement.getCancelDisplay()).to.eq(false);

      refinement.props = { or: false, selected: false };

      expect(refinement.getCancelDisplay()).to.eq(false);
    });
  });
});
