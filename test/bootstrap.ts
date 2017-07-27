import * as chai from 'chai';
import * as mock from 'mock-require';
import * as sinonChai from 'sinon-chai';

chai.use(sinonChai);

mock('../src/navigation/index.html', {});
mock('../src/navigation-list/index.html', {});
mock('../src/range-refinement-controls/index.html', {});
mock('../src/refinement/index.html', {});
mock('../src/refinement-list/index.html', {});
mock('../src/value-refinement-controls/index.html', {});
