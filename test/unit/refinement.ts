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
        expect(refinement.state).to.eql({
          total: 0,
          showTotal: false,
          label: '',
        });
      });
    });
  });

  describe('init()', () => {
    it('should set state', () => {
      const total = 1024;
      const updateState = refinement.updateState = spy();

      refinement.init();

      expect(updateState).to.be.called;
    });
  });

  describe('onUpdate()', () => {
    it('should update the total', () => {
      const total = 1024;
      const updateState = refinement.updateState = spy();

      refinement.onUpdate();

      expect(updateState).to.be.called;
    });
  });

  describe('updateState()', () => {
    it('should update the state', () => {
      const total = 1024;
      const showTotal = true;
      const label = 'value'
      const getTotal = refinement.getTotal = () => total;
      const shouldShowTotal = refinement.shouldShowTotal = () => showTotal;
      const getLabel = refinement.getLabel = () => label;
      refinement.props = <any>{ value: label };
      refinement.state = <any>{ a: 'b' };

      refinement.updateState();

      expect(refinement.state).to.eql({ a: 'b', total, showTotal, label });
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
      refinement.shouldShowTotal = () => true;

      expect(refinement.getTotal()).to.eq(total);
    });

    it('should return the record count if the refinement is selected and not or-able', () => {
      const count = 1024;
      refinement.select = () => count;
      refinement.shouldShowTotal = () => true;
      refinement.props = <any>{
        or: false,
        selected: true,
      };

      expect(refinement.getTotal()).to.eql(count);
    });
  });

  describe('shouldShowTotal()', () => {
    const truthTable = [
      { total: 0, alwaysShowTotal: false, selected: false, or: false, expected: false },
      { total: 0, alwaysShowTotal: false, selected: false, or:  true, expected: false },
      { total: 0, alwaysShowTotal: false, selected:  true, or: false, expected: false },
      { total: 0, alwaysShowTotal: false, selected:  true, or:  true, expected: false },
      { total: 0, alwaysShowTotal:  true, selected: false, or: false, expected: false },
      { total: 0, alwaysShowTotal:  true, selected: false, or:  true, expected: false },
      { total: 0, alwaysShowTotal:  true, selected:  true, or: false, expected: false },
      { total: 0, alwaysShowTotal:  true, selected: false, or:  true, expected: false },
      { total: 0, alwaysShowTotal:  true, selected:  true, or: false, expected: false },
      { total: 0, alwaysShowTotal:  true, selected:  true, or:  true, expected: false },
      { total: 1, alwaysShowTotal: false, selected: false, or: false, expected:  true },
      { total: 1, alwaysShowTotal: false, selected: false, or:  true, expected:  true },
      { total: 1, alwaysShowTotal: false, selected:  true, or: false, expected: false },
      { total: 1, alwaysShowTotal: false, selected:  true, or:  true, expected: false },
      { total: 1, alwaysShowTotal:  true, selected: false, or: false, expected:  true },
      { total: 1, alwaysShowTotal:  true, selected: false, or:  true, expected:  true },
      { total: 1, alwaysShowTotal:  true, selected:  true, or: false, expected:  true },
      { total: 1, alwaysShowTotal:  true, selected:  true, or:  true, expected:  true },
    ];

    truthTable.forEach(({ total, alwaysShowTotal, selected, or, expected}) => {
      it(`should return ${expected} for total: ${total ? '>0' : '0'}, alwaysShowTotal: ${alwaysShowTotal}, selected: ${selected}, or: ${or}`, () => {
        refinement.props = { alwaysShowTotal, selected, or };
        refinement.state = <any>{ total };

        expect(refinement.shouldShowTotal()).to.eq(expected);
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
});
