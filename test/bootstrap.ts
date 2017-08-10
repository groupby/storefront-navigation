import { bootstrap } from '@storefront/testing';
import * as chai from 'chai';

bootstrap(chai, __dirname, [
  '../src/navigation/index.html',
  '../src/navigation-display/index.html',
  '../src/navigation-header/index.css',
  '../src/navigation-header/index.html',
  '../src/navigation-list/index.html',
  '../src/range-refinement-controls/index.html',
  '../src/refinement/index.html',
  '../src/refinement-list/index.html',
  '../src/value-refinement-controls/index.html'
]);
