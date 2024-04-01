import axios from 'axios';

const userCreateDtoMock = {
  email: 'test@test.com',
  password: 'randomstring123T!estable',
};

describe('spec /users', () => {
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
    const res = await axios.post(`/users`, userCreateDtoMock);

    expect(res.status).toBe(201);

    console.log(res);
    expect(Object.keys(res.data).sort()).toEqual(['_id', 'email', 'password']);

    expect(res.data.email).toEqual(userCreateDtoMock.email);
    expect(res.data.password).toEqual(userCreateDtoMock.password);
  });
});
