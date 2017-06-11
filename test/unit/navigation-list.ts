import NavigationList from '../../src/navigation-list';
import suite from './_suite';

suite('NavigationList', ({ expect }) => {

  describe('constructor()', () => {
    it('should be ok', () => {
      expect(() => new NavigationList()).to.not.throw();
    });
  });
});
