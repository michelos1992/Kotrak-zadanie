import { User } from './../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { getLocaleDateTimeFormat } from '@angular/common';

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
    addUser(user: User) {
        return this.http.post('api/users/register', user);
    }
    update(user: User) {
        let uuu = JSON.parse(localStorage.getItem('users'));
        let uu1 = uuu.filter(e => e.id != user.id);
        uu1.push(user);
        localStorage.setItem('users', JSON.stringify(uu1));
    }
    delete(id: number) {
        return this.http.delete('api/users/' + id);
    }
        
    getWeather(location) {
        return this.http.get(
        "http://api.weatherstack.com/current?access_key=d26c22f6a15080b6cc86847917174e85&&query=Berlin"
        );
    }
}
