import NavigationHeader from '../../src/navigation-header';
import suite from './_suite';

suite('NavigationHeader', ({ expect, spy, stub, itShouldHaveAlias }) => {
  let navigationHeader: NavigationHeader;

  beforeEach(() => navigationHeader = new NavigationHeader());

  describe('constructor()', () => {
    describe('props', () => {
      it('should set initial value', () => {
        expect(navigationHeader.props).to.be.eql({ icons: {} });
      });
    });
  });

  describe('init()', () => {
    it('should call expose()', () => {
      const expose = navigationHeader.expose = spy();
      const props = navigationHeader.props = <any>{ a: 'b' };

      navigationHeader.init();

      expect(expose).to.be.calledWithExactly('navigationHeader', props);
    });
  });
});
