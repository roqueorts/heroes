import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialog
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, startWith, switchMap } from 'rxjs';
import { Heroe } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
//
//MatTableModule, MatPaginatorModule
@Component({
  selector: 'app-heroes-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, DecimalPipe, AsyncPipe, ReactiveFormsModule, NgbHighlight, NgbPaginationModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule],
  providers: [DecimalPipe],
  templateUrl: './heroes-page.component.html',
  styleUrl: './heroes-page.component.scss'
})
export class HeroesPageComponent implements OnInit, OnDestroy {

  public data: Heroe[] = [];
  public heroes: Heroe[] = [];
  public heroe: Heroe = {
    id: -1,
    name: "",
    age: -1,
    eyeColor: ""
  };
  page = 1;
  pageSize = 2;
  public loading = true;
  filter = new FormControl('', { nonNullable: true });
  heroesFiltrados$: Subscription = new Subscription();


  displayedColumns: string[] = ['id', 'name', 'age', 'color', 'options'];
  public dataSource = new MatTableDataSource<Heroe>([]);

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);


  constructor(
    private heroesService: HeroesService,
    public dialog: MatDialog
  ) {
    // this.filter.valueChanges.subscribe((text) => this.search(text));
    this.heroesFiltrados$ =
      this.filter.valueChanges
        .pipe(
          startWith(''),
          switchMap(text => {
            console.log(text);

            return this.heroesService.getHeroes(text);
          })
        ).subscribe(heroesFiltrados => {
          console.log(heroesFiltrados);
          this.heroes = heroesFiltrados;
          this.loading = false;
          this.dataSource = new MatTableDataSource<Heroe>(heroesFiltrados);
          this.dataSource.paginator = this.paginator;
        });
    //this.getHeroes();
  }

  ngOnInit() {

    this.getHeroe();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getHeroes() {
    /* Para usar con json-server. */
    this.heroesService.getHeroes().subscribe(res => {
      console.log('Estos son los heroes:');
      console.log(res);
      setTimeout(() => {
        this.heroes = res;
        this.dataSource = new MatTableDataSource<Heroe>(res);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      }, 1000);

    });
  }

  search(text: string) {
    this.heroesService.getHeroes(text).subscribe(res => {
      console.log('Estos son los heroes:');
      console.log(res);
      setTimeout(() => {
        this.heroes = res;
        this.dataSource = new MatTableDataSource<Heroe>(res);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      }, 1000);

    });

  }

  getHeroe() {
    this.heroesService.getHeroeById(1236).subscribe(res => {
      console.log('Este es el heroe:');
      console.log(res);
      this.heroe = res;

    });

  }



  delete(heroeId: number) {
    this.heroesService.deleteHeroe(heroeId).subscribe(result => {
      /*if (result) {
        console.error(result);
      } else {
        // todo bien
        delete this.productos[heroeId];
      }*/
      console.log(result);
    });
  }

  /*openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
     this.dialog.open(DialogAnimationsExampleDialog, {
       width: '250px',
       enterAnimationDuration,
       exitAnimationDuration,
     });
   }*/


  ngOnDestroy(): void {


  }


}


