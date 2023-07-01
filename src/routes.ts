import express, {Router, Response, Request} from 'express'
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { UpdateUserController } from './controllers/user/UpdateUserController';
import { CreateHaircutController } from './controllers/haircut/CreateHaircutController';
import { ListHaircutControler } from './controllers/haircut/ListHaircutController';
import { UpdateHaircutController } from './controllers/haircut/UpdateHaircutController';
import { CheckSubscriptionController } from './controllers/haircut/CheckSubscriptionController';
import { CountHaircutsController } from './controllers/haircut/CountHaircutsController';
import { DetailHaircutController } from './controllers/haircut/DetailHaircutController';
import { NewScheduleController } from './controllers/schedule/NewScheduleController';
import { ListScheduleController } from './controllers/schedule/ListScheduleController';
import { FinishScheduleController } from './controllers/schedule/FinishScheduleController';
import { SubscriptionController } from './controllers/subscriptions/SubscriptionController';
import { WebhooksController } from './controllers/subscriptions/WebhooksController';
import { CreatePortalController } from './controllers/subscriptions/CreatePortalController';

const router = Router();

// --Rotas User -- 
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)
router.put('/users', isAuthenticated, new UpdateUserController().handle)

// -- Rota Haircuts -- 
router.post("/haircut", isAuthenticated, new CreateHaircutController().handle)
router.get('/haircuts', isAuthenticated, new ListHaircutControler().handle)
router.put('/haircut', isAuthenticated, new UpdateHaircutController().handle)
router.get('/haircut/check', isAuthenticated, new CheckSubscriptionController().handle)
router.get('/haircuts/count', isAuthenticated, new CountHaircutsController().handle)
router.get('/haircuts/detail', isAuthenticated, new DetailHaircutController().handle)

// -- Rota schedule / Serviços -- 
router.post('/schedule', isAuthenticated, new NewScheduleController().handle)
router.get('/schedule', isAuthenticated, new ListScheduleController().handle)
router.delete('/schedule', isAuthenticated, new FinishScheduleController().handle)

// -- Rota pagamentos --
router.post('/subscribe', isAuthenticated, new SubscriptionController().handle)
router.post('/webhooks', express.raw({type: 'application/json'}), new WebhooksController().handle )
router.post('/create-portal', isAuthenticated, new CreatePortalController().handle)

export {router};