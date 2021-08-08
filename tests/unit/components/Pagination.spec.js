import { shallowMount } from '@vue/test-utils';
import Pagination from '@/components/Pagination.vue';

describe('components/Pagination.vue', () => {
  const getWrapper = () =>
    shallowMount(Pagination, {
      propsData: { documentsPerPage: 10, numberOfDocuments: 300, pageNumber: 1 },
      stubs: {
        'b-field': { template: '</div>' }
      }
    });
  it('should use props to set data', () => {
    const wrapper = getWrapper();
    expect(wrapper.vm.pNumber).toBe(1);
    expect(wrapper.vm.docsPerPage).toBe(10);
  });
});
