import { User } from './../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'    
})
export class UserService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('api/users');
    }
    getUser(id: number): Observable<User> {
        return this.http.get<User>('api/users/' + id);
    }
    register(user: User) {
        return this.http.post('api/users/register', user);
    }
    update(user: User) {
        let uuu = localStorage.getItem('user');
        localStorage.setItem('uuu', JSON.stringify(user));
    }
    delete(id: number) {
        return this.http.delete('api/users/' + id);
    }
}
