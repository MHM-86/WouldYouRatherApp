
import { Injectable } from '@angular/core';
import { _getUsers } from "../../utils/_DATA";

@Injectable()
export class UserService {
  constructor() { }

  async getUsers(): Promise<any> {
    return await _getUsers();
  }

}