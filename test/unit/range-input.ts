import { Selectors } from '@storefront/core';
import RangeInput from '../../src/range-input';
import suite from './_suite';

suite('RangeInput', ({ expect, spy, stub }) => {
  let rangeInput;

  beforeEach(() => rangeInput = new RangeInput());

  describe('constructor', () => {
    describe('props', () => {
      it('should set initial value', () => {
        expect(rangeInput.props).to.eql({
          lowPlaceholder: 'Min',
          highPlaceholder: 'Max',
          buttonValue: 'Go'
        });
      });
    });

    describe('init()', () => {
      beforeEach(() => {
        const state = {
          data: {
            navigations: {
              byId: {
                age_range: {
                  label: 'Age Range'
                }
              }
            }
          }
        };
        rangeInput['flux'] = <any>{
          store: {
            getState: () => null
          }
        };
        rangeInput.props = {
          field: 'age_range'
        };
        rangeInput['label'] = '';
        stub(rangeInput.flux.store, 'getState').returns(state);
      });

      it('should expose rangeInput', () => {
        const expose = rangeInput.expose = spy();

        rangeInput.init();

        expect(expose).to.be.calledWith('rangeInput', rangeInput);
      });

      it('should set label', () => {
        rangeInput.expose = () => null;


        rangeInput.init();

        expect(rangeInput.label).to.eq('Age Range');
      });
    });
  });

  describe('search()', () => {
    it('should update search', () => {
      rangeInput['actions'] = {
        updateSearch: null
      };
      rangeInput.refs = {
        low: {
          value: '10'
        },
        high: {
          value: '20'
        }
      };
      const updateSearch = rangeInput.actions.updateSearch = spy();
      const query = { a: 'b' };
      rangeInput.props.field = 'Age Range';
      stub(Selectors, 'query').returns(query);
      rangeInput['flux'] = {
        store: {
          getState: () => null
        }
      };

      rangeInput.search();

      expect(updateSearch).to.be.calledWith({
        query,
        navigationId: 'Age Range',
        low: 10,
        high: 20
      });
    });
  });
});
