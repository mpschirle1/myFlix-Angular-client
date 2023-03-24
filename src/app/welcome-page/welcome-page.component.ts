import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  /**
   * Opens the new user registration dialog when 'Sign Up' button is clicked
   * @function openUserRegistrationDialog
   */

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent);
  }

  /**
   * Opens the user login dialog when 'Sign In' button is clicked
   * @function openUserLoginDialog
   */

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent);
  }
}
