import express from 'express'
import uploader from '../utils/multer.js'
import { login, current, signup } from "../controllers/sessionController.js";
import auth from "../middlewares/auth.js"


const app = express();
const routerSessions = express.Router(); 
app.use(express.urlencoded({extended:true}));



//*****Endpoints ******/
;

routerSessions.post('/login', login);
routerSessions.get('/current', auth, current);
routerSessions.post('/signup', signup);

export default routerSessions;