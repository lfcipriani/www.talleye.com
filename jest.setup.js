import next from 'next';
const app = next({ dev: true });

afterAll(async (done) => {
  app.close();
  done();
});