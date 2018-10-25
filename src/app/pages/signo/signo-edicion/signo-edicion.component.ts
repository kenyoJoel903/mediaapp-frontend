import { PacienteDialogComponent } from './../paciente-dialog/paciente-dialog.component';
import { Paciente } from './../../../_model/paciente';
import { PacienteService } from './../../../_service/paciente.service';
import { SignoService } from './../../../_service/signo.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Signo } from './../../../_model/signo';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';

import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-signo-edicion',
  templateUrl: './signo-edicion.component.html',
  styleUrls: ['./signo-edicion.component.css']
})
export class SignoEdicionComponent implements OnInit {

  id:number;
  form:FormGroup;
  myControlPaciente: FormControl = new FormControl();
  edicion:boolean = false;
  signo:Signo;
  pacientes:Array<Paciente> = [];

  filteredOptionsPaciente: Observable<any[]>;

  constructor(private builder: FormBuilder, private route:ActivatedRoute, private router: Router,
      private signoService:SignoService, private pacienteService:PacienteService,
      public snackbar:MatSnackBar,
      private dialog: MatDialog) {

        this.form =  builder.group({
          'id' : new FormControl(0),
          'fecha' : new FormControl(new Date()),
          'temperatura': new FormControl(0),
          'pulso': new FormControl(''),
          'ritmoRespitatorio': new FormControl(''),
          'paciente' : this.myControlPaciente
        }); 

  }

  ngOnInit() {
    this.listarPacientes();
    this.filteredOptionsPaciente = this.myControlPaciente.valueChanges.pipe(map(val => this.filterPaciente(val)));
    this.signo = new Signo();
    this.signo.id = 0;
    this.route.params.subscribe((params:Params)=>{
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  private listarPacientes(){
    this.pacienteService.pacienteCambio.subscribe(data=>{
      this.pacientes = data;
    });
    this.pacienteService.listar().subscribe(data =>{
      this.pacientes = data;
    })
  }

  private filterPaciente(val:any){
    if(val != null && val.idPaciente > 0){
      return this.pacientes.filter(option => 
        option.nombres.toLocaleLowerCase().includes(val.nombres.toLocaleLowerCase()) || option.apellidos.toLocaleLowerCase().includes(val.apellidos.toLocaleLowerCase()) || option.dni.includes(val.dni));
    }else{
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) || option.apellidos.toLowerCase().includes(val.toLowerCase()) || option.dni.includes(val));
    }
  }

  displayFnPaciente(val:Paciente){
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  seleccionarPaciente(e: any){
    this.signo.paciente = e.option.value;
  }

  private initForm(){
    if(this.edicion){
      this.signoService.listarSignoPorId(this.id).subscribe(data =>{
        this.myControlPaciente = new FormControl();
        this.myControlPaciente.setValue(data.paciente);
        this.filteredOptionsPaciente = this.myControlPaciente.valueChanges.pipe(map(val => this.filterPaciente(val)));

        this.form =  this.builder.group({
          'id' : new FormControl(data.id),
          'fecha' : new FormControl(new Date(data.fecha)),
          'temperatura': new FormControl(data.temperatura),
          'pulso': new FormControl(data.pulso),
          'ritmoRespitatorio': new FormControl(data.ritmoRespitatorio),
          'paciente' : this.myControlPaciente
        });  
      })
    }
  }

  guardar(){
    let _date = new Date(this.form.value['fecha']);
    let localISOTime = (_date).toISOString();
    this.signo.fecha = localISOTime;
    this.signo.id = this.form.value['id'];
    this.signo.pulso = this.form.value['pulso'];
    this.signo.ritmoRespitatorio = this.form.value['ritmoRespitatorio'];
    this.signo.temperatura = Number(this.form.value['temperatura'] || 0);
    
    if(this.edicion){
      this.signoService.modificarSigno(this.signo).subscribe(data =>{
        this.signoService.listar().subscribe(signos =>{
          this.signoService.signoCambio.next(signos);
          this.signoService.mensajeCambio.next('Se modificó.');
        })
      })
    }else{
      this.signoService.registarSigno(this.signo).subscribe(data =>{
        this.signoService.listar().subscribe(signos =>{
          this.signoService.signoCambio.next(signos);
          this.signoService.mensajeCambio.next('Se registró.');
        })
      })
    }
    this.router.navigate(['signos']);
  }

openNuevoPaciente(){
  this.dialog.open(PacienteDialogComponent, {
    width: '400px',
    disableClose: true,
    data:{}
  });  
}

}
