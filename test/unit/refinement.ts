import Refinement from '../../src/refinement';
import suite from './_suite';

suite('Refinement', ({ expect, spy, stub }) => {
  let refinement: Refinement;

  beforeEach(() => (refinement = new Refinement()));

  describe('onClick()', () => {
    it('should set preventUpdate', () => {
      const event: any = {};
      refinement.props = {} as any;

      refinement.onClick(event);

      expect(event.preventUpdate).to.be.true;
    });

    it('should call props.onClick()', () => {
      const onClick = spy();
      refinement.props = { onClick };

      refinement.onClick(<any>{});

      expect(onClick).to.be.called;
    });
  });
});
