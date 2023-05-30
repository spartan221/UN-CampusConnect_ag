import KoaRouter from 'koa-router';
import { generalRequest } from '../utilities';
import { AUTH_MS_URL as url, AUTH_MS_PORT as port } from '../server';
import { entryPoint } from '../un-campusconnect/authentication/user-services/entryPoint';

const URL = `http://${url}:${port}/${entryPoint}`;

const router = new KoaRouter({
    prefix: '/emails'
});

router.get('/', async (context, next) => {
    try {
        const users = await generalRequest({ url:`${URL}/emails`, method:'GET' })
        context.body = users;
        next();
    } catch (err) {
        context.throw(err.message, err.status);
    }
}
);

export default router;
