import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import { DatePipe } from '@angular/common';

// PrimeNG Components for demos
import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {AvatarModule} from 'primeng/avatar';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {BadgeModule} from 'primeng/badge';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipModule} from 'primeng/chip';
import {ChipsModule} from 'primeng/chips';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {GalleriaModule} from 'primeng/galleria';
import {InplaceModule} from 'primeng/inplace';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {LightboxModule} from 'primeng/lightbox';
import {KnobModule} from 'primeng/knob';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';
import {OrderListModule} from 'primeng/orderlist';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {ProgressBarModule} from 'primeng/progressbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SidebarModule} from 'primeng/sidebar';
import {SkeletonModule} from 'primeng/skeleton';
import {SlideMenuModule} from 'primeng/slidemenu';
import {SliderModule} from 'primeng/slider';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SplitterModule} from 'primeng/splitter';
import {StepsModule} from 'primeng/steps';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {TagModule} from 'primeng/tag';
import {TerminalModule} from 'primeng/terminal';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TimelineModule} from 'primeng/timeline';
import {ToastModule} from 'primeng/toast';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {VirtualScrollerModule} from 'primeng/virtualscroller';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

// Application Components
import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import {AppMenuComponent} from './app.menu.component';
import {AppMenuitemComponent} from './app.menuitem.component';
import {AppActionBarComponent} from './app.actionbar.component';
import {AppConfigComponent} from './app.config.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';

import {BreadcrumbService} from './app.breadcrumb.service';
import {MenuService} from './app.menu.service';
import { LoginComponent } from './components/login/login.component';

import { ReactiveFormsModule } from "@angular/forms";
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatosgeneralesComponent } from './components/datosgenerales/datosgenerales.component';
import { TestsComponent } from './components/tests/tests.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { SolicitudepiComponent } from './components/solicitudepi/solicitudepi.component';
import { SolicitudesEpiComponent } from './components/solicitudes-epi/solicitudes-epi.component';
import { GestionbajaComponent } from './components/gestionbaja/gestionbaja.component';
import { AltaEmpleadoComponent } from './components/alta-empleado/alta-empleado.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { DetalleEmpleadoComponent } from './components/detalle-empleado/detalle-empleado.component';
import { EmpleadosSolicitudesEpiComponent } from './components/empleados-solicitudes-epi/empleados-solicitudes-epi.component';
import { EmpleadosSolicitudesBajaComponent } from './components/empleados-solicitudes-baja/empleados-solicitudes-baja.component';
import { DetalleSolicitudEmpleadoComponent } from './components/detalle-solicitud-empleado/detalle-solicitud-empleado.component';
import { DetalleSolicitudBajaComponent } from './components/detalle-solicitud-baja/detalle-solicitud-baja.component';
import { AltaNoticiaComponent } from './components/alta-noticia/alta-noticia.component';
import { AltaEpiComponent } from './components/alta-epi/alta-epi.component';
import { InventarioEpisComponent } from './components/inventario-epis/inventario-epis.component';
import { SolicitudesEpiAnalisisComponent } from './components/analisis/solicitudes-epi-analisis/solicitudes-epi-analisis.component';
import { BajasAnalisisComponent } from './components/analisis/bajas-analisis/bajas-analisis.component';
import { EpisAnalisisComponent } from './components/analisis/epis-analisis/epis-analisis.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModule } from './core/datepicker/datepicker.module';
import { VacunasComponent } from './components/vacunas/vacunas.component';
import { VacunasAnalisisComponent } from './components/analisis/vacunas-analisis/vacunas-analisis.component';
import { StockMinimoComponent } from './components/stock-minimo/stock-minimo.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        AvatarGroupModule,
        AvatarModule,
        BreadcrumbModule,
        BadgeModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        ChartModule,
        CheckboxModule,
        ChipModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        KnobModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        ScrollTopModule,
        ScrollPanelModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        SlideMenuModule,
        SliderModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TagModule,
        TerminalModule,
        TieredMenuModule,
        TimelineModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            defaultLanguage: 'es',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NgbModule,
        DatepickerModule
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppConfigComponent,
        AppActionBarComponent,
        LoginComponent,
        DatosgeneralesComponent,
        TestsComponent,
        NoticiasComponent,
        SolicitudepiComponent,
        SolicitudesEpiComponent,
        GestionbajaComponent,
        AltaEmpleadoComponent,
        EmpleadosComponent,
        DetalleEmpleadoComponent,
        EmpleadosSolicitudesEpiComponent,
        EmpleadosSolicitudesBajaComponent,
        DetalleSolicitudEmpleadoComponent,
        DetalleSolicitudBajaComponent,
        AltaNoticiaComponent,
        AltaEpiComponent,
        InventarioEpisComponent,
        SolicitudesEpiAnalisisComponent,
        BajasAnalisisComponent,
        EpisAnalisisComponent,
        VacunasComponent,
        VacunasAnalisisComponent,
        StockMinimoComponent,
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        MenuService, BreadcrumbService, ConfirmationService, DatePipe, MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
