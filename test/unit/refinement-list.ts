import RefinementList from '../../src/refinement-list';
import suite from './_suite';

suite('RefinementList', ({ expect, spy }) => {
  let refinementList: RefinementList;

  beforeEach(() => refinementList = new RefinementList());

  describe('constructor()', () => {
    describe('props', () => {
      it('should set initial value', () => {
        expect(refinementList.props).eql(<any>{ refinements: [] });
      });
    });
  });

  describe('init()', () => {
    it('should expose refinements', () => {
      const expose = refinementList.expose = spy();

      refinementList.init();

      expect(expose).to.be.calledWith('refinements', refinementList.props.refinements);
    });
  });

  describe('onUpdate()', () => {
    it('should call updateAlias()', () => {
      const updateAlias = refinementList.updateAlias = spy();

      refinementList.onUpdate();

      expect(updateAlias).to.be.calledWith('refinements', refinementList.props.refinements);
    });
  });
});
