import SessionManager from "../managers/sessionManager.js";




export const login = async  (req, res) =>
{
    const { email, password } = req.body;

    if (!email && !password)
    {
        throw new Error('Email and Password invalid format.');
    }

    const manager = new  SessionManager();
    const user = await manager.getOneByEmail(email);
    const isHashedPassword =isValidPassword(password, user.password);


    console.log(isHashedPassword)
    if (!isHashedPassword)
    {
        return res.status(401).send({ message: 'Login failed, invalid password.'})
    }

    const accessToken = await generateToken(user);

    res.cookie('accessToken', accessToken, {
      maxAge: 60*60*1000,
      httpOnly: true
  }).send({ message: 'Login success!', accessToken })
};

//     res.send({ accessToken, message: 'Login success!' });
// };

export const current = async  (req, res) =>
{
  res.status(200).send({ status: 'Success', payload: req.user });
};

export const signup = async (req, res, next) =>
{
  try
  {
    const manager = new SessionManager();
    const user = await manager.signup(req.body);

    res.status(201).send({ status: 'success', user, message: 'User created.' });
  }
  catch (e)
  {
		next(e);
	}
};
