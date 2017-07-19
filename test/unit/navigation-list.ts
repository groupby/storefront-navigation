import NavigationList from '../../src/navigation-list';
import suite from './_suite';

suite('NavigationList', ({ expect, spy }) => {
  let navigationList;

  beforeEach(() => navigationList = new NavigationList());

  describe('constructor()', () => {
    describe('props', () => {
      it('should set props to default', () => {
        expect(navigationList.props.fields).to.eql([]);
        expect(navigationList.props.rangeInput).to.eql([]);
      });
    });

    describe('init()', () => {
      it('should expose navigationList', () => {
        const expose = navigationList.expose = spy();

        navigationList.init();

        expect(expose).to.be.calledWith('navigationList', navigationList);
      });

      it('should initialize rangeInput', () => {
        navigationList.expose = () => null;
        navigationList.props.rangeInput = ['a', 'b', 'c'];

        navigationList.init();

        expect(navigationList.rangeInput).to.eql({
          a: 'a',
          b: 'b',
          c: 'c'
        });
      });
    });
  });

  describe('useRangeInput()', () => {
    it('should return true if item is in rangeInput, false otherwise', () => {
      navigationList.rangeInput = {};

      expect(navigationList.useRangeInput('a')).to.be.false;

      navigationList.rangeInput = { a: 'a' };

      expect(navigationList.useRangeInput('a')).to.be.true;
    });
  });
});
