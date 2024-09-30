import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import user_router from '../routes/users.routes.js';
import product_router from '../routes/product.routes.js';
import { swaggerSpec, swaggerUi } from '../../docs/swaggerConfig.js';
import swaggerJSDoc from 'swagger-jsdoc';
import {SwaggerUIBundle, SwaggerUIStandalonePreset} from 'swagger-ui-dist';
import order_router from '../routes/orders.routes.js';
import return_router from '../routes/returns.routes.js';
import refund_router from '../routes/refunds.routes.js';
import auth_router from '../routes/auth.routes.js';
import { SECRET_KEY } from '../../settings/config.js';

const app = express();

// Middleware setup
app.use(morgan('dev'));
app.use(express.json());

app.use(cookieParser());
app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 24 * 60 * 60 * 1000},
}));

app.use(cors({
    credentials: true,
    origin: ["https://jf36d5k0-4000.use2.devtunnels.ms", "http://localhost:5173", "https://blog-mario-salazar.netlify.app", "https://blog-mario-salazar-bq3gujeoi-mario-salazars-projects.vercel.app", "https://www.mssalazar.com", 'https://blog-mario-salazar.vercel.app'],
}));



// Static files and routes
app.use(express.static(path.join(process.cwd(), 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));


app.use('/api', user_router);
app.use('/api', product_router);
app.use('/api', order_router);
app.use("/api", return_router);
app.use("/api", refund_router);
app.use("/api", auth_router);

app.get('/', async (req, res) => {
    const domain = `http://${req.get('host')}/api/docs`;
    res.status(200).send(`<a href="${domain}" title="Link title">Go To API Rest</a>`);
});



//app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/docs", swaggerUi.serve, (req, res, next) => {
  const domain = `http://${req.get("host")}`;
  swaggerSpec.servers[0].url = domain;
  swaggerUi.setup(swaggerSpec)(req, res, next);
});

app.use((err, req, res, next) => {
    res.status(500).send('Something broke!');
});

export default app;
