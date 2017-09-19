import RangeSelector from '../../src/range-selector';
import RefinementControls from '../../src/refinement-controls';
import suite from './_suite';

suite('RangeSelector', ({ expect, spy, stub }) => {
  let rangeSelector: RangeSelector;

  beforeEach(() => rangeSelector = new RangeSelector());

  describe('onClick()', () => {
    const field = 'NavigationField';
    let switchRefinement;

    beforeEach(() => switchRefinement = spy());

    it('should call switchRefinement with field, low, and high', () => {
      const high = 500;
      const low = 300;
      rangeSelector.props = {
        values: {
          high,
          low
        },
        field
      };
      rangeSelector.actions = <any>{
        switchRefinement
      };

      rangeSelector.onClick();

      expect(switchRefinement).to.be.calledWithExactly(field, low, high);
    });

    it('should call switchRefinement with field, high, and low', () => {
      const high = 100;
      const low = 300;
      rangeSelector.props = {
        values: {
          high,
          low
        },
        field
      };
      rangeSelector.actions = <any>{
        switchRefinement
      };

      rangeSelector.onClick();

      expect(switchRefinement).to.be.calledWithExactly(field, high, low);
    });
  });
});
