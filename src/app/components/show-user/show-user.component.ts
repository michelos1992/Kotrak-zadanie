import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {

  private sub: any;
  user: User;
  public weatherSearchForm: FormGroup;
  public weatherData: any;

  constructor(private userService: UserService, private route: ActivatedRoute, 
    private location: Location, 
    private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        let id = params['id'];
        this.userService.getUser(id).subscribe(User => this.user = User);
    });
    this.ShowWeather();
  }

  ShowWeather() {
    this.userService.getWeather(this.user.city).subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);
    });
  }
}
