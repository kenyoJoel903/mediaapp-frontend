import { PacienteService } from './../../../_service/paciente.service';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../_model/paciente';

@Component({
  selector: 'app-paciente-dialog',
  templateUrl: './paciente-dialog.component.html',
  styleUrls: ['./paciente-dialog.component.css']
})
export class PacienteDialogComponent implements OnInit {

  paciente: Paciente;

  constructor(private dialogRef: MatDialogRef<PacienteDialogComponent>, private pacienteService: PacienteService) { }

  ngOnInit() {
    this.paciente = new Paciente();
    this.paciente.idPaciente = 0;

  }

  cerrar() {
    this.dialogRef.close();
  }

  guardar() {
    this.pacienteService.registrar(this.paciente).subscribe(data => {
      this.pacienteService.listar().subscribe(pacientes => {
        this.pacienteService.pacienteCambio.next(pacientes);
        this.pacienteService.mensajeCambio.next('Se registró');
      })
    });
    this.dialogRef.close();

  }

}
