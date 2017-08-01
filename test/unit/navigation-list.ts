import NavigationList from '../../src/navigation-list';
import suite from './_suite';

suite('NavigationList', ({ expect, spy, itShouldHaveAlias }) => {
  let navigationList;

  beforeEach(() => navigationList = new NavigationList());

  itShouldHaveAlias(NavigationList, 'navigationList');

  describe('constructor()', () => {
    describe('props', () => {
      it('should set initial values', () => {
        expect(navigationList.props).eql(<any>{ display: {}, fields: [], labels: {} });
      });
    });
  });

  describe('init()', () => {
    it('should expose navigationList.props', () => {
      const updateState = navigationList.updateState = spy();

      navigationList.init();

      expect(updateState).to.be.called;
    });
  });
});
