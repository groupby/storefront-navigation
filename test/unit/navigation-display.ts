import NavigationDisplay from '../../src/navigation-display';
import suite from './_suite';

suite('NavigationDisplay', ({ expect, spy, itShouldHaveAlias }) => {
  let navigationDisplay;

  beforeEach(() => navigationDisplay = new NavigationDisplay());

  itShouldHaveAlias(NavigationDisplay, 'navigationDisplay');

  describe('constructor()', () => {
    describe('state', () => {
      it('should set initial value', () => {
        expect(navigationDisplay.state.isActive).to.be.true;
      });

      describe('toggleDisplay()', () => {
        it('should toggleDisplay', () => {

        });
      })
    });
  });
});
