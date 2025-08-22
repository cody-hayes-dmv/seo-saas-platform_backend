import { createServer } from "./server";
const port = Number(process.env.PORT) || 4000;
const app = await createServer();
app.listen(port, () => {
  console.log(`[backend] http://localhost:${port}`);
  console.log(`[backend] Swagger: http://localhost:${port}/api/docs`);
});
