import * as pkg from '../../src';
import Navigation from '../../src/navigation';
import NavigationDisplay from '../../src/navigation-display';
import NavigationList from '../../src/navigation-list';
import Refinement from '../../src/refinement';
import RangeRefinementControls from '../../src/refinement-controls/range-refinement-controls';
import ValueRefinementControls from '../../src/refinement-controls/value-refinement-controls';
import RefinementList from '../../src/refinement-list';
import suite from './_suite';

suite('package', ({ expect }) => {
  it('should expose Navigation', () => {
    expect(pkg.Navigation).to.eq(Navigation);
  });

  it('should expose NavigationDisplay', () => {
    expect(pkg.NavigationDisplay).to.eq(NavigationDisplay);
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
