import { TOKEN_NAME } from './../../_shared/var.constant';
import { Component, OnInit } from '@angular/core';
import * as decode from 'jwt-decode';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario:string = '';
  roles:string[] = [];

  constructor(private dialogRef: MatDialogRef<PerfilComponent>) { }

  ngOnInit() {
    let token = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
    const decodedToken = decode(token.access_token);
    this.usuario = decodedToken.user_name;
    this.roles = decodedToken.authorities;
  }

  cerrar() {
    this.dialogRef.close();
  }

}
