import express from 'express';
import authRoute from './auth.route.js';
import usersRoute from './users.route.js';
import brandsRoute from './brand.route.js';
import productsRoute from './product.route.js';
import siteRoute from './site.route.js';
import transactionRoute from './transaction.route.js'
//import authRoute from './auth.route.js';  // Ensure the extension is included if you're using ES modules

const router = express.Router();

const routesIndex = [
    {
        path:'/auth',
        route: authRoute
    },
    {
        path:'/users',
        route: usersRoute 
    },
    {
        path:'/brands',
        route: brandsRoute 
    },
    {
        path:'/products',
        route: productsRoute 
    },
    {
        path:'/site',
        route: siteRoute 
    },
    {
        
            path:'/transaction',
            route:transactionRoute
    }
]

routesIndex.forEach((route)=>{
    router.use(route.path, route.route);
});


export default router;