import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * API call through fetchApiDataService to login a user
   * @function loginUser
   */

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        localStorage.setItem('user', response.user.Username);
        localStorage.setItem('token', response.token);
        this.dialogRef.close(); // Closes the modal on success
        console.log(response);
        this.snackBar.open(
          response.user.Username + ' signed in successfully.',
          'OK',
          {
            duration: 4000,
          }
        );
        this.router.navigate(['movies']);
      },
      (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
