import RefinementControls from '../../src/refinement-controls';
import SliderRefinementControls from '../../src/slider-refinement-controls';
import suite from './_suite';

suite('SliderRefinementControls', ({ expect, spy, stub }) => {
  let sliderRefinementControls: SliderRefinementControls;

  beforeEach(() => sliderRefinementControls = new SliderRefinementControls());

  describe('constructor()', () => {
    it('should extend RefinementControls', () => {
      expect(sliderRefinementControls).to.be.an.instanceof(RefinementControls);
    });

    describe('props', () => {
      it('should set initial values', () => {
        expect(sliderRefinementControls.props).to.eql({
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
      expect(sliderRefinementControls.alias).to.eq('rangeControls');
    });
  });

  describe('init()', () => {
    it('should update state with low and high from selected', () => {
      sliderRefinementControls.props = <any>{
        navigation: {
          refinements: [
            { low: 0, high: 5 },
            { low: 5, high: 10 },
            { low: 10, high: 20 }
          ],
          selected: [2]
        }
      };

      sliderRefinementControls.init();

      expect(sliderRefinementControls.state).to.eql({
        min: 0,
        max: 20,
        low: 10,
        high: 20
      });
    });

    it('should update state with low and high from min and max', () => {
      sliderRefinementControls.props = <any>{
        navigation: {
          refinements: [
            { low: 0, high: 5 },
            { low: 5, high: 10 },
            { low: 10, high: 20 }
          ],
          selected: []
        }
      };

      sliderRefinementControls.init();

      expect(sliderRefinementControls.state).to.eql({
        min: 0,
        max: 20,
        low: 0,
        high: 20
      });
    });
  });

  describe('onChange()', () => {
    const low = { value: 10 };
    const high = { value: 50 };
    let updateSelected;
    let moveHandle;

    beforeEach(() => {
      updateSelected = sliderRefinementControls.updateSelected = spy();
      moveHandle = spy();
    });

    it('should call updateSelected() and moveHandle() with lower', () => {
      const event = <any>{ target: low };
      const lower = { a: 'b' };
      sliderRefinementControls.tags = <any>{
        'gb-slider': {
          refs: {
            lower
          },
          props: {
            low: low.value
          },
          moveHandle
        },
        'gb-range-selector': {
          refs: {
            low,
            high
          }
        }
      };

      sliderRefinementControls.onChange(event);

      expect(updateSelected).to.be.calledWithExactly(low.value, high.value);
      expect(moveHandle).to.be.calledWithExactly(lower, low.value);
    });

    it('should call updateSelected() and moveHandle() with upper', () => {
      const event = <any>{ };
      const upper = { a: 'b' };
      sliderRefinementControls.tags = <any>{
        'gb-slider': {
          refs: {
            upper
          },
          props: {
            high: high.value
          },
          moveHandle
        },
        'gb-range-selector': {
          refs: {
            low,
            high
          }
        }
      };

      sliderRefinementControls.onChange(event);

      expect(updateSelected).to.be.calledWithExactly(low.value, high.value);
      expect(moveHandle).to.be.calledWithExactly(upper, high.value);
    });
  });

  // describe('onClick()', () => {
  //   const field = 'Age Range';
  //   let switchRefinement;
  //
  //   beforeEach(() => switchRefinement = spy());
  //
  //   it('should update search', () => {
  //     const low = 10;
  //     const high = 20;
  //     sliderRefinementControls.state = <any>{ low, high };
  //     sliderRefinementControls.props = <any>{ navigation: { field } };
  //     sliderRefinementControls.actions = <any>{ switchRefinement };
  //
  //     sliderRefinementControls.onClick();
  //
  //     expect(switchRefinement).to.be.calledWithExactly(field, low, high);
  //   });
  //
  //   it('should update search and reverse low and high', () => {
  //     const high = 10;
  //     const low = 20;
  //     sliderRefinementControls.state = <any>{ low, high };
  //     sliderRefinementControls.props = <any>{ navigation: { field } };
  //     sliderRefinementControls.actions = <any>{ switchRefinement };
  //
  //     sliderRefinementControls.onClick();
  //
  //     expect(switchRefinement).to.be.calledWithExactly(field, high, low);
  //   });
  // });

  describe('updateSelected()', () => {
    it('should set low and high', () => {
      const low = 50;
      const high = 80;
      const set = sliderRefinementControls.set = spy();

      sliderRefinementControls.updateSelected(low, high);

      expect(set).to.be.calledWithExactly({ low, high });
    });
  });
});
