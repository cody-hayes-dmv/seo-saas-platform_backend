import { createServer } from "./server";
const port = Number(process.env.PORT) || 4000;
const app = await createServer();
app.listen(port, () => {
  console.log(`[backend] http://localhost:${port}`);
});
