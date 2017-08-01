import { bootstrap } from '@storefront/testing';
import * as chai from 'chai';

bootstrap(chai, __dirname, [
  '../src/filtered-refinement-list/index.html',
  '../src/navigation/index.html',
  '../src/navigation-list/index.html',
  '../src/range-refinement-controls/index.html',
  '../src/refinement/index.html',
  '../src/refinement-list/index.html',
  '../src/value-refinement-controls/index.html'
]);
