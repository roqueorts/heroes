import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'heroes';
  private headers;
  public data: Heroe[] = [];
  public heroes: Heroe[] = [];
  public heroe: Heroe = {
    id: -1,
    name: "",
    age: -1,
    eyeColor: ""
  };

  constructor(private http: HttpClient) {

    this.headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });
    this.getHeroes().subscribe(res => {
      console.log('Estos son los datos:');
      console.log(res);
      this.heroes = res;
    });
    this.getHeroe().subscribe(res => {
      console.log('Este es el dato de id 2: ');
      console.log(res);
      this.heroe = res;
      //this.heroe = res;
    });
  }


  getHeroes() {
    /* Para usar con json-server. */
    return this.http.get<Heroe[]>('http://localhost:4200/mock/heroes', { headers: this.headers }).pipe(
      map(data => {
        return data;
      }), tap(_ => console.log('fetched heroes')),
      catchError(this.handleError<Heroe[]>('getheroes', []))
    );
  }

  getHeroe() {
    return this.http.get<Heroe>('http://localhost:4200/mock/heroes/1235', { headers: this.headers }).pipe(
      map(data => {
        return data;
      }), tap(_ => console.log('fetched heroe')),
      catchError(this.handleError<Heroe>('getUser'))
    );

  }

  addUser() {
    const heroe: Heroe = {
      id: 1238,
      name: "juan",
      age: 44,
      eyeColor: "green"
    };
    console.log('Usuario a añadir');
    this.http.post<any>('http://localhost:4200/mock/heroes', heroe, { headers: this.headers }).subscribe(
      data => {
        console.log('Usuario añadido ' + data.name);
        return data;
      },
      catchError(this.handleError<Heroe>('addUser'))
    );

    /* this.http.put<Heroe>(`http://localhost:3000/heroes/${heroe}`, { headers: this.headers }).pipe(
       map(data => {
         console.log('Usuario añadido');
         return data;
       }), tap(data => console.log('added heroe ' + data)),
       catchError(this.handleError<Heroe>('addUser'))
     );*/
    /**
     *  // Probamos el patch
   return this.http.patch<Heroe>('http://localhost:4200/mock/heroes/1235', { name: 'Nombre modificado' }).pipe(
     map(data => {
       return data;
     }), tap(data => console.log('Usuario modificado:', data)),
     catchError(this.handleError<Heroe>('patchUser'))
   );
     */
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

export interface Heroe {
  id: number;
  name: string;
  age: number;
  eyeColor: string;
}


