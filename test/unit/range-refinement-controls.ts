import { Selectors } from '@storefront/core';
import RangeRefinemnetControls from '../../src/range-refinement-controls';
import suite from './_suite';

suite('RangeRefinementControls', ({ expect, spy, stub }) => {
  let rangeRefinementControls;

  beforeEach(() => rangeRefinementControls = new RangeRefinemnetControls());

  describe('constructor', () => {
    describe('props', () => {
      it('should set initial value', () => {
        expect(rangeRefinementControls.props).to.eql({
          lowPlaceholder: 'Min',
          highPlaceholder: 'Max',
          buttonValue: 'Go'
        });
      });
    });

    describe('init()', () => {
      it('should expose rangeRefinementControls', () => {
        const expose = rangeRefinementControls.expose = spy();
        stub(Selectors, 'navigation').returns({ label: '' });
        rangeRefinementControls.flux = <any>{ store: { getState: () => null } };
        rangeRefinementControls.props = <any>{ field: '' };

        rangeRefinementControls.init();

        expect(expose).to.be.calledWith('rangeRefinementControls', rangeRefinementControls);
      });

      it('should set label', () => {
        rangeRefinementControls.expose = () => null;
        stub(Selectors, 'navigation').returns({ label: 'nav' });
        rangeRefinementControls.flux = <any>{ store: { getState: () => null } };
        rangeRefinementControls.props = <any>{ field: '' };

        rangeRefinementControls.init();

        expect(rangeRefinementControls.label).to.be.eq('nav');
      });
    });
  });

  describe('search()', () => {
    it('should update search', () => {
      rangeRefinementControls.refs = {
        low: {
          value: '10'
        },
        high: {
          value: '20'
        }
      };
      rangeRefinementControls.props.field = 'Age Range';
      // const addRefinement = spy();
      // rangeRefinementControls.actions = <any>{ addRefinement };

      // rangeRefinementControls.search();

      // expect(addRefinement).to.be.calledWith('Age Range', 10, 20);
      const updateSearch = spy();
      rangeRefinementControls.actions = { updateSearch };

      rangeRefinementControls.search();

      expect(updateSearch).to.be.calledWith({
        navigationId: 'Age Range',
        high: 20,
        low: 10,
        range: true
      });
    });
  });
});
