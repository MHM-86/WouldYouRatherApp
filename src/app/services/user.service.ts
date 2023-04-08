import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _getUsers } from "../../utils/_DATA";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  async getUsers(): Promise<any> {
    return await _getUsers();
  }
}