import { Selectors } from '@storefront/core';
import RefinementControls from '../../src/refinement-controls';
import suite from './_suite';

class MockRefinementControls extends RefinementControls { }

suite('RefinementControls', ({ expect, spy, stub }) => {
  let refinementControls;

  beforeEach(() => {
    refinementControls = new MockRefinementControls();
  });

  describe('init()', () => {
    it('should call updateField()', () => {
      const field = 'brand';
      const updateField = refinementControls.updateField = spy();
      refinementControls.updateNavigation = () => null;
      refinementControls.flux = <any>{ on: () => null };
      refinementControls.props = <any>{ field };

      refinementControls.init();

      expect(updateField).to.be.calledWith(field);
    });
  });

  describe('onUpdate()', () => {
    it('should call updateField()', () => {
      const field = 'price';
      const updateField = refinementControls.updateField = spy();
      refinementControls.field = 'colour';
      refinementControls.updateAlias = () => null;
      refinementControls.selectNavigation = () => null;
      refinementControls.props = { field };

      refinementControls.onUpdate();

      expect(updateField).to.be.calledWith(field);
    });

    it('should call updateAlias()', () => {
      const field = 'price';
      const selectNavigation = refinementControls.selectNavigation = spy(() => ({ c: 'd' }));
      const updateAlias = refinementControls.updateAlias = spy();
      refinementControls.field = 'colour';
      refinementControls.updateField = () => null;
      refinementControls.state = <any>{ a: 'b' };
      refinementControls.props = { field };

      refinementControls.onUpdate();

      expect(updateAlias).to.be.calledWith('valueControls', { a: 'b', c: 'd' });
      expect(refinementControls.state).to.eql({ a: 'b', c: 'd' });
    });
  });

  describe('updateNavigation()', () => {
    it('should set the state', () => {
      const extracted = { a: 'b' };
      const set = refinementControls.set = spy();
      const selectNavigation = refinementControls.selectNavigation = spy(() => extracted);

      refinementControls.updateNavigation();

      expect(selectNavigation).to.be.called;
      expect(set).to.be.calledWith(extracted);
    });
  });

  describe('selectNavigation()', () => {
    it('should extract refinements and mark them as selected', () => {
      const navigation = {
        refinements: [{ a: 'b' }, { c: 'd' }, { e: 'f' }],
        selected: [0, 2],
        g: 'h'
      };
      const state = { i: 'j' };
      const navigationSelector = stub(Selectors, 'navigation').returns(navigation);
      const field = refinementControls.field = 'brand';
      refinementControls.flux = <any>{ store: { getState: () => state } };

      const refinements = refinementControls.selectNavigation();

      expect(refinements).to.eql({
        refinements: [
          { a: 'b', selected: true },
          { c: 'd', selected: false },
          { e: 'f', selected: true },
        ],
        selected: [0, 2],
        g: 'h'
      });
      expect(navigationSelector).to.be.calledWithExactly(state, field);
    });
  });
});
