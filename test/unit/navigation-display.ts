import NavigationDisplay from '../../src/navigation-display';
import suite from './_suite';

suite('NavigationDisplay', ({ expect, spy, itShouldHaveAlias }) => {
  let navigationDisplay: NavigationDisplay;

  beforeEach(() => navigationDisplay = new NavigationDisplay());

  itShouldHaveAlias(NavigationDisplay, 'navigationDisplay');

  describe('constructor()', () => {
    describe('state', () => {
      it('should set initial value', () => {
        expect(navigationDisplay.state.isActive).to.be.true;
      });

      describe('toggleDisplay()', () => {
        it('should set isActive to true', () => {
          const set = navigationDisplay.set = spy();
          navigationDisplay.state.isActive = false;

          navigationDisplay.state.toggleDisplay();

          expect(set).to.be.calledWith({ isActive: true });
        });

        it('should set isActive to false', () => {
          const set = navigationDisplay.set = spy();
          navigationDisplay.state.isActive = true;

          navigationDisplay.state.toggleDisplay();

          expect(set).to.be.calledWith({ isActive: false });
        });
      });
    });
  });
});
