import { Events } from '@storefront/core';
import Navigation from '../../src/navigation';
import suite from './_suite';

suite('Navigation', ({ expect, spy, itShouldBeConfigurable, itShouldHaveAlias }) => {
  let navigation: Navigation;

  beforeEach(() => navigation = new Navigation());

  itShouldBeConfigurable(Navigation);
  itShouldHaveAlias(Navigation, 'navigation');

  describe('constructor()', () => {
    describe('props', () => {
      it('should set initial values', () => {
        expect(navigation.props).to.eql({ display: {}, labels: {}, collapse: true, defaultOpen: 3 });
      });
    });

    describe('state', () => {
      it('should set initial value', () => {
        expect(navigation.state).to.eql({ fields: [] });
      });
    });
  });

  describe('init()', () => {
    it('should set initial fields', () => {
      navigation.flux = <any>{ on: () => null };

      navigation.init();

      expect(navigation.state.fields).to.eql([]);
    });

    it('should listen for NAVIGATIONS_UPDATED', () => {
      const on = spy();
      navigation.flux = <any>{ on };

      navigation.init();

      expect(on).to.be.calledWith(Events.NAVIGATIONS_UPDATED, navigation.updateFields);
    });
  });

  describe('updateFields()', () => {
    it('should set fields', () => {
      const fields = ['a', 'b', 'c'];
      const display = { a: 'value', b: 'range' };
      const labels = { b: 'B', c: 'C' };
      const set = navigation.set = spy();
      navigation.props = <any>{ display, labels, defaultOpen: 2 };

      navigation.updateFields(<any>{ allIds: fields });

      expect(set).to.be.calledWith({
        fields: [
          { value: 'a', display: 'value', label: undefined, active: true },
          { value: 'b', display: 'range', label: 'B', active: true },
          { value: 'c', display: undefined, label: 'C', active: false }
        ]
      });
    });
  });
});
