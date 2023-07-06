import express from 'express';
import cookieParser from "cookie-parser";


import productsRouter from '../routes/products.js'
import cartsRouter from '../routes/carts.js';
import userRouter from '../routes/userRouter.js';
import roleRouter from '../routes//roleRouter.js';
import routerSessions from '../routes/sessions.js';

import errorHandler from '../middlewares/errorHandler.js';

class AppExpress
{
    init()
    {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cookieParser());
    }

    build()
    {
        this.app.use('/api/products', productsRouter);
        this.app.use('/api/carts', cartsRouter);
        this.app.use('/api/sessions', routerSessions);
        this.app.use('/api/user',userRouter);
        this.app.use('/api/roles',roleRouter)
        this.app.use(errorHandler)
    }

    callback()
    {
        return this.app;
    }

    close()
    {
        this.server.close();
    }

    listen()
    {
        {
            return this.app.listen(process.env.NODE_PORT, () => {
              console.log(`Server listening on port ${process.env.NODE_PORT}`);
            });
          }
    }
}

export default AppExpress;