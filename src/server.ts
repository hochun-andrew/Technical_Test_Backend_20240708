import app from './app';

const port = process.env.POR || 8000;

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
