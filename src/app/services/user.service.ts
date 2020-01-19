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

    getById(id: number) {
        return this.http.get('api/users/' + id);
    }
    getUser(id: number): Observable<User> {
    return this.http.get<User>('api/users/' + id);
    }
    register(user: User) {
        return this.http.post('api/users/register', user);
    }
    
    update(user: User) {
        debugger;
        let uuu = localStorage.getItem('user');
        localStorage.setItem('user', JSON.stringify(user));
        // return this.http.put('api/users/', user, httpOptions);
    }
//   update(user: User) {
//     return this.http.put('api/users/' + user.id, user);
// }

    delete(id: number) {
        return this.http.delete('api/users/' + id);
    }
}
