import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: any = {};
  movies: any[] = [];
  favoriteMovies: any[] = [];
  noFavorites: string = '';

  @Input() userUpdate = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.filterFavorites();
  }

  /**
   * API call through fetchApiData service to get user data
   * @returns User object (Username, Password, Email, Birthday, Favorites)
   * @function getUser
   */

  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = {
        ...response,
        Birthday: this.formatBirthday(response.Birthday),
      };
      return this.user;
    });
  }

  // Properly formats date for user birthday
  formatBirthday(birthday: string) {
    let date = new Date(birthday);
    return `${
      date.getMonth() + 1
    }/${date.getUTCDate()}/${date.getUTCFullYear()}`;
  }

  /**
   * API call through fetchApiData service to update user data
   * @function updateUser
   */

  updateUser(): void {
    this.fetchApiData.updateUser(this.userUpdate).subscribe(
      (response) => {
        localStorage.setItem('user', response.Username);
        window.location.reload();
        this.snackBar.open(response.Username + ' updated successfully.', 'OK', {
          duration: 4000,
        });
      },
      (response) => {
        this.snackBar.open(response.errors[0].msg, 'OK', {
          duration: 4000,
        });
      }
    );
  }

  /**
   * API call through fetchApiData service to delete a user
   * @param {string} username
   * @function deleteUser
   */

  deleteUser(username: string): void {
    if (
      confirm(
        'Warning! This will permanantly delete your account. Do you wish to proceed?'
      )
    ) {
      this.router.navigate(['welcome']).then(() => {
        localStorage.clear();
        this.snackBar.open('Your account has been deleted.', 'OK', {
          duration: 4000,
        });
      });
    }
    this.fetchApiData.deleteUser(username).subscribe((response: any) => {
      console.log(response);
    });
  }

  /**
   * Filter through all movies to find user favorites
   * @returns Array containing user's favorite movies
   * @function filterFavorites
   */

  filterFavorites(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = { ...response };
      let favorites = this.user.FavoriteMovies;

      this.fetchApiData.getAllMovies().subscribe((response: any) => {
        this.movies = response;
        let allMovies = this.movies;

        this.favoriteMovies = allMovies.filter((movie) =>
          favorites.includes(movie._id)
        );
        this.favoriteMovies.length !== 0
          ? (this.noFavorites = '')
          : (this.noFavorites = 'You have not added any favorite movies yet!');
        return this.favoriteMovies;
      });
    });
  }
}
