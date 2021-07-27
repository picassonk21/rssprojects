import { Router, Request, Response } from 'express';
import { compare } from 'bcryptjs';
import config from 'config';
import jwt from 'jsonwebtoken';
import { UserType } from '../types/types';
import User from '../models/User';

const router = Router();

router.post('/login',
  async (req: Request, res: Response) => {
    try {
      const userData: UserType = req.body;
      const { email, password } = userData;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const isRightPassword = await compare(password, user.password);
      if (!isRightPassword) {
        return res.status(401).json({ message: 'Wrong password' });
      }
      const token = jwt.sign({ id: user._id }, config.get('jwtSecret'), { expiresIn: '1h' });
      return res.status(200).json({ token });
    } catch (e) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  });

export default router;
