import { Component } from '@storefront/core';
import Refinement from '../../src/refinement';
import suite from './_suite';

suite('Refinement', ({ expect, spy, stub }) => {

  describe('constructor()', () => {
    afterEach(() => {
      delete Component.prototype.expose;
      delete Refinement.prototype.refinement;
    });

    it('should call expose', () => {
      const expose = Component.prototype.expose = spy();
      const refinement = Refinement.prototype.refinement = <any>{ a: 'b' };

      new Refinement();

      expect(expose.calledWith('refinement', refinement));
    });
  });
});
