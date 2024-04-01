import axios from 'axios';

const reservationCreateDtoMock = {
  startDate: '2024-03-04T00:00:00.000Z',
  endDate: '2024-03-14T00:00:00.000Z',
  placeId: 'place-id:123',
  invoiceId: 'invoice-id:123123',
};
const date2 = '2024-03-12T00:00:00.000Z';

describe('SPEC /reservations', () => {
  let newId: string;

  it('should not return a message to root', async () => {
    try {
      await axios.get(`/`);
    } catch (e) {
      expect(e.response.data).toEqual({
        error: 'Not Found',
        message: 'Cannot GET /',
        statusCode: 404,
      });
      expect(e.response.status).toBe(404);
    }
  });

  it('should create a reservation', async () => {
    const res = await axios.post(`/reservations`, reservationCreateDtoMock);

    expect(res.status).toBe(201);

    expect(Object.keys(res.data).sort()).toEqual([
      'endDate',
      'id',
      'invoiceId',
      'placeId',
      'startDate',
      'timestamp',
      'userId',
    ]);

    newId = res.data.id;
    expect(res.data.startDate).toEqual(reservationCreateDtoMock.startDate);
    expect(res.data.endDate).toEqual(reservationCreateDtoMock.endDate);
    expect(res.data.invoiceId).toEqual(reservationCreateDtoMock.invoiceId);
    expect(res.data.placeId).toEqual(reservationCreateDtoMock.placeId);
    expect(res.data.userId).toEqual('123');
  });

  it('should validate creation of reservation', async () => {
    try {
      await axios.post(`/reservations`, {
        ...reservationCreateDtoMock,
        startDate: 'bad',
      });
    } catch (e) {
      const { message } = e.response.data;
      expect(message.length).toBe(1);
      expect(message[0]).toBe('startDate must be a Date instance');
    }
  });

  it('should get all reservations', async () => {
    const res = await axios.get(`/reservations`);
    expect(Array.isArray(res.data)).toBe(true);

    const newInvoice = res.data.find((item) => item.id === newId);
    expect(newInvoice).toBeTruthy();
    expect(newInvoice.startDate).toEqual(reservationCreateDtoMock.startDate);
    expect(newInvoice.endDate).toEqual(reservationCreateDtoMock.endDate);
    expect(newInvoice.invoiceId).toEqual(reservationCreateDtoMock.invoiceId);
    expect(newInvoice.placeId).toEqual(reservationCreateDtoMock.placeId);
  });

  it('should get one reservation', async () => {
    const res = await axios.get(`/reservations/${newId}`);

    expect(res.data.id).toBe(newId);
    expect(res.data.startDate).toEqual(reservationCreateDtoMock.startDate);
    expect(res.data.endDate).toEqual(reservationCreateDtoMock.endDate);
    expect(res.data.invoiceId).toEqual(reservationCreateDtoMock.invoiceId);
    expect(res.data.placeId).toEqual(reservationCreateDtoMock.placeId);
  });

  it('should update one reservation', async () => {
    const res = await axios.patch(`/reservations/${newId}`, {
      startDate: date2,
    });
    expect(res.data.startDate).toBe(date2);
    const res2 = await axios.get(`/reservations/${newId}`);
    expect(res2.data.startDate).toBe(date2);
  });

  it('should delete one reservation', async () => {
    const res = await axios.delete(`/reservations/${newId}`);

    expect(res.data).toBe('');
    try {
      await axios.get(`/reservations/${newId}`);
    } catch (e) {
      expect(e.response.data.message).toBe('Entity not found');
    }
  });
});
