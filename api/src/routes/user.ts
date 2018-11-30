import * as express from 'express';
import * as bcrypt from 'bcrypt';

import { User } from '../entity/User';
const router = express.Router();

router.use(function(req, res, next) {
  //validate user post request
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(404).send({ success: false });
      return;
    } else if (email.length < 3 || password.length < 3) {
      res.status(422).send({ success: false });
      return;
    }
  }
  next();
});

// define the home page route
router.get('/', async function(req, res) {
  if (!req.session || !req.session!.userId) {
    res.status(500).send({ success: false });
    return;
  }
  const user = await User.findOne(req.session!.userId);
  if (!user) {
    res.status(401).send({ success: false });
    return;
  }
  res.status(200).send({
    success: true,
    data: [
      {
        id: user.id,
        email: user.email,
      },
    ],
  });
});

// define create user route
router.post('/', async function(req, res) {
  const { email, password } = req.body as { email: string; password: string };

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ email, password: hashedPassword }).save();
  res
    .status(201)
    .send({ success: true, data: [{ id: user.id, email: user.email }] });
});
// define login route
router.post('/login', async function(req, res) {
  const { email, password } = req.body as { email: string; password: string };

  if (!req.session) {
    res.status(500).send({ success: false });
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).send({ success: false });
    return;
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (passwordCompare === false) {
    res.status(401).send({ success: false });
    return;
  }
  req.session!.userId = user.id;
  res.status(200).send({
    success: true,
    data: [
      {
        id: user.id,
        email: user.email,
      },
    ],
  });
});

export default router;
