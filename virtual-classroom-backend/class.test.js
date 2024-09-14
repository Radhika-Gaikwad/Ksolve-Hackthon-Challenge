const request = require('supertest');
const app = require('../app'); // Assuming `app.js` is the Express app entry file

describe('Class API Endpoints', () => {
  it('should create a new class', async () => {
    const response = await request(app)
      .post('/api/class/create')
      .send({
        title: 'Sample Class',
        units: [{ title: 'Unit 1', sessions: [{ title: 'Session 1' }] }]
      })
      .set('Authorization', 'Bearer token-for-admin');

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Class created successfully');
  });
});
