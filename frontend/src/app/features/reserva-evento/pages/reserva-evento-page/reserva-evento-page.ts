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

    const datos = this.form.value;

    const emailBody = `
      <h3>Nueva solicitud de reserva</h3>
      <p><b>Nombre:</b> ${datos.nombre}</p>
      <p><b>Teléfono:</b> ${datos.telefono}</p>
      <p><b>Correo:</b> ${datos.email}</p>
      <p><b>Fecha inicio:</b> ${datos.fechaInicio} ${datos.horaInicio}</p>
      <p><b>Fecha fin:</b> ${datos.fechaFin} ${datos.horaFin}</p>
      <p><b>Personas:</b> ${datos.personas}</p>
      <p><b>Comentarios:</b> ${datos.comentarios || 'Ninguno'}</p>
    `;

    // Llamada al backend
    this.http.post('http://localhost:8000/email/send', {
      to_email: 'eduardoarevaloportero@gmail.com',  // 👉 correo destino real
      subject: 'Nueva reserva recibida',
      body: emailBody
    }).subscribe({
      next: (res: any) => {
        console.log('Respuesta backend:', res);
        this.loading = false;
        this.success = true;
        this.form.reset();
        this.submitted = false;
      },
      error: (err) => {
        console.error('Error al enviar el correo:', err);
        this.loading = false;
        this.errorMsg = 'Error al enviar el correo. Intenta de nuevo más tarde.';
      }
    });
  }

}
