// import express from 'express'
// import handlebars from 'express-handlebars';
// import __dirname from './utils/handlebars.js';
// import {Server} from 'socket.io';
// import cookieParser from 'cookie-parser';

import mongoose from "mongoose";

import AppFactory from "../presentation/factories/appFactories.js";
import DbFactory from '../data/factories/dbFactory.js';
import dotenv from "dotenv";
dotenv.config();




const initServer = async() =>
{
  const db = DbFactory.create(process.env.DB);
  db.init(process.env.MONGO_DB_URI);

  const app = AppFactory.create();

  app.init();
  app.build();

  return {
    app,
    db
  }
};


export default initServer;

