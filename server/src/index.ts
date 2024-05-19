import express from 'express';
import bodyParser from 'body-parser';

import { logRequest } from './prepareServer/logRequest';
import { setCors } from './prepareServer/cors';
import { routeNotFoundMiddleware } from './prepareServer/routeNotFound';
import { errorMiddleware } from './prepareServer/error';

import toDoRouter from './routes/toDoRoutes';
import { SERVER_IS_LISTENING } from './constants/messages';

const app = express();

app.use(bodyParser.json());
app.use(logRequest);
app.use(setCors);

app.use('/api/todo', toDoRouter);

routeNotFoundMiddleware(app);
errorMiddleware(app);

app.listen(5000, () => {
  console.log(SERVER_IS_LISTENING);
});
