import { MatIconModule } from '@angular/material/icon';
import { Component, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-new-client',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.css',
})
export class NewClientComponent {
  @ViewChild('clientForm') clientForm!: NgForm;

  constructor(private snackBar: MatSnackBar) {}

  snackbarConfig: MatSnackBarConfig = {
    duration: 2000,
    panelClass: ['success-snackbar'],
    horizontalPosition: 'center',
    verticalPosition: 'top',
  };

  submitForm() {
    const formData = {
      firstName: this.clientForm.value.firstName,
      lastName: this.clientForm.value.lastName,
      phone: this.clientForm.value.phone,
      code: this.clientForm.value.code,
      cpf: this.clientForm.value.cpf,
      address: this.clientForm.value.address,
      city: this.clientForm.value.city,
      state: this.clientForm.value.state,
      cep: this.clientForm.value.cep,
    };

    let clientsArray: any[] = [];

    const clientsString = localStorage.getItem('clientData');

    if (clientsString) {
      clientsArray = JSON.parse(clientsString);
    }

    clientsArray.push(formData);

    localStorage.setItem('clientData', JSON.stringify(clientsArray));
    this.clientForm.resetForm();
    this.snackBar.open(
      'Usuário cadastrado com sucesso',
      'OK',
      this.snackbarConfig
    );
  }

  resetForm() {
    this.clientForm.resetForm();
    this.snackBar.open('O formulário foi limpo', 'OK', this.snackbarConfig);
  }
}
