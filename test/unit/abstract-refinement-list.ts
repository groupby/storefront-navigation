import AbstractRefinementList from '../../src/abstract-refinement-list';
import suite from './_suite';

const MOCK_ALIAS = 'some random alias';

class MockRefinementList extends AbstractRefinementList {
  get alias() {
    return MOCK_ALIAS;
  }
}

suite('AbstractRefinementList', ({ expect, spy }) => {
  let refinementList: AbstractRefinementList;

  beforeEach(() => refinementList = new MockRefinementList());

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
      const refinements: any = ['a', 'b'];
      refinementList.props = { refinements };

      refinementList.init();

      expect(expose).to.be.calledWith(MOCK_ALIAS, refinements);
    });
  });

  describe('onUpdate()', () => {
    it('should call updateAlias()', () => {
      const updateAlias = refinementList.updateAlias = spy();
      const refinements: any = ['a', 'b'];
      refinementList.props = { refinements };

      refinementList.onUpdate();

      expect(updateAlias).to.be.calledWith(MOCK_ALIAS, refinements);
    });
  });

  describe('get alias()', () => {
    it('should return alias name', () => {
      expect(refinementList.alias).to.eq(MOCK_ALIAS);
    });
  });
});
