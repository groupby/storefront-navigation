import { Events, Selectors, StoreSections } from '@storefront/core';
import RefinementPills from '../../src/refinement-pills';
import suite from './_suite';

suite('RefinementPills', ({ expect, spy, stub }) => {
  let refinementPills: RefinementPills;

  beforeEach(() => {
    refinementPills = new RefinementPills();
    refinementPills.props = { storeSection: StoreSections.PAST_PURCHASES };
  });

  describe('constructor()', () => {
    describe('state', () => {
      it('should set initial value', () => {
        const tag = new RefinementPills();

        expect(tag.state).to.eql({
          navigations: [],
          queryNavigation: {},
          displayQuery: '',
          displayCount: 0,
        });
      });
    });
  });

  describe('init()', () => {
    it('should listen for PAST_PURCHASE_NAVIGATIONS_UPDATED', () => {
      const on = spy();
      const once = spy();
      refinementPills.flux = <any>{ on, once };

      refinementPills.init();

      expect(once).to.be.calledWithExactly(Events.PAST_PURCHASE_NAVIGATIONS_UPDATED,
        refinementPills.updatePastPurchaseState);
      expect(on).to.be.calledWithExactly(Events.PAST_PURCHASE_PRODUCTS_UPDATED,
        refinementPills.updatePastPurchaseState);
    });
  });

  describe('updatePastPurchaseState()', () => {
    it('should call updatePastPurchaseDisplayQuery and updatePastPurchaseNavigations', () => {
      const updatePastPurchaseDisplayQuery = refinementPills.updatePastPurchaseDisplayQuery = spy();
      const updatePastPurchaseNavigations = refinementPills.updatePastPurchaseNavigations = spy();

      refinementPills.updatePastPurchaseState();

      expect(updatePastPurchaseDisplayQuery).to.be.calledOnce;
      expect(updatePastPurchaseNavigations).to.be.calledOnce;
    });
  });

  describe('updatePastPurchaseNavigations()', () => {
    it('should update navigations via set', () => {
      const queryNavigation = 4;
      const buildPastPurchaseQueryNavigation =
        refinementPills.buildPastPurchaseQueryNavigation = spy(() => queryNavigation);
      const navigations = [1, 2, 3];
      const newNavigations = [4, 1, 2, 3];
      const select = refinementPills.select = spy(() => navigations);
      const set = refinementPills.set = spy();

      refinementPills.updatePastPurchaseNavigations();

      expect(select).to.be.calledWithExactly(Selectors.pastPurchaseNavigations);
      expect(buildPastPurchaseQueryNavigation).to.be.calledOnce;
      expect(navigations).to.be.eql(newNavigations);
      expect(set).to.be.calledWithExactly({ navigations, queryNavigation });
    });
  });

  describe('updatePastPurchaseDisplayQuery()', () => {
    it('should update displayQuery and displayCount if new query is not empty', () => {
      const query = 'giraffe';
      const select = refinementPills.select = spy(() => query);
      const set = refinementPills.set = spy();

      refinementPills.updatePastPurchaseDisplayQuery();

      expect(select).to.be.calledWithExactly(Selectors.pastPurchaseQuery);
      expect(select).to.be.calledWithExactly(Selectors.pastPurchaseCurrentRecordCount);
      expect(set).to.be.calledWithExactly({
        displayCount: query,
        displayQuery: query,
      });
    });

    it('should not update displayQuery and displayCount if new query is empty', () => {
      const query = '';
      const select = refinementPills.select = spy();
      refinementPills.state.displayCount = 3;
      refinementPills.state.displayQuery = 'giraffe';

      refinementPills.updatePastPurchaseDisplayQuery();

      expect(select).to.be.calledWithExactly(Selectors.pastPurchaseQuery);
      expect(select).to.be.calledOnce;
      expect(refinementPills.state.displayCount).to.not.be.eql(query);
      expect(refinementPills.state.displayQuery).to.not.be.eql(query);
    });
  });

  describe('buildPastPurchaseQueryNavigation()', () => {
    it('should update queryNavigation', () => {
      const currentQuery = '';
      const displayQuery = refinementPills.state.displayQuery = 'monkey';
      const displayCount = refinementPills.state.displayCount = 5;
      const allRecordCount = 3;
      const storeRefinements = [];
      const select = refinementPills.select = stub();
      select.withArgs(Selectors.pastPurchaseQuery).returns(currentQuery);
      select.withArgs(Selectors.pastPurchaseAllRecordCount).returns(allRecordCount);
      select.withArgs(Selectors.pastPurchaseSelectedRefinements).returns(storeRefinements);
      const refinements = [
        {
          value: displayQuery,
          total: displayCount,
        },
        {
          value: 'All your purchases',
          total: allRecordCount,
        },
      ];
      const navigation = {
        field: 'query',
        label: 'Query',
        selected: [1],
        refinements
      };
      refinementPills.actions = <any>{};
      const updatePastPurchaseQuery = refinementPills.actions.updatePastPurchaseQuery = spy();
      const updatePastPurchaseState = refinementPills.updatePastPurchaseState = spy();

      const queryNavigation = refinementPills.buildPastPurchaseQueryNavigation();

      expect(JSON.stringify(queryNavigation)).to.eql(
        JSON.stringify(navigation)
      );
      queryNavigation.refinements[1]['onClick']();
      expect(updatePastPurchaseQuery).to.be.calledWith('');
      queryNavigation.refinements[0]['onClose']();
      expect(updatePastPurchaseState).to.be.calledOnce;
      queryNavigation.refinements[0]['onClick']();
      expect(updatePastPurchaseQuery).to.be.calledWith(displayQuery);
    });

    it('should not add a refinement for displayquery and should set selected to 0 when displayQuery is falsy', () => {
      const displayCount = refinementPills.state.displayCount = 5;
      const allRecordCount = 3;
      const storeRefinements = [];
      const select = refinementPills.select = stub();
      select.withArgs(Selectors.pastPurchaseQuery).returns(undefined);
      select.withArgs(Selectors.pastPurchaseAllRecordCount).returns(allRecordCount);
      select.withArgs(Selectors.pastPurchaseSelectedRefinements).returns(storeRefinements);
      const refinements = [
        {
          value: 'All your purchases',
          total: allRecordCount,
        },
      ];
      const navigation = {
        field: 'query',
        label: 'Query',
        selected: [0],
        refinements
      };

      const queryNavigation = refinementPills.buildPastPurchaseQueryNavigation();

      expect(JSON.stringify(queryNavigation)).to.eql(JSON.stringify(navigation));
    });

    // tslint:disable-next-line max-line-length
    it('should not set selected when there exists refinements in the store and should reset query when onclose is clicked and queries are equal', () => {
      const currentQuery = 'giraffe';
      const displayQuery = refinementPills.state.displayQuery = 'giraffe';
      const displayCount = refinementPills.state.displayCount = 5;
      const allRecordCount = 3;
      const storeRefinements = [1, 2];
      const select = refinementPills.select = stub();
      select.withArgs(Selectors.pastPurchaseQuery).returns(currentQuery);
      select.withArgs(Selectors.pastPurchaseAllRecordCount).returns(allRecordCount);
      select.withArgs(Selectors.pastPurchaseSelectedRefinements).returns(storeRefinements);
      const refinements = [
        {
          value: displayQuery,
          total: displayCount,
        },
        {
          value: 'All your purchases',
          total: allRecordCount,
        },
      ];
      const navigation = {
        field: 'query',
        label: 'Query',
        selected: [],
        refinements
      };
      refinementPills.actions = <any>{};
      const updatePastPurchaseQuery = refinementPills.actions.updatePastPurchaseQuery = spy();

      const queryNavigation = refinementPills.buildPastPurchaseQueryNavigation();

      expect(JSON.stringify(queryNavigation)).to.be.eql(
        JSON.stringify(navigation)
      );
      queryNavigation.refinements[0]['onClose']();
      expect(updatePastPurchaseQuery).to.be.calledWith('');
    });
  });
});
