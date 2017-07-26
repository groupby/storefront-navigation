import Refinement from '../../src/refinement';
import suite from './_suite';

suite('Refinement', ({ expect, spy, stub }) => {
  let refinement: Refinement;

  beforeEach(() => refinement = new Refinement());

  describe('onClick()', () => {
    it('should set preventUpdate', () => {
      const event: any = {};
      refinement.$valueControls = <any>{};

      refinement.onClick(event);

      expect(event.preventUpdate).to.be.true;
    });

    it('should call $valueControls.onClick()', () => {
      const i = 8;
      const onClick = spy();
      const event: any = { item: { i } };
      refinement.$valueControls = <any>{ onClick };

      refinement.onClick(event);

      expect(onClick).to.be.calledWith(i);
    });
  });
});
