import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import {UtilsService} from '../app/core/services/utils/utils.service'
import { constantes } from './core/constantes';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    @Input() public usuarioLogueado;

    model: any[];
    role: string = "";

    constructor(public app: AppMainComponent, private utilsService: UtilsService) {}

    ngOnInit() {
        if (sessionStorage.getItem('role') === constantes.ROLE_EMPLEADO) {
            this.role = constantes.ROLE_EMPLEADO_COMPLETO;
            this.model = [
                { label: 'Datos ' + this.role, icon: 'pi pi-fw pi-id-card', routerLink: ['datos']},
                {
                    label: 'Salud', icon: 'pi pi-fw pi-heart', routerLink: ['salud'],
                    items: [
                        { label: 'Tests', icon: 'pi pi-fw pi-list', routerLink: ['salud/tests'] },
                        { label: 'Vacunas', icon: 'pi pi-fw pi-list', routerLink: ['salud/vacunas']}
                    ]
                },
                {
                    label: 'EPIs', icon: 'pi pi-fw pi-shield', routerLink: ['epis'],
                    items: [
                        { label: 'Solicitar', icon: 'pi pi-fw pi-pencil', routerLink: ['epis/solicitarEPI'] },
                        { label: 'Mis solicitudes', icon: 'pi pi-fw pi-list', routerLink: ['epis/solicitudesEPI'] }
                    ]
                },
                {
                    label: 'Trabajo remoto', icon: 'pi pi-fw pi-calendar-minus', routerLink: ['baja']
                },
                {
                    label: 'Noticias', icon: 'pi pi-fw pi-bars', routerLink: ['noticias']
                }
            ];
        } else if(sessionStorage.getItem('role') === constantes.ROLE_DIRECTIVO){
            this.role = constantes.ROLE_DIRECTIVO_COMPLETO;
            this.model = [
                { label: 'Datos ' + this.role, icon: 'pi pi-fw pi-id-card', routerLink: ['datos']},
                {
                    label: 'Empleados', icon: 'pi pi-fw pi-users', routerLink: ['empleados'],
                    items: [
                        { label: 'Alta empleado', icon: 'pi pi-fw pi-user-plus', routerLink: ['empleados/alta'] },
                        { label: 'Empleados', icon: 'pi pi-fw pi-users', routerLink: ['empleados/listado'] },
                    ]
                },
                {
                    label: 'Salud', icon: 'pi pi-fw pi-heart', routerLink: ['salud'],
                    items: [
                        { label: 'Tests', icon: 'pi pi-fw pi-list', routerLink: ['salud/tests'] },
                        { label: 'Vacunas', icon: 'pi pi-fw pi-list', routerLink: ['salud/vacunas']}
                    ]
                },
                {
                    label: 'EPIs', icon: 'pi pi-fw pi-shield', routerLink: ['epis'],
                    items: [
                        { label: 'Solicitar', icon: 'pi pi-fw pi-pencil', routerLink: ['epis/solicitarEPI'] },
                        { label: 'Mis solicitudes', icon: 'pi pi-fw pi-list', routerLink: ['epis/solicitudesEPI'] },
                        { label: 'Solicitudes empleados', icon: 'pi pi-fw pi-list', routerLink: ['epis/solicitudesEPIEmpleados'] }
                    ]
                },
                {
                    label: 'Trabajo remoto', icon: 'pi pi-fw pi-calendar-minus', routerLink: ['baja'],
                    items: [
                        { label: 'Mis solicitudes', icon: 'pi pi-fw pi-calendar-minus', routerLink: ['baja'] },
                        { label: 'Solicitudes empleados', icon: 'pi pi-fw pi-list', routerLink: ['baja/solicitudesBajaEmpleados'] },
                    ]
                },
                {
                    label: 'Noticias', icon: 'pi pi-fw pi-bars', routerLink: ['noticias']
                }
            ];
        } else if(sessionStorage.getItem('role') === constantes.ROLE_EMPRESA){
            this.role = constantes.ROLE_EMPRESA_COMPLETO;
            this.model = [
                { label: 'Datos ' + this.role, icon: 'pi pi-fw pi-home', routerLink: ['datos'] },
                {
                    label: 'EPIs', icon: 'pi pi-fw pi-shield', routerLink: ['epis'],
                    items: [
                        { label: 'Añadir epi', icon: 'pi pi-fw pi-plus', routerLink: ['epis/alta'] },
                        { label: 'Stock mínimo', icon: 'pi pi-fw pi-chart-bar', routerLink: ['epis/stock'] },
                        { label: 'Inventario', icon: 'pi pi-fw pi-list', routerLink: ['epis/inventario']}
                    ]
                },
                {
                    label: 'Noticias', icon: 'pi pi-fw pi-bars', routerLink: ['noticias'],
                    items: [
                        { label: 'Añadir noticia', icon: 'pi pi-fw pi-plus', routerLink: ['noticias/alta'] },
                        { label: 'Listar noticias', icon: 'pi pi-fw pi-list', routerLink: ['noticias']}
                    ]
                },
                {
                    label: 'Análisis', icon: 'pi pi-fw pi-info-circle', routerLink: ['analisis'],
                    items: [
                        { label: 'Empleados', icon: 'pi pi-fw pi-pencil', routerLink: ['analisis/empleados'] ,
                        items: [
                            { label: 'Solicitudes de EPI', icon: 'pi pi-fw pi-chart-bar', routerLink: ['analisis/empleados/solicitudesEPI'] },
                            { label: 'Bajas', icon: 'pi pi-fw pi-chart-line', routerLink: ['analisis/empleados/bajas']},
                            { label: 'Vacunas', icon: 'pi pi-fw pi-chart-bar', routerLink: ['analisis/empleados/vacunas']}
                        ]},
                        { label: 'EPIS', icon: 'pi pi-fw pi-chart-bar', routerLink: ['analisis/epis'] },
                    ]
                }
            ];
        }
    }

}
