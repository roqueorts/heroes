import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Heroe } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'http://localhost:4200/mock';
  private headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });

  constructor(private http: HttpClient) { }

  /**
   * Get a list of heroes
   * @param {string} text some filter
   * @returns {Heroe[]} list of heroes
   */

  getHeroes(text: string = ''): Observable<Heroe[]> {
    // Aquí pasaría el filtro
    return this.http.get<Heroe[]>(`${this.url}/heroes`, { headers: this.headers }).pipe(
      map(heroes => {
        return heroes.filter((heroe) => {
          const term = text.toLowerCase();
          return (
            heroe.name.toLowerCase().includes(term)
          );
        });
      }),
      tap(_ => console.log('fetched heroes')),
      catchError(this.handleError<Heroe[]>('getheroes', []))
    );
  }

  getHeroeById(id: number) {
    return this.http.get<Heroe>(`${this.url}/heroes/${id}`, { headers: this.headers }).pipe(
      map(data => {
        return data;
      }),
      tap(_ => console.log('fetched heroe')),
      catchError(this.handleError<Heroe>('getheroe'))
    );
  }

  addHeroe(heroe: Heroe) {
    /* const observerHeroe: Observer<Heroe> = {
       next: data => {
         console.log('Heroe añadido ' + data.name);
         return data;
       },
       error: catchError(this.handleError<Heroe>('addHeroe')),
       complete: () => {
         console.log('completado');
       }
     };*/
    console.log('Heroe a añadir');
    console.log(heroe);
    // this.http.post<Heroe>('http://localhost:4200/mock/heroes', heroe, { headers: this.headers }).subscribe(observerHeroe);
    return this.http.post<Heroe>('http://localhost:4200/mock/heroes', heroe, { headers: this.headers }).pipe(
      map(data => {
        console.log('Héroe añadido');
        return data;
      }), tap(data => console.log('added heroe ' + data)),
      catchError(this.handleError<Heroe>('addHeroe'))
    );
  }

  editHeroe(heroe: Heroe) {
    console.log('Heroe a editar');
    console.log(heroe);
    return this.http.put<Heroe>(`http://localhost:4200/mock/heroes/${heroe.id}`, heroe, { headers: this.headers }).pipe(
      map(data => {
        console.log('Heroe modificado');
        return data;
      }), tap(data => console.log('edited heroe ' + data)),
      catchError(this.handleError<Heroe>('editHeroe'))
    );
    /**
    // Probamos el patch
   return this.http.patch<Heroe>('http://localhost:4200/mock/heroes/1235', { name: 'Nombre modificado' }).pipe(
     map(data => {
       return data;
     }), tap(data => console.log('Usuario modificado:', data)),
     catchError(this.handleError<Heroe>('patchUser'))
   );
     */
  }

  deleteHeroe(heroeId: number) {
    console.log('Heroe a editar');
    console.log(heroeId);
    return this.http.delete<Heroe>(`http://localhost:4200/mock/heroes/${heroeId}`, { headers: this.headers }).pipe(
      map(data => {
        console.log('Heroe eliminado');
        return data;
      }), tap(data => console.log('deleted heroe ', data)),
      catchError(this.handleError<Heroe>('deleteHeroe'))
    );

  }


  /**
   * Manejo de error Http.
   * Dejamos que la app continúe ejecutándose.
   * @param operation - nombre de la operación que ha fallado
   * @param result - valor opcional a devolver, como observable  
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: enviar el error a una infraestructura de logs remoto
      console.error(error); // log a consola

      // TODO: crear un modal de error
      console.error(`${operation} failed: ${error.message}`);

      // Dejamos que la app continúe ejecutándose devolviendo un resultado vacío.
      return of(result as T);
    };
  }


}

