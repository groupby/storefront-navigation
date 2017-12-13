import { Events } from '@storefront/core';
import RefinementPill from '../../src/refinement-pill';
import suite from './_suite';

suite('RefinementPill', ({ expect, spy, stub }) => {
  let refinementPill: RefinementPill;

  beforeEach(() => {
    refinementPill = new RefinementPill();
  });

  describe('constructor()', () => {
    describe('props', () => {
      it('should set initial value', () => {
        const tag = new RefinementPill();

        expect(tag.props).to.eql({});
      });
    });

    describe('state', () => {
      it('should set initial value', () => {
        const tag = new RefinementPill();

        expect(tag.state).to.eql({
          selected: false,
        });
      });
    });
  });

  describe('init()', () => {
    it('should call updateState()', () => {
      const updateState = refinementPill.updateState = spy();

      refinementPill.init();

      expect(updateState).to.be.calledOnce;
    });
  });

  describe('onUpdate()', () => {
    it('should call updateState()', () => {
      const updateState = refinementPill.updateState = spy();
      const state: any = { a: 1 };
      refinementPill.state = state;

      refinementPill.onUpdate();

      expect(updateState).to.be.calledOnce;
    });
  });

  describe('updateState()', () => {
    const onClick = { b: 2 };
    const onClose = { a: 1 };
    const selected = true;
    const refinement: any = {
      a: 1,
      onClick,
      onClose,
      selected,
    };

    it('should set state', () => {
      refinementPill.props.refinement = refinement;

      refinementPill.updateState();

      expect(refinementPill.state).to.be.eql({ refinement, onClick, onClose, selected: true });
    });

    it('should set selected to false if selected is falsy', () => {
      refinement.selected = undefined;
      refinementPill.props.refinement = refinement;

      refinementPill.updateState();

      expect(refinementPill.state).to.be.eql({ refinement, onClick, onClose, selected: false });
    });
  });
});