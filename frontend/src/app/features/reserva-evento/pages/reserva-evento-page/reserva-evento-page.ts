import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SeoService } from '../../../../shared/seo.service';

@Component({
  selector: 'app-reserva-evento-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './reserva-evento-page.html',
  styleUrls: ['./reserva-evento-page.scss'],
})
export class ReservaEventoPage implements OnInit {
  form!: FormGroup;
  submitted = false;
  loading = false;
  success = false;
  errorMsg = '';
  mensaje: string = '';
  maxPersonasPermitidas = 50;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private seo: SeoService
  ) {
    this.form = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        telefono: [
          '',
          [Validators.required, Validators.pattern(/^(\+34|0034|34)?[6|7|8|9][0-9]{8}$/)]
        ],
        email: [
          '',
          [Validators.required, Validators.email],
          [this.verificarEmailExistencia.bind(this)]
        ],
        fechaInicio: ['', Validators.required],
        horaInicio: ['', Validators.required],
        fechaFin: ['', Validators.required],
        horaFin: ['', Validators.required],
        personas: [
          1,
          [Validators.required, Validators.min(1), Validators.max(50)]
        ],
        zona: ['', Validators.required],
        comentarios: ['', [Validators.maxLength(300)]],
        botCheck: ['']
      },
      {
        validators: [this.validarRangoFechasHoras, this.validarCapacidad(), this.validarFechaPasada()]
      }
    );

    // Actualiza el límite de personas según la zona seleccionada
    this.form.get('zona')?.valueChanges.subscribe((zona) => {
      let maxPersonas = 50;
      if (zona === 'butakaPie') maxPersonas = 120;
      else if (zona === 'butakaSentado') maxPersonas = 60;
      else if (zona === 'localCompleto') maxPersonas = 200;

      const personasCtrl = this.form.get('personas');
      personasCtrl?.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(maxPersonas)
      ]);
      personasCtrl?.updateValueAndValidity();
      this.maxPersonasPermitidas = maxPersonas;
    });
  }

  ngOnInit(): void {
    this.seo.setSeo({
      title: 'Reserva para eventos | Casino Rock Bar | Esquivias (Toledo)',
      description:
        'Solicita tu reserva para eventos en Casino Rock Bar (Esquivias, Toledo). Indica fecha, hora y número de personas. Cerca de Illescas, Seseña y Madrid Sur.',
      canonical: 'https://casinorockbar.com/reserva-evento',
      ogImage: 'https://casinorockbar.com/media/logoCasino.png',
      robots: 'index, follow'
    });
  }

  get f() {
    return this.form.controls;
  }

  private validarRangoFechasHoras: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const fechaInicio = group.get('fechaInicio')?.value;
    const horaInicio = group.get('horaInicio')?.value;
    const fechaFin = group.get('fechaFin')?.value;
    const horaFin = group.get('horaFin')?.value;

    if (!fechaInicio || !horaInicio || !fechaFin || !horaFin) return null;

    const inicio = new Date(`${fechaInicio}T${horaInicio}`);
    const fin = new Date(`${fechaFin}T${horaFin}`);

    return fin > inicio ? null : { rangoInvalido: true };
  };

  private validarCapacidad(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const zona = group.get('zona')?.value;
      const personas = +group.get('personas')?.value;
      if (!zona || !personas) return null;

      const limites = {
        butakaPie: 120,
        butakaSentado: 60,
        localCompleto: 200
      };

      if (personas > (limites as any)[zona]) {
        return { excesoCapacidad: true };
      }
      return null;
    };
  }

  private verificarEmailExistencia(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    if (!email) return of(null);

    const dominio = email.split('@')[1]?.toLowerCase();
    const dominiosPermitidos = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.es', 'icloud.com'];
    const dominiosBloqueados = ['tempmail.com', '10minutemail.com', 'mailinator.com', 'guerrillamail.com'];

    if (!dominio) return of({ emailDomainInvalid: true });
    if (dominiosBloqueados.includes(dominio)) return of({ emailDomainInvalid: true });
    if (!dominiosPermitidos.includes(dominio)) return of({ emailDomainInvalid: true });

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

    if (this.form.get('botCheck')?.value) {
      console.warn('Posible bot detectado.');
      return;
    }

    if (this.form.invalid) return;

    this.loading = true;
    const datos = this.form.value;

    const emailBody = `
      <h3>Nueva solicitud de reserva</h3>
      <p><b>Nombre:</b> ${this.sanitize(datos.nombre)}</p>
      <p><b>Teléfono:</b> ${this.sanitize(datos.telefono)}</p>
      <p><b>Correo:</b> ${this.sanitize(datos.email)}</p>
      <p><b>Zona:</b> ${this.obtenerNombreZona(datos.zona)}</p>
      <p><b>Fecha inicio:</b> ${datos.fechaInicio} ${datos.horaInicio}</p>
      <p><b>Fecha fin:</b> ${datos.fechaFin} ${datos.horaFin}</p>
      <p><b>Personas:</b> ${datos.personas}</p>
      <p><b>Comentarios:</b> ${this.sanitize(datos.comentarios || 'Ninguno')}</p>
    `;

    this.http.post('/api/email/reserva', {
      nombre: datos.nombre,
      email_cliente: datos.email,
      telefono: datos.telefono,
      fecha: datos.fechaInicio,       // OK
      hora: datos.horaInicio,         // OK
      personas: datos.personas,
      mensaje: datos.comentarios,     // <- ANTES FALLABA
      email_casino: 'casinorock888@gmail.com',
      detalle_html: emailBody
    }, {
      headers: {
        'x-api-key':
          'bb659e79305dde7929aa199ce2b99b70c513bc06740a84330d9c29fe832e6c1d'
      }
    })
    .subscribe({
      next: (res: any) => {
        console.log('Respuesta backend:', res);
        this.loading = false;
        this.success = true;
        this.form.reset();
        this.submitted = false;
        this.mensaje = 'Te hemos enviado un email para confirmar tu reserva.';
      },
      error: (err) => {
        console.error('Error al enviar:', err);
        this.loading = false;
        this.errorMsg = 'Error al enviar la reserva.';
      }
    });

  }

  private sanitize(text: string): string {
    return text.replace(/[<>]/g, '');
  }

  private obtenerNombreZona(valor: string): string {
    const nombres: Record<string, string> = {
      butakaPie: 'La Butaka (de pie)',
      butakaSentado: 'La Butaka (sentados)',
      localCompleto: 'Todo el local'
    };
    return nombres[valor] || valor;
  }

  private validarFechaPasada(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const fechaInicio = group.get('fechaInicio')?.value;
      const horaInicio = group.get('horaInicio')?.value;
      if (!fechaInicio || !horaInicio) return null;

      const inicio = new Date(`${fechaInicio}T${horaInicio}`);
      const ahora = new Date();

      if (inicio < ahora) {
        return { fechaPasada: true };
      }
      return null;
    };
  }
}
