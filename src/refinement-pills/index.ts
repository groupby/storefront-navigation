import {
  alias,
  tag,
  Events,
  ProductTransformer,
  Selectors,
  Store,
  StoreSections,
  Structure,
  Tag
} from '@storefront/core';

@alias('refinementPills')
@tag('gb-refinement-pills', require('./index.html'))
class RefinementPills {
  state: RefinementPills.State = {
    navigations: [],
    queryNavigation: {},
    displayQuery: '',
    displayCount: 0,
  };

  init() {
    switch (this.props.storeSection) {
      case StoreSections.PAST_PURCHASES:
        this.subscribeOnce(Events.PAST_PURCHASE_NAVIGATIONS_UPDATED, this.updatePastPurchaseState);
        this.subscribe(Events.PAST_PURCHASE_PRODUCTS_UPDATED, this.updatePastPurchaseState);
        break;
    }
  }

  updatePastPurchaseState = () => {
    this.updatePastPurchaseDisplayQuery();
    this.updatePastPurchaseNavigations();
  }

  updatePastPurchaseNavigations = () => {
    const navigations = this.select(Selectors.pastPurchaseNavigations);

    const queryNavigation = this.buildPastPurchaseQueryNavigation();

    navigations.unshift(queryNavigation);

    this.set({ navigations, queryNavigation });
  }

  updatePastPurchaseDisplayQuery = () => {
    const displayQuery = this.select(Selectors.pastPurchaseQuery);
    if (displayQuery) {
      this.set({
        displayQuery,
        displayCount: this.select(Selectors.pastPurchaseCurrentRecordCount),
      });
    }
  }

  buildPastPurchaseQueryNavigation = () => {
    const currentQuery = this.select(Selectors.pastPurchaseQuery) || '';
    const displayQuery = this.state.displayQuery;
    const queriesAreEqual = displayQuery === currentQuery;
    const hasRefinementSelected = this.select(Selectors.pastPurchaseSelectedRefinements).length !== 0;

    const resetQuery = () => this.actions.updatePastPurchaseQuery('');

    const refinements: any[] = [{
      value: 'All your purchases',
      total: this.select(Selectors.pastPurchaseAllRecordCount),
      onClick: resetQuery,
    }];

    if (displayQuery) {
      refinements.unshift({
        value: displayQuery,
        total: this.state.displayCount,
        onClick: () => this.actions.updatePastPurchaseQuery(displayQuery),
        onClose: () => {
          this.state.displayQuery = '';
          if (queriesAreEqual) {
            resetQuery();
          } else {
            this.updatePastPurchaseState();
          }
        },
      });
    }

    return {
      field: 'query',
      label: 'Query',
      selected: hasRefinementSelected ? [] : [(displayQuery && !queriesAreEqual) ? 1 : 0],
      refinements
    };
  }
}

interface RefinementPills extends Tag<Tag.Props, RefinementPills.State> { }
namespace RefinementPills {
  export interface State {
    navigations: Store.Navigation[];
    queryNavigation: any;
    displayQuery: string;
    displayCount: number;
  }
}

export default RefinementPills;
