import express, { Request, Response, NextFunction } from 'express';
import config from 'config';
import mongoose from 'mongoose';
import categoriesRouter from './routes/categories.routes';
import cardsRouter from './routes/cards.routes';
import authRouter from './routes/auth.routes';
import statsRouter from './routes/stats.routes';
import adminRouter from './routes/admin.routes';
import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

const swaggerOptions: Options = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'English for kids API',
      description: 'English for kids API description',
    },
    servers: ['http://localhost: 8080'],
  },
  apis: ['./routes/*.routes.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const allowCrossDomain = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(allowCrossDomain);
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/categories', categoriesRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/auth', authRouter);
app.use('/api/stats', statsRouter);
app.use('/api/admin', adminRouter);

const PORT = process.env.PORT || config.get('port') || 8080;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT);
  } catch {
    process.exit(1);
  }
}

start();
