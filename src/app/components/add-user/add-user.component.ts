import { Component, OnInit, VERSION, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, UserService, AlertService } from 'src/app/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  
  addUserForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService: UserService,
      private alertService: AlertService
  ) {}

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.addUserForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.addUserForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.addUser(this.addUserForm.value)
    .pipe(first())
    .subscribe(
      data => {
        this.alertService.success('Registration user successful', true);
        this.router.navigate(['/']);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }

  checkboxes = [
    {
      "id": "uppercase",
      "label": "A-Z",
      "library": "ABCDEFGHIJKLMNOPWRSTUVWXYZ",
      "checked": true
    }, {
      "id": "numbers",
      "label": "0-9",
      "library": "0123456789",
      "checked": true
    }
  ]
  
  dictionary: Array<String>;

  uppercase: Boolean = this.checkboxes[0].checked;
  numbers: Boolean = this.checkboxes[1].checked;

  passwordLenght: Number = 6;
  newPassword: String;

  // Copy password to clipboard
  @ViewChildren('passwordOutput') password: ElementRef;
  private copyPassword() {
    const inputElement = <HTMLInputElement>this.password.nativeElement;
    inputElement.select();
    document.execCommand("copy");
  }

  // Generate password
  private generatePassword() {
    if (this.uppercase === false && this.numbers === false) {
      return this.newPassword = "...";
    }

    // Create array from chosen checkboxes
    this.dictionary = [].concat(
      this.uppercase ? this.checkboxes[0].library.split("") : [],
      this.numbers ? this.checkboxes[1].library.split("") : []
    );

    // Generate random password from array
    var newPassword = "";
    for (var i = 0; i < this.passwordLenght; i++) {
      newPassword += this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
    }
    this.newPassword = newPassword;

    // Call copy function
    setTimeout(() => this.copyPassword());

  }
}
