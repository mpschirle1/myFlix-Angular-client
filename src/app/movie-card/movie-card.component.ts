import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * API call through fetchApiData service to get all movies
   * @returns Array containing all movies
   * @function getMovies
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      return this.movies;
    });
  }

  /**
   * API call through fetchApiData service to get user's favorites
   * @returns Array containing user's favorites (by movie ID)
   * @function getFavorites
   */

  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.favorites = response.FavoriteMovies;
      return this.favorites;
    });
  }

  /**
   * Logic for toggle favorite button. Makes API calls through fetchApiData
   * service to post/delete to/from user's favorite movies
   * @param {string} movieId
   * @param {string} title
   * @returns Updated user favorites list
   * @function toggleFavorite
   */

  toggleFavorite(movieId: string, title: string): void {
    if (!this.favorites.includes(movieId)) {
      this.fetchApiData.addFavorite(movieId).subscribe((response: any) => {
        this.favorites = response.FavoriteMovies;
        this.snackBar.open(title + ' has been added to your favorites.', 'OK', {
          duration: 4000,
        });
      });
    } else {
      this.fetchApiData.removeFavorite(movieId).subscribe((response: any) => {
        this.favorites = response.FavoriteMovies;
        this.snackBar.open(
          title + ' has been removed from your favorites.',
          'OK',
          {
            duration: 4000,
          }
        );
      });
    }
  }

  /**
   * Opens the Genre Info dialog when user clicks on the genre name
   * @param {string} name
   * @param {string} description
   * @function openGenreDialog
   */

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
    });
  }

  /**
   * Opens the Director Info dialog when user clicks on the director's name
   * @param {string} name
   * @param {string} description
   * @function openDirectorDialog
   */

  openDirectorDialog(
    name: string,
    birth: string,
    death: string,
    bio: string
  ): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Birth: birth,
        Death: death,
        Bio: bio,
      },
    });
  }

  /**
   * Opens the movie synopsis dialog when the user clicks the synopsis button
   * @param {string} title
   * @param {string} releaseYear
   * @param {string} rating
   * @param {string} description
   * @param {string} actors
   * @function openSynopsisDialog
   */

  openSynopsisDialog(
    title: string,
    releaseYear: string,
    rating: string,
    description: string,
    actors: string
  ): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        ReleaseYear: releaseYear,
        Rating: rating,
        Description: description,
        Actors: actors,
      },
    });
  }
}
