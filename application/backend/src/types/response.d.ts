import { User as PrismaUser } from '@prisma/client';
export interface TokenResponse {
  token: string;
  expires: Date;
}

export interface AuthTokensResponse {
  access: TokenResponse;
  refresh?: TokenResponse;
}

export declare global {
  namespace Express {
    interface User extends PrismaUser {}
  }
}

export interface SessionUser {
  id: number;
  email: string;
  name?: string | null;
  // Add other necessary fields but make non-essential fields optional
  password?: string;
  role?: Role;
  isEmailVerified?: boolean;
  // other fields can be optional
}

export type PartialUser = {
  id: number;
  email: string;
  name: string | null;
};