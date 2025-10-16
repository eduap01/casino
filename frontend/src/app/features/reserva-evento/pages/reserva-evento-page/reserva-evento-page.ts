import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { debounceTime, map, catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-reserva-evento-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './reserva-evento-page.html',
  styleUrls: ['./reserva-evento-page.scss'],
})
export class ReservaEventoPage {
  form!: FormGroup;
  submitted = false;
  loading = false;
  success = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        telefono: ['', [Validators.required]],
        email: [
          '',
          [Validators.required, Validators.email],
          [this.verificarEmailExistencia.bind(this)],
        ],
        fechaInicio: ['', Validators.required],
        horaInicio: ['', Validators.required],
        fechaFin: ['', Validators.required],
        horaFin: ['', Validators.required],
        personas: [1, [Validators.required, Validators.min(1), Validators.max(50)]],
        comentarios: [''],
      },
      { validators: this.validarRangoFechasHoras }
    );
  }

get f() {
  return this.form.controls;
}


  /** ✅ Validador que comprueba que la fecha/hora fin sea posterior a la de inicio */
  private validarRangoFechasHoras = (group: FormGroup): ValidationErrors | null => {
    const fechaInicio = group.get('fechaInicio')?.value;
    const horaInicio = group.get('horaInicio')?.value;
    const fechaFin = group.get('fechaFin')?.value;
    const horaFin = group.get('horaFin')?.value;

    if (!fechaInicio || !horaInicio || !fechaFin || !horaFin) return null;

    const inicio = new Date(`${fechaInicio}T${horaInicio}`);
    const fin = new Date(`${fechaFin}T${horaFin}`);

    if (fin <= inicio) return { rangoInvalido: true };
    return null;
  };


  private verificarEmailExistencia(control: AbstractControl): Observable<ValidationErrors | null> {
  const email = control.value;
  if (!email) return of(null);

  // Validación básica de dominio
  const dominio = email.split('@')[1];
  const dominiosPermitidos = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.es', 'icloud.com'];

  if (!dominio) return of({ emailDomainInvalid: true });
  if (!dominiosPermitidos.includes(dominio)) return of({ emailDomainInvalid: true });

  // Simula verificación correcta
  return of(null);
}


  triggerEmailCheck() {
    const emailCtrl = this.form.get('email');
    if (emailCtrl?.value) {
      emailCtrl.updateValueAndValidity({ onlySelf: true });
    }
  }


  onSubmit() {
    this.submitted = true;
    this.success = false;
    this.errorMsg = '';

    if (this.form.invalid) return;

    this.loading = true;

    // Datos del formulario
    const datos = this.form.value;


    console.log('Datos enviados:', datos);


    setTimeout(() => {
      this.loading = false;
      this.success = true;
      this.form.reset();
      this.submitted = false;
    }, 1500);
  }
}
