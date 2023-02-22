import { Injectable } from '@angular/core';

import { Hero } from './interfaces/hero';
import { HEROES } from './interfaces/mock-heroes';
import { MessageService } from './message.service';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { 

  }

  getHeroes() : Observable<Hero[]> {
    const heroes = of(HEROES);
    //return heroes;
    return this.http.get<Hero[]>(this.heroesUrl)
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.log("fetched hero id "+ id);
    return of(hero);
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
