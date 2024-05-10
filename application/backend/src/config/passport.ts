import prisma from '../client';
import { Strategy as JwtStrategy, ExtractJwt, VerifyCallback } from 'passport-jwt';
import config from './config';
import { TokenType, User } from '@prisma/client';

interface SessionUser {
  id: number;
  email: string;
  name: string | null;
}

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtVerify: VerifyCallback = async (payload, done) => {
  try {
    if (payload.type !== TokenType.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        name: true
      },
      where: { id: payload.sub }
    });
    if (!user) {
      return done(null, false);
    }
    const sessionUser: SessionUser = {
      id: user.id,
      email: user.email,
      name: user.name
    };
    done(null, sessionUser as any); // Cast to `any` to bypass the type checking
  } catch (error) {
    done(error, false);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);