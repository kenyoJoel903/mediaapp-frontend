import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Signo } from '../../_model/signo';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { SignoService } from '../../_service/signo.service';

@Component({
  selector: 'app-signo',
  templateUrl: './signo.component.html',
  styleUrls: ['./signo.component.css']
})
export class SignoComponent implements OnInit {

  dataSource: MatTableDataSource<Signo>;
  displayedColumns = ['id', 'paciente' , 'fecha', 'temperatura', 'pulso', 'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number;

  constructor(private signoService:SignoService, private snackBar:MatSnackBar,
    public route: ActivatedRoute) { }

  ngOnInit() {

    this.signoService.signoCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.signoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', {duration: 3000});
    });

    this.signoService.listarPageable(0, 10).subscribe(data =>{
      let signos = JSON.parse(JSON.stringify(data)).content;
      let cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(signos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(value:string){
    value = value.trim();
    value = value.toLocaleLowerCase();
    this.dataSource.filter = value;
  }

  eliminarSigno(id:number){
    this.signoService.eliminarSigno(id).subscribe(_data =>{
      this.signoService.listar().subscribe(data =>{
        this.signoService.signoCambio.next(data);
        this.signoService.mensajeCambio.next('Se eliminó');
      })
    })
  }

  mostrarOtrapagina(e:any){
    this.signoService.listarPageable(e.pageIndex, e.pageSize).subscribe(data =>{
      let signos = JSON.parse(JSON.stringify(data)).content;
      let cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(signos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
