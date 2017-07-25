import { Selectors } from '@storefront/core';
import RangeRefinementControls from '../../src/range-refinement-controls';
import suite from './_suite';

suite('RangeRefinementControls', ({ expect, spy, stub }) => {
  let rangeRefinementControls;

  beforeEach(() => rangeRefinementControls = new RangeRefinementControls());

  describe('constructor', () => {
    describe('props', () => {
      it('should set initial value', () => {
        expect(rangeRefinementControls.props).to.eql({
          labels: {
            low: 'Min',
            high: 'Max',
            submit: 'Submit'
          }
        });
      });
    });

    describe('init()', () => {
      it('should expose rangeControls', () => {
        const expose = rangeRefinementControls.expose = spy();
        stub(Selectors, 'navigation').returns({ label: '' });
        rangeRefinementControls.flux = <any>{ store: { getState: () => null } };
        rangeRefinementControls.props = <any>{ field: '' };

        rangeRefinementControls.init();

        expect(expose).to.be.calledWith('rangeControls', rangeRefinementControls.props);
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
      const addRefinement = spy();
      rangeRefinementControls.actions = <any>{ addRefinement };

      rangeRefinementControls.search();

      expect(addRefinement).to.be.calledWith('Age Range', 10, 20);
    });
  });
});
