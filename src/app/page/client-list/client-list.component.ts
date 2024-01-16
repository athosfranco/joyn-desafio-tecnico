import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../component/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
})
export class ClientListComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  displayedColumns: string[] = ['code', 'name', 'phone', 'cpf'];
  dataSource = new MatTableDataSource([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fetchData() {
    const clients = JSON.parse(localStorage.getItem('clientData') || '[]');

    const formattedData = clients.map((client: any, index: any) => ({
      code: client.code,
      name: `${client.firstName} ${client.lastName}`,
      phone: client.phone,
      cpf: client.cpf,
      cityState: `${client.city} - ${client.state}`,
    }));

    this.dataSource = new MatTableDataSource(formattedData);
  }

  clearTable() {
    localStorage.removeItem('clientData');
    window.location.reload();
  }

  openDialog() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Limpar tabela',
        content: 'Deseja mesmo limpar a tabela?',
        confirmAction: this.clearTable,
      },
    });
  }

  ngOnInit() {
    this.fetchData();
  }
}
