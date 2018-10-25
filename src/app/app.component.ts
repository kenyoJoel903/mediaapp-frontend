import { TOKEN_NAME } from './_shared/var.constant';
import { MatDialog } from '@angular/material';
import { LoginService } from './_service/login.service';
import { MenuService } from './_service/menu.service';
import { Component, OnInit } from '@angular/core';
import { Menu } from './_model/menu';
import { PerfilComponent } from './pages/perfil/perfil.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mediapp-frontend';
  menus: Menu[] = [];

  

  constructor(private menuService: MenuService, public loginService: LoginService, private dialog: MatDialog){

  }

  ngOnInit(){
    this.menuService.menuCambio.subscribe(data => {
      this.menus = data;
    });
  }

  openDialogPerfil(){
    this.dialog.open(PerfilComponent,{
      width: '400px',
      disableClose: true
    })
  }

}
