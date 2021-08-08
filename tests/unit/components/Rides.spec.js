import { shallowMount } from '@vue/test-utils';
import Rides from '@/components/Rides.vue';

describe('components/Rides.vue', () => {
  const getWrapper = () =>
    shallowMount(Rides, {
      propsData: { rides: [{ duration: 300 }] },
      stubs: { 'b-table': { template: '</div>' } },
      mocks: { $buefy: { dialog: { alert() {} } } }
    });
  it('should get danger class when distance is more than 2', () => {
    const wrapper = getWrapper();
    const result = wrapper.vm.getRowClass({ distance: 3 });
    expect(result).toBe('has-background-danger has-text-danger-light');
  });
  it('should not get row class when distance is not more than 2', () => {
    const wrapper = getWrapper();
    const result = wrapper.vm.getRowClass({ distance: 1 });
    expect(result).toBe(false);
  });
  it('should emit event when cell is clicked', () => {
    const wrapper = getWrapper();
    wrapper.vm.cellClickHandler(undefined, undefined, 0);
    expect(wrapper.emitted()).toMatchObject({ 'row-click': [[0]] });
  });
});
