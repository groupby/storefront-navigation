import NavigationList from '../../src/navigation-list';
import suite from './_suite';

suite('NavigationList', ({ expect, spy }) => {
  let navigationList;

  beforeEach(() => navigationList = new NavigationList());

  describe('constructor()', () => {
    describe('props', () => {
      it('should set props', () => {
        expect(navigationList.props).eql(<any>{ display: {}, fields: [] });
      });
    });
  });

  describe('init()', () => {
    it('should expose navigationList.props', () => {
      const expose = navigationList.expose = spy();

      navigationList.init();

      expect(expose).to.be.calledWith('navigationList', navigationList.props);
    });
  });
});
