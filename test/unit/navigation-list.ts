import NavigationList from '../../src/navigation-list';
import suite from './_suite';

suite('NavigationList', ({ expect, spy }) => {
  let navigationList;

  beforeEach(() => navigationList = new NavigationList());

  describe('constructor()', () => {
    describe('init()', () => {
      it('should expose navigationList', () => {
        const expose = navigationList.expose = spy();
        navigationList.$navigation = <any>{ props: {} };

        navigationList.init();

        expect(expose).to.be.calledWith('navigationList', navigationList);
      });

      it('should initialize rangeInput to default if range-input is not passed to navigation', () => {
        navigationList.expose = () => null;
        navigationList.$navigation = <any>{ props: {} };

        navigationList.init();

        expect(navigationList.rangeInput).to.eql({
          'variants.ReleaseDate': 'range',
          'variants.popularity_7days': 'range'
        });
      });

      it('should initialize rangeInput to default if range-input is passed to navigation', () => {
        navigationList.expose = () => null;
        navigationList.$navigation = <any>{ props: { rangeInput: { a: 'a' } } };

        navigationList.init();

        expect(navigationList.rangeInput).to.eql({
          a: 'a'
        });
      });
    });
  });
});
