import * as sinon from 'sinon';
import RefinementList from '../../src/refinement-list';
import suite from './_suite';

suite('RefinementList', ({ expect, spy, stub }) => {
  let refinementList: RefinementList;

  beforeEach(() => (refinementList = new RefinementList()));

  describe('constructor()', () => {
    describe('props', () => {
      it('should set initial value', () => {
        expect(refinementList.props).eql(<any>{ refinements: [], itemProps: {} });
      });
    });
  });

  describe('get alias()', () => {
    it('should return alias name', () => {
      expect(refinementList.alias).to.eq('refinements');
    });
  });

  describe('init()', () => {
    it('should provide refinements', () => {
      const provide = (refinementList.provide = spy());
      refinementList.set = () => null;
      const refinements: any = ['a', 'b'];
      const alias = 'c';
      stub(refinementList, 'alias').get(() => alias);
      refinementList.props = { refinements };

      refinementList.init();

      const newState = {filteredRefinements : refinements};

      expect(provide).to.be.calledWithExactly(alias, sinon.match.func);
      expect(refinementList.state).to.eql(newState);
    });
  });

  describe('handleChange()', () => {
    it('should filter refinements', () => {
      const set = refinementList.set = spy();
      const refinements: any = [{value : 'a'}, {value : 'b'}];
      refinementList.props = { refinements };
      const keyboardEvent = {target : {value : 'a'} }

      refinementList.handleChange(keyboardEvent);

      expect(set).to.be.calledWith({
        filteredRefinements : [{value : 'a'}]
      });
    });
  });

  describe('handleSelect()', () => {
    it('should select refinement', () => {
      const refinements: any = [{value : 'a' , onClick : spy()}, {value : 'b', onClick : spy()}];
      refinementList.state = { filteredRefinements : refinements };
      const keyboardEvent = {target : {value : 'a'} , keyCode : 13 }
      refinementList.handleSelect(keyboardEvent);

      expect(refinements[0].onClick).to.be.called
      expect(refinements[1].onClick).to.be.not.called
    });

    it('should not select refinement', () => {
      const refinements: any = [{value : 'a' , onClick : spy()}, {value : 'b', onClick : spy()}];
      refinementList.state = { filteredRefinements : refinements };
      const keyboardEvent = {target : {value : 'a'} , keyCode : 15 }
      refinementList.handleSelect(keyboardEvent);

      expect(refinements[0].onClick).to.be.not.called
      expect(refinements[1].onClick).to.be.not.called
    });
  });
});
