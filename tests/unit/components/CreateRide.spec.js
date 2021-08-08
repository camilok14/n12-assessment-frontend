import { shallowMount } from '@vue/test-utils';
import CreateRide from '@/components/CreateRide.vue';
import * as ridesService from '@/services/rides';

describe('components/Rides.vue', () => {
  const getWrapper = () =>
    shallowMount(CreateRide, {
      stubs: {
        'b-field': { template: '</div>' },
        'b-notification': { template: '</div>' },
        'b-button': { template: '</div>' }
      }
    });
  it('should set error message if createRide throws error', async () => {
    jest.spyOn(ridesService, 'createRide').mockImplementation(async () => {
      throw new Error();
    });
    const wrapper = getWrapper();
    await wrapper.vm.sendDataToBackend();
    expect(wrapper.vm.errorMessage).toBe('Ocurrió un error al tratar de registrar el viaje');
  });
  it('should emit event after creating ride', async () => {
    jest.spyOn(ridesService, 'createRide').mockImplementation(async () => {});
    const wrapper = getWrapper();
    await wrapper.vm.sendDataToBackend();
    expect(wrapper.emitted()).toMatchObject({ created: [[]] });
  });
});
