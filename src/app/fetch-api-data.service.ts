import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// API URL that will provide data for the client app
const apiUrl = 'https://myflix-db-api.herokuapp.com/';

// Decorator - makes API service available throughout the application
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // Provides HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  /**
   * @service POST to the /users endpoint to register a new user
   * @param {any} userDetails
   * @returns JSON object containing newly registered user's details
   * @function userRegistration
   */

  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @service POST to the /login endpoint to login an existing user
   * @param {any} userDetails
   * @returns JSON object containing the user's details
   * @function userLogin
   */

  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @service GET from the /movies endpoint all movies
   * @returns Array containing all movie objects from the database
   * @function getAllMovies
   */

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service GET from the /users endpoint data on a single user
   * @returns JSON object containing all data for the requested user
   * @function getUser
   */

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service POST a movie ID to a users favorite movies array
   * @param {string} movieId
   * @returns JSON object containing the updated user data
   * @function addFavorite
   */

  addFavorite(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(
        apiUrl + 'users/' + username + '/movies/' + movieId,
        { FavoriteMovie: movieId },
        {
          headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service PUT to the users/username enpoint updated user details
   * @param {object} userUpdate
   * @returns JSON object containing updated user details
   * @function updateUser
   */

  updateUser(userUpdate: object = {}): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + 'users/' + username, userUpdate, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service DELETE a user from the users/username endpoint
   * @param {string} username
   * @returns Confirmation message of successful deletion, or error
   * @function deleteUser
   */

  deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
        responseType: 'text',
      })

      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @service DELETE a favorite movie from a user's favorite movies array
   * @param {string} movieId
   * @returns JSON object containing updated user info
   * @function removeFavorite
   */

  removeFavorite(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // Error handler
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
