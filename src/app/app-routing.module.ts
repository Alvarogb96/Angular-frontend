import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {LoginComponent} from './components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import {DatosgeneralesComponent} from './components/gestion-empleados/datosgenerales/datosgenerales.component'
import {TestsComponent} from './components/gestion-salud/tests/tests.component'
import { NoticiasComponent } from './components/gestion-empresa/noticias/noticias.component';
import { SolicitudepiComponent } from './components/gestion-material/solicitudepi/solicitudepi.component';
import { SolicitudesEpiComponent } from './components/gestion-material/solicitudes-epi/solicitudes-epi.component';
import { GestionbajaComponent } from './components/gestion-salud/gestionbaja/gestionbaja.component';
import { AltaEmpleadoComponent } from './components/gestion-empleados/alta-empleado/alta-empleado.component';
import { EmpleadosComponent } from './components/gestion-empleados/empleados/empleados.component';
import { EmpleadosSolicitudesEpiComponent } from './components/gestion-material/empleados-solicitudes-epi/empleados-solicitudes-epi.component';
import { EmpleadosSolicitudesBajaComponent } from './components/gestion-salud/empleados-solicitudes-baja/empleados-solicitudes-baja.component';
import { AltaNoticiaComponent } from './components/gestion-empresa/alta-noticia/alta-noticia.component';
import { AltaEpiComponent } from './components/gestion-material/alta-epi/alta-epi.component';
import { InventarioEpisComponent } from './components/gestion-material/inventario-epis/inventario-epis.component';
import { SolicitudesEpiAnalisisComponent } from './components/gestion-empresa/analisis/solicitudes-epi-analisis/solicitudes-epi-analisis.component';
import { EpisAnalisisComponent } from './components/gestion-empresa/analisis/epis-analisis/epis-analisis.component';
import { BajasAnalisisComponent } from './components/gestion-empresa/analisis/bajas-analisis/bajas-analisis.component';
import { VacunasComponent } from './components/gestion-salud/vacunas/vacunas.component';
import { VacunasAnalisisComponent } from './components/gestion-empresa/analisis/vacunas-analisis/vacunas-analisis.component';
import { StockMinimoComponent } from './components/gestion-material/stock-minimo/stock-minimo.component';
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'main', component: AppMainComponent,
                children: [
                    {path: 'datos', component: DatosgeneralesComponent},
                    {path: 'salud/tests', component: TestsComponent},
                    {path: 'salud/vacunas', component: VacunasComponent},
                    {path: 'noticias', component: NoticiasComponent},
                    {path: 'epis/solicitarEPI', component: SolicitudepiComponent},
                    {path: 'epis/solicitudesEPI', component: SolicitudesEpiComponent},
                    {path: 'baja', component: GestionbajaComponent},
                    {path: 'empleados/alta', component: AltaEmpleadoComponent},
                    {path: 'empleados/listado', component: EmpleadosComponent},
                    {path: 'epis/solicitudesEPIEmpleados', component: EmpleadosSolicitudesEpiComponent},
                    {path: 'baja/solicitudesBajaEmpleados', component: EmpleadosSolicitudesBajaComponent},
                    {path: 'noticias/alta', component: AltaNoticiaComponent},
                    {path: 'epis/alta', component: AltaEpiComponent},
                    {path: 'epis/stock', component: StockMinimoComponent},
                    {path: 'epis/inventario', component: InventarioEpisComponent},
                    {path: 'analisis/empleados/solicitudesEPI', component: SolicitudesEpiAnalisisComponent},
                    {path: 'analisis/empleados/bajas', component: BajasAnalisisComponent},
                    {path: 'analisis/epis', component: EpisAnalisisComponent},
                    {path: 'analisis/empleados/vacunas', component: VacunasAnalisisComponent},
                ], canActivate: [AuthGuard]
            },
            {path: '', component: LoginComponent},
            {path: 'login', component: LoginComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
