import RefinementControls from '../../../src/refinement-controls/controls';
import RangeRefinementControls from '../../../src/refinement-controls/range-refinement-controls';
import suite from '../_suite';

suite('RangeRefinementControls', ({ expect, spy, stub }) => {
  let rangeRefinementControls: RangeRefinementControls;

  beforeEach(() => rangeRefinementControls = new RangeRefinementControls());

  describe('constructor()', () => {
    it('should extend RefinementControls', () => {
      expect(rangeRefinementControls).to.be.an.instanceof(RefinementControls);
    });

    describe('props', () => {
      it('should set initial values', () => {
        expect(rangeRefinementControls.props).to.eql({
          labels: {
            low: 'Min',
            high: 'Max',
            submit: 'Submit'
          }
        });
      });
    });
  });

  describe('alias', () => {
    it('should return alias', () => {
      expect(rangeRefinementControls.alias).to.eq('rangeControls');
    });
  });

  describe('onClick()', () => {
    it('should update search', () => {
      const field = 'Age Range';
      const low: any = { value: '10' };
      const high: any = { value: '20' };
      const addRefinement = spy();
      rangeRefinementControls.refs = { low, high };
      rangeRefinementControls.props = <any>{ navigation: { field } };
      rangeRefinementControls.actions = <any>{ addRefinement };

      rangeRefinementControls.onClick();

      expect(addRefinement).to.be.calledWith(field, 10, 20);
    });
  });
});
