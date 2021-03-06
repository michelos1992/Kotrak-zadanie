import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  private sub: any;
  user: User;
  success = false;

  constructor(private userService: UserService, private route: ActivatedRoute, 
    private location: Location) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        let id = params['id'];
        this.userService.getUser(id).subscribe(User => this.user = User);
    });
  }

  goBack(): void {
    this.location.back();
  }
  SaveEdit(): void {
    this.userService.update(this.user);
  };
}
