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

  describe('alias', () => {
    it('should return alias', () => {
      expect(rangeRefinementControls.alias).to.eq('rangeControls');
    });
  });

  describe('init()', () => {
    it('should update state with low and high from selected', () => {
      rangeRefinementControls.props = <any>{
        navigation: {
          refinements: [
            { low: '0', high: '5' },
            { low: '5', high: '10' },
            { low: '10', high: '20' }
          ],
          selected: [2]
        }
      };

      rangeRefinementControls.init();

      expect(rangeRefinementControls.state).to.eql({
        min: 0,
        max: 20,
        low: 10,
        high: 20
      });
    });

    it('should update state with low and high from min and max', () => {
      rangeRefinementControls.props = <any>{
        navigation: {
          refinements: [
            { low: '0', high: '5' },
            { low: '5', high: '10' },
            { low: '10', high: '20' }
          ],
          selected: []
        }
      };

      rangeRefinementControls.init();

      expect(rangeRefinementControls.state).to.eql({
        min: 0,
        max: 20,
        low: 0,
        high: 20
      });
    });
  });

  describe('onChange()', () => {
    it('should call updateProps() and moveHandle() with handleLower', () => {
      const low = { value: 10 };
      const high = { value: 50 };
      const event = <any>{ target: low };
      const handleLower = { a: 'b' };
      const updateProps = rangeRefinementControls.updateProps = spy();
      const moveHandle = spy();
      rangeRefinementControls.refs = <any>{
        low, high
      };
      rangeRefinementControls.tags = <any>{
        'gb-slider': {
          state: {
            handleLower
          },
          props: {
            low: low.value
          },
          moveHandle
        }
      };

      rangeRefinementControls.onChange(event);

      expect(updateProps).to.be.calledWithExactly(low.value, high.value);
      expect(moveHandle).to.be.calledWithExactly(handleLower, low.value);
    });

    it('should call updateProps() and moveHandle() with handleUpper', () => {
      const low = { value: 10 };
      const high = { value: 50 };
      const event = <any>{ };
      const handleUpper = { a: 'b' };
      const updateProps = rangeRefinementControls.updateProps = spy();
      const moveHandle = spy();
      rangeRefinementControls.refs = <any>{
        low, high
      };
      rangeRefinementControls.tags = <any>{
        'gb-slider': {
          state: {
            handleUpper
          },
          props: {
            high: high.value
          },
          moveHandle
        }
      };

      rangeRefinementControls.onChange(event);

      expect(updateProps).to.be.calledWithExactly(low.value, high.value);
      expect(moveHandle).to.be.calledWithExactly(handleUpper, high.value);
    });
  });

  describe('onClick()', () => {
    it('should update search', () => {
      const field = 'Age Range';
      const low = 10;
      const high = 20;
      const switchRefinement = spy();
      rangeRefinementControls.state = <any>{ low, high };
      rangeRefinementControls.props = <any>{ navigation: { field } };
      rangeRefinementControls.actions = <any>{ switchRefinement };

      rangeRefinementControls.onClick();

      expect(switchRefinement).to.be.calledWith(field, low, high);
    });

    it('should update search and reverse low and high', () => {
      const field = 'Age Range';
      const high = 10;
      const low = 20;
      const switchRefinement = spy();
      rangeRefinementControls.state = <any>{ low, high };
      rangeRefinementControls.props = <any>{ navigation: { field } };
      rangeRefinementControls.actions = <any>{ switchRefinement };

      rangeRefinementControls.onClick();

      expect(switchRefinement).to.be.calledWith(field, high, low);
    });
  });

  describe('updateProps()', () => {
    it('should set low and high', () => {
      const low = 50;
      const high = 80;
      const set = rangeRefinementControls.set = spy();

      rangeRefinementControls.updateProps(low, high);

      expect(set).to.be.calledWithExactly({ low, high });
    });
  });
});
