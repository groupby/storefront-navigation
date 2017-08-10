import * as pkg from '../../src';
import FilterRefinementControls from '../../src/filter-refinement-controls/';
import FilteredRefinementList from '../../src/filtered-refinement-list';
import Navigation from '../../src/navigation';
import NavigationList from '../../src/navigation-list';
import RangeRefinementControls from '../../src/range-refinement-controls';
import Refinement from '../../src/refinement';
import RefinementList from '../../src/refinement-list';
import ValueRefinementControls from '../../src/value-refinement-controls';
import suite from './_suite';

suite('package', ({ expect }) => {
  it('should expose FilterRefinementControls', () => {
    expect(pkg.FilterRefinementControls).to.eq(FilterRefinementControls);
  });

  it('should expose FilteredRefinementList', () => {
    expect(pkg.FilteredRefinementList).to.eq(FilteredRefinementList);
  });

  it('should expose Navigation', () => {
    expect(pkg.Navigation).to.eq(Navigation);
  });

  it('should expose NavigationList', () => {
    expect(pkg.NavigationList).to.eq(NavigationList);
  });

  it('should expose RangeRefinementControls', () => {
    expect(pkg.RangeRefinementControls).to.eq(RangeRefinementControls);
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
