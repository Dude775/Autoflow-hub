import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { initDatabase } from './database/db';
import workflowsRouter from './routes/workflows';

const app: Express = express();
const PORT = 3001;

// CORS - אפשר גישה מ-frontend (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware לטיפול ב-JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// חיבור ל-routes
app.use('/api', workflowsRouter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'AutoFlow Hub API is running' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// אתחול הדאטהבייס והרצת השרת
async function startServer() {
  try {
    // אתחול חיבור לדאטהבייס
    await initDatabase();
    console.log('✅ Database connection established');

    // הפעלת השרת
    app.listen(PORT, () => {
      console.log(`🚀 AutoFlow Hub API running on http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🔗 API endpoints: http://localhost:${PORT}/api/workflows`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();