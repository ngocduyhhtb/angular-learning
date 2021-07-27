import { Injectable } from '@angular/core';
import { Hero } from '../../hero';
import { HEROES } from '../../mock-heros';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessagesService } from '../messages/messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private heroesUrl: string = 'api/heroes';
  constructor(
    private http: HttpClient,
    private messageService: MessagesService
  ) {}

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }
  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('Fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }
  //Find Hero By ID
  public getHeroById(id: number): Observable<Hero> {
    const url: string = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  //Update Hero
  public updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`Updated Hero Id=${hero.id}`)),
      catchError(this.handleError<any>('Update Hero'))
    );
  }
  //Add Hero
  public addHero(hero: Hero): Observable<any> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Add Hero, Id: ${newHero.id}`)),
      catchError(this.handleError(`Failed Add Hero`))
    );
  }
  //Delete Hero
  public deleteHero(id: number): Observable<any> {
    const deleteHeroUrl = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(deleteHeroUrl, this.httpOptions).pipe(
      tap((_) => this.log(`Deleted Hero, Id: ${id}`)),
      catchError(this.handleError<Hero>('Delete Hero Failed'))
    );
  }
  //Handle Error
  public handleError<T>(operation = 'operation ', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  public searchHero(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`Found Heroes Matching "${term}"`)
          : this.log(`No Heroes Matching "${term}"`)
      ),
      catchError(this.handleError<Hero[]>('Search Hero', []))
    );
  }
}
