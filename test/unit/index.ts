import * as pkg from '../../src';
import Navigation from '../../src/navigation';
import NavigationList from '../../src/navigation-list';
import RangeRefinemnetControls from '../../src/range-refinement-controls';
import Refinement from '../../src/refinement';
import RefinementList from '../../src/refinement-list';
import suite from './_suite';
import ValueRefinementControls from '../../src/value-refinement-controls';

suite('package', ({ expect }) => {
  it('should expose Navigation', () => {
    expect(pkg.Navigation).to.eq(Navigation);
  });

  it('should expose NavigationList', () => {
    expect(pkg.NavigationList).to.eq(NavigationList);
  });

  it('should expose RangeValueRefinement', () => {
    expect(pkg.RangeRefinemnetControls).to.eq(RangeRefinemnetControls);
  });

  it('should expose Refinement', () => {
    expect(pkg.Refinement).to.eq(Refinement);
  });

  it('should expose RefinementList', () => {
    expect(pkg.RefinementList).to.eq(RefinementList);
  });

  it('should expose ValueRefinementControls', () => {
    expect(pkg.ValueRefinementControls).to.eq(ValueRefinementControls);
  });
});
