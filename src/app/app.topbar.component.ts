import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { AppMainComponent} from './app.main.component';
import {UtilsService} from '../app/core/services/utils/utils.service'
import { constantes } from './core/constantes';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit, OnChanges{

    @Input() public usuarioLogueado;
    @Output() public logoutEmit = new EventEmitter<boolean>();

    role: string = "";

    constructor(public app: AppMainComponent, public utilsService: UtilsService) {}

    ngOnInit(){ 
    }

    ngOnChanges(changes){
      if(changes.usuarioLogueado && this.usuarioLogueado != undefined && this.usuarioLogueado.role != undefined){
        this.role = this.utilsService.getRole(this.usuarioLogueado.role);
      }
    }

  logout() {
    this.utilsService.confirm('logout', constantes.MENSAJE_LOGOUT, constantes.MENSAJE_LOGOUT_HEADER).subscribe(res => {
      this.logoutEmit.emit(true);
    });
  }
}
