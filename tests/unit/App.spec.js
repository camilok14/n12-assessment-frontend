import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import * as ridesService from '@/services/rides';

describe('components/App.vue', () => {
  const getWrapper = () =>
    shallowMount(App, {
      stubs: {
        'b-loading': { template: '</div>' },
        CreateRide: { template: '</div>' },
        'b-notification': { template: '</div>' },
        Rides: { template: '</div>' },
        Pagination: { template: '</div>' }
      }
    });
  it('should set error message if getRides throw error', async () => {
    jest.spyOn(ridesService, 'getRides').mockImplementation(async () => {
      throw new Error();
    });
    const wrapper = getWrapper();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.errorMessage).toBe('Ocurrió un error al tratar de obtener los viajes desde el servidor');
  });
  it('should get rides when component is mounted', async () => {
    jest.spyOn(ridesService, 'getRides').mockImplementation(async () => ({
      pagination: { numberOfDocuments: 10, pageNumber: 1, documentsPerPage: 10 },
      rides: []
    }));
    const wrapper = getWrapper();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.pagination.numberOfDocuments).toBe(10);
  });
  it('should mark row as clicked', async () => {
    jest.spyOn(ridesService, 'getRides').mockImplementation(async () => ({
      pagination: { numberOfDocuments: 2, pageNumber: 1, documentsPerPage: 10 },
      rides: [{ _id: 'id' }, { _id: 'id2', click: 'clicked' }]
    }));
    const wrapper = getWrapper();
    await wrapper.vm.$nextTick();
    wrapper.vm.rowClickHandler(0);
    const [ride1, ride2] = wrapper.vm.rides;
    expect(ride1._id).toBe('id Clicked');
    wrapper.vm.rowClickHandler(1);
    expect(ride2._id).toBe('id2');
  });
});
