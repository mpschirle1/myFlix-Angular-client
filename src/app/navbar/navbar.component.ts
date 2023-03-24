import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  username: any = localStorage.getItem('user');

  constructor(public router: Router) {}

  /**
   * Logs out user, returns to welcome page, clears local storage
   * @function logout
   */

  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
