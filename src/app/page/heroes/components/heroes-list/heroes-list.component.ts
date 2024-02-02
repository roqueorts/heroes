import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject, concatAll, map, of, startWith, switchMap, takeUntil } from 'rxjs';
import { DialogAlertComponent } from '../../../../shared/components/dialog-alert/dialog-alert.component';
import { Heroe } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, DecimalPipe, AsyncPipe, ReactiveFormsModule, NgbHighlight, NgbPaginationModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule,],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss'
})
export class HeroesListComponent implements OnInit, OnDestroy {
  heroe: Heroe = new Heroe();
  page = 1;
  pageSize = 2;
  loading = true;
  filter = new FormControl('', { nonNullable: true });
  count = this.heroesService.count();
  totalHeroes = 0;
  displayedColumns: string[] = ['id', 'name', 'age', 'color', 'options'];
  dataSource = new MatTableDataSource<Heroe>([]);

  private readonly unsubscribe$ = new Subject<void>();

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);


  constructor(
    private heroesService: HeroesService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {

    this.search();
    this.heroesService.getCounter().subscribe((result: number) => this.totalHeroes = result);

  }

  search() {
    this.filter.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        startWith(''),
        switchMap(text => {
          return this.heroesService.getHeroes(text);
        })
      ).subscribe(heroesFiltrados => {
        setTimeout(() => {
          this.loading = false;
          this.dataSource = new MatTableDataSource<Heroe>(heroesFiltrados);
          this.dataSource.paginator = this.paginator;
        }, 1000);
      });

  }

  getHeroes() {
    /* Para usar con json-server. */
    this.heroesService.getHeroes().subscribe(res => {
      console.log('Estos son los heroes:');
      console.log(res);
      setTimeout(() => {
        this.dataSource = new MatTableDataSource<Heroe>(res);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      }, 1000);

    });
  }


  delete(heroeId: number) {
    this.openDialog('200ms', '200ms').afterClosed()
      .pipe(
        map((result) => {
          console.log(`Dialog result: ${result}`);
          if (result) {
            return this.heroesService.deleteHeroe(heroeId);
          }
          return of('ninguno');
        })
      )
      .pipe(
        takeUntil(this.unsubscribe$),
        concatAll()
      )
      .subscribe(
        result => {
          this.getHeroes();
          console.log('Héroe borrado:', result);
        }
      );

  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): MatDialogRef<DialogAlertComponent> {
    return this.dialog.open(DialogAlertComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
