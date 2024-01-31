import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { HeroesState } from '../../heroes.reducer';
import { Heroe } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-heroes-add',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, NgbHighlight, MatCardModule, MatDialogModule, MatIconModule],

  templateUrl: './heroes-add.component.html',
  styleUrl: './heroes-add.component.scss'
})
export class HeroesAddComponent implements OnInit, OnDestroy {
  heroId = '';
  heroeForm = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    age: ['', Validators.required],
    eyeColor: ['', Validators.required]
  });
  private subscriptions = new Subscription();
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private heroesService: HeroesService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<HeroesState>) {
  }
  hero$: Observable<Heroe> = new Observable();

  ngOnInit(): void {
    this.heroId = this.route.snapshot.paramMap.get('id')!; // para que no acepte nulos.
    console.log('El id es:', this.heroId);

    if (this.heroId != 'new' && this.heroId !== undefined) // is number
    {
      this.hero$ = this.heroesService.getHeroeById(Number(this.heroId)).pipe(tap(heroe => this.heroeForm.patchValue(
        { ...heroe, id: heroe.id.toString(), age: heroe.age.toString() })));;
    }
  }

  onSubmit(formDirective: FormGroupDirective) {
    console.log('Agregar');

    if (this.heroeForm.invalid) {

      return;
    }
    let heroe: Heroe = Object.assign(new Heroe(), this.heroeForm.value);
    if (this.heroId == 'new') // is new heroe
    {
      console.log(heroe);
      // this.heroesService.addHeroe(heroe).pipe(takeUntilDestroyed()).subscribe(() => this.router.navigate(['/home']));
      this.subscriptions.add(this.heroesService.addHeroe(heroe).subscribe(() => {
        this.snackBar.open('Héroe añadido!', 'Cerrar', {
          duration: 1500
        });

      }));
    } else {
      this.subscriptions.add(this.heroesService.editHeroe(heroe).subscribe((result) => {
        this.snackBar.open('Héroe modificado!', 'Cerrar', {
          duration: 1500
        });
      }));
    }


    // this.store.dispatch(actions.crear({ texto: this.txtInput.value }));

    this.heroeForm.reset();
    formDirective.resetForm();

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
