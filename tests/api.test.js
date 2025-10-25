const request = require('supertest');
const app = require('../src/index');

describe('Agropilote API', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('service', 'Agropilote');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /', () => {
    it('should return welcome message', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Agropilote');
    });
  });

  describe('GET /api/fields', () => {
    it('should return fields endpoint', async () => {
      const response = await request(app)
        .get('/api/fields')
        .expect(200);

      expect(response.body).toHaveProperty('fields');
      expect(Array.isArray(response.body.fields)).toBe(true);
    });
  });

  describe('GET /api/crops', () => {
    it('should return crops endpoint', async () => {
      const response = await request(app)
        .get('/api/crops')
        .expect(200);

      expect(response.body).toHaveProperty('crops');
      expect(Array.isArray(response.body.crops)).toBe(true);
    });
  });

  describe('GET /nonexistent', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Not Found');
    });
  });
});
