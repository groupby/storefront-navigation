import RangeRefinementControls from '../../src/range-refinement-controls';
import RefinementControls from '../../src/refinement-controls';
import suite from './_suite';

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

  describe('init()', () => {
    it('should call super init()', () => {
      const init = stub(RefinementControls.prototype, 'init');
      rangeRefinementControls.expose = () => null;

      rangeRefinementControls.init();

      expect(init).to.be.calledOnce;
    });

    it('should call expose()', () => {
      const expose = rangeRefinementControls.expose = spy();
      stub(RefinementControls.prototype, 'init');

      rangeRefinementControls.init();

      expect(expose).to.be.calledWith('rangeControls', rangeRefinementControls.props);
    });
  });

  describe('search()', () => {
    it('should update search', () => {
      const low: any = { value: '10' };
      const high: any = { value: '20' };
      const addRefinement = spy();
      rangeRefinementControls.refs = { low, high };
      rangeRefinementControls.props.field = 'Age Range';
      rangeRefinementControls.actions = <any>{ addRefinement };

      rangeRefinementControls.search();

      expect(addRefinement).to.be.calledWith('Age Range', 10, 20);
    });
  });
});
