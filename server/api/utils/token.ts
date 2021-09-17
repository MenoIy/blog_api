import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const create = (payload: {}) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'THIS IS A SECRET', {
    expiresIn: '24h'
  });

  return token;
};

export default { create };
