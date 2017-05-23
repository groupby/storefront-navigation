import { Component, Events } from '@storefront/core';
import Navigation from '../../src/navigation';
import suite from './_suite';

suite('Navigation', ({ expect, spy }) => {

  describe('constructor()', () => {
    afterEach(() => {
      delete Component.prototype.expose;
      delete Component.prototype.flux;
    });

    it('should set initial fields', () => {
      Component.prototype.expose = () => null;
      Component.prototype.flux = <any>{ on: () => null };

      const navigation = new Navigation();

      expect(navigation.state.fields).to.eql([]);
    });

    it('should call expose()', () => {
      const expose = Component.prototype.expose = spy();
      Component.prototype.flux = <any>{ on: () => null };

      new Navigation();

      expect(expose.calledWith('navigation')).to.be.true;
    });

    it('should listen for NAVIGATIONS_UPDATED', () => {
      const on = spy();
      Component.prototype.flux = <any>{ on };
      Component.prototype.expose = () => null;

      const navigation = new Navigation();

      expect(on.calledWith(Events.NAVIGATIONS_UPDATED, navigation.updateFields)).to.be.true;
    });
  });

  describe('actions', () => {
    let navigation: Navigation;

    before(() => {
      Component.prototype.expose = () => null;
      Component.prototype.flux = <any>{ on: () => null };
    });
    after(() => {
      delete Component.prototype.expose;
      delete Component.prototype.flux;
    });
    beforeEach(() => navigation = new Navigation());

    describe('updateFields()', () => {
      it('should set fields', () => {
        const fields = ['a', 'b'];
        const set = navigation.set = spy();

        navigation.updateFields(<any>{ allIds: fields });

        expect(set.calledWith({ fields }));
      });
    });
  });
});
