import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { Weather } from 'src/app/models/weather';
import { UserService } from 'src/app/services';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {

  private sub: any;
  user: User;
  weathers: Weather[] = [];

  constructor(private userService: UserService, private route: ActivatedRoute, 
    private location: Location) { }

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
        let id = params['id'];
        this.userService.getUser(id).subscribe(User => this.user = User);
    });
    this.showWeather();
  }

  private showWeather() {
    this.userService.getWeather().pipe(first()).subscribe(weathers => {
        this.weathers = weathers;
    });
  }

}
