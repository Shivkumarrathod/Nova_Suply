import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

//Routers
import healthCheckRouter from "./routes/healthCheckRoute.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());

app.use('/api', healthCheckRouter);

app.use(express.static(path.join(__dirname, "client/dist")));

app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});