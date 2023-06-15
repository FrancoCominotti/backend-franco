import { exit } from 'shelljs';
import { program } from 'commander';
import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";
import AddUser from "./presentation/commander/addUser.js";

void (async() =>
{
  try
  {
    await mongoose.connect('mongodb+srv://francopisapia405:uPTbiSDQYTlKc3wm@codercluster.xlmgp1b.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    program.addCommand(AddUser);

    await program.parseAsync(process.argv);

    exit();
  }
  catch (error)
  {
      await console.log(error);
      exit();
  }
})();