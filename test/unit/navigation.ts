import { Events } from '@storefront/core';
import Navigation from '../../src/navigation';
import suite from './_suite';

suite('Navigation', ({ expect, spy }) => {
  let navigation: Navigation;

  beforeEach(() => navigation = new Navigation());

  describe('init()', () => {
    it('should set initial fields', () => {
      navigation.expose = () => null;
      navigation.flux = <any>{ on: () => null };

      navigation.init();

      expect(navigation.state.fields).to.eql([]);
    });

    it('should listen for NAVIGATIONS_UPDATED', () => {
      const on = spy();
      navigation.flux = <any>{ on };
      navigation.expose = () => null;

      navigation.init();

      expect(on).to.be.calledWith(Events.NAVIGATIONS_UPDATED, navigation.updateFields);
    });
  });

  describe('updateFields()', () => {
    it('should set fields', () => {
      const fields = ['a', 'b'];
      const set = navigation.set = spy();

      navigation.updateFields(<any>{ allIds: fields });

      expect(set).to.be.calledWith({ fields });
    });
  });
});
