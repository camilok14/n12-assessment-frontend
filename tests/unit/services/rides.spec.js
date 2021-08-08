import { getRides, createRide } from '@/services/rides';
import { httpClient } from '@/services/http-client';

describe('services/rides.js', () => {
  it('should get rides', async () => {
    jest.spyOn(httpClient, 'get').mockImplementation(async () => ({ data: 'rides' }));
    const result = await getRides(10, 1);
    expect(result).toBe('rides');
    expect(httpClient.get).toHaveBeenCalledWith('rides', { params: { documentsPerPage: 10, pageNumber: 1 } });
  });
  it('should create ride', async () => {
    jest.spyOn(httpClient, 'post').mockImplementation(async () => ({ data: 'ride' }));
    const result = await createRide(2, 'startTime', 500);
    expect(result).toBe('ride');
    expect(httpClient.post).toHaveBeenCalledWith('rides', { distance: 2, startTime: 'startTime', duration: 500 });
  });
});
