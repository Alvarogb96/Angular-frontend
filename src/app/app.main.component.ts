import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from './app.menu.service';
import { PrimeNGConfig } from 'primeng/api';
import { AppComponent } from './app.component';
import {ConnectionService} from '../app/core/services/connection/connection.service';
import {Empleado} from '../app/core/models/usuario'
import {AuthService} from '../app/core/services/auth/auth.service'
import { UtilsService } from './core/services/utils/utils.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.main.component.html'
})
export class AppMainComponent implements OnInit{
    usuario: any;

    configDialogActive = false;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    menuHoverActive: boolean;

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    menuClick: boolean;

    configClick: boolean;

    overlayMenuMobileActive: boolean;

    constructor(private menuService: MenuService, private primengConfig: PrimeNGConfig, 
        public app: AppComponent, private connectionService: ConnectionService,
        private authService: AuthService, private utilsService: UtilsService) { }

    ngOnInit(){
        this.connectionService.getEmpleadoById(sessionStorage.getItem('token')).subscribe(res =>{
            if(res !== undefined){
                this.usuario = new Empleado(res);
                console.log(this.usuario);
            }
            
        });
    }

    onRippleChange(event) {
        this.app.ripple = event.checked;
        this.primengConfig = event.checked;
    }

    onLayoutClick() {
        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }

        if (!this.configClick) {
            this.configDialogActive = false;
        }

        if (!this.menuClick) {
            if (this.isHorizontal()) {
                this.menuService.reset();
            }

            if (this.overlayMenuActive || this.overlayMenuMobileActive) {
                this.hideOverlayMenu();
            }

            this.menuHoverActive = false;
        }

        this.topbarItemClick = false;
        this.menuClick = false;
        this.configClick = false;
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null; } else {
            this.activeTopbarItem = item; }

        event.preventDefault();
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.topbarMenuActive = false;

        if (this.app.layoutMode === 'overlay' && !this.isMobile()) {
            this.overlayMenuActive = !this.overlayMenuActive;
        } else {
            if (!this.isDesktop()) {
                this.overlayMenuMobileActive = !this.overlayMenuMobileActive;
            }
        }

        event.preventDefault();
    }

    onMenuClick() {
        this.menuClick = true;
    }

    onConfigClick() {
        this.configClick = true;
    }

    hideOverlayMenu() {
        this.overlayMenuActive = false;
        this.overlayMenuMobileActive = false;
    }

    isDesktop() {
        return window.innerWidth > 990;
    }

    isMobile() {
        return window.innerWidth <= 990;
    }

    isOverlay() {
        return this.app.layoutMode === 'overlay';
    }

    isHorizontal() {
        return this.app.layoutMode === 'horizontal';
    }

    logout(event){
        console.log(event);
        if(event){
            this.authService.logout();
        }
    }

}
