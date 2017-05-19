import * as storefront from '@storefront/core';
import * as mock from 'mock-require';
import * as sinon from 'sinon';

sinon.stub(storefront, 'view');

mock('../src/navigation/index.html', {});
mock('../src/navigation-display/index.html', {});
mock('../src/navigation-list/index.html', {});
mock('../src/refinement/index.html', {});
mock('../src/refinement-list/index.html', {});
