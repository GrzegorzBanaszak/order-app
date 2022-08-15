import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signin() {
    return { mgs: 'singin' };
  }
  signup() {
    return { mgs: 'singup' };
  }
}
