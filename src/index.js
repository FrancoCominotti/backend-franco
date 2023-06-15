// import express from 'express'
// import handlebars from 'express-handlebars';
// import __dirname from './utils/handlebars.js';
// import {Server} from 'socket.io';
// import cookieParser from 'cookie-parser';

import mongoose from "mongoose";

import AppFactory from "./presentation/factories/appFactories.js";

import dotenv from "dotenv";
dotenv.config();



void (async() =>
{
  await mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const app = AppFactory.create();

  app.init();
  app.build();
  app.listen();
})();


