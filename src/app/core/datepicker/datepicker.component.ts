import { Component, OnInit, Input , Output, EventEmitter , Injectable, ViewChild, SimpleChanges, OnChanges} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NgbDatepickerI18n, NgbDateStruct, NgbDateParserFormatter, NgbCalendar  } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from './mask/dateformat';
import { FormBuilder } from '@angular/forms';
import { UtilsService } from '../services/utils/utils.service';


/**
 * Idioma que aparecera en el componente Datapicker
 */
const I18N_VALUES = {
  es: {
    weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  }
  // other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
  language = 'es';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private i18n: I18n) {
    super();
  }

  /**
   * Función que recoge los diás de la semana en Español.
   * @param weekday Array de dias de la semana.
   */
  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this.i18n.language].weekdays[weekday - 1];
  }

  /**
   * Función que recoge los meses en castellano.
   * @param month Array con los meses en español.
   */
  getMonthShortName(month: number): string {
    return I18N_VALUES[this.i18n.language].months[month - 1];
  }

  /**
   * Función quie recoge los meses.
   * @param month Array con los meses
   */
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  /**
   * Función que recoge la marcara de coomo se mostrar los meses en el datpicker
   * @param date Fecha a transformar con la mascara.
   */
  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

// @Injectable()
// export abstract class NgbDateParserFormatter {
//   abstract parse(value: string): NgbDateStruct; // from input -> internal model
//   abstract format(date: NgbDateStruct): string; // from internal model -> string
// }

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}]
    //  {provide: NgbDateParserFormatter, useClass: DatepickerComponent}] // define custom NgbDatepickerI18n provider
})

export class DatepickerComponent implements OnInit, OnChanges  {

  @ViewChild('d', null) datePicker: any;
  @ViewChild('input', null) input: any;


  @Input() public readonly;

  @Input() public minDate;

  @Input() public maxDate;

  @Input() public control;

  @Input() public date;

  /**
   * Parametro de entrada al componente con el placeholder a mostrar
   */
  @Input() public placeholder;

  /**
   * Parametro de entrada con el mensaje que se mostrara en el tooltip
   */
  @Input() public tooltips;


  @Input() public isValid;

  @Input() public validations;

  @Input() public placement = 'bottom';

  /**
   * Parametro de salida donde se devolvera la fecha seleccionada.
   */
  @Output() public getDate = new EventEmitter<object>();

  formModel;

  lastChange;

  dateOriginal;

  // this.greeting = new Promise<string>((resolve, reject) => { this.resolve = resolve; });
  // maxDates;


  constructor(private fb: FormBuilder,
              public translate: TranslateService,
              public utilsService: UtilsService,
              private calendar: NgbCalendar) {}
  model: NgbDateStruct;

  today = this.calendar.getToday();


  ngOnChanges(changes: SimpleChanges) {
    if (changes.date) {
      this.minDate = {year: 1900, month: 1, day:1};
    this.maxDate = {year: 2030, month: 1, day:1};
      this.modificar(changes.date.currentValue);
    }
  }

  ngOnInit() {
    this.minDate = {year: 1900, month: 1, day:1};
    this.maxDate = {year: 2030, month: 1, day:1};
    if (this.control) {
      this.formModel = this.fb.group({
        date: this.control
      });
    } else {
      this.formModel = this.fb.group({
        date: []
      });
    }
  }

  /**
   * Función que envia la fecha seleccionada
   * @param date Fecha a emitir al componenet padre
   */
  sendDate(date) {
    // this.modelo = date;
    if (typeof date !== 'string' &&
      JSON.stringify(this.lastChange) !== JSON.stringify(date)) {
      this.lastChange = this.utilsService.deepCopy(date);
      if (this.dateOriginal && this.dateOriginal.split(' ').length > 1 &&
        this.utilsService.isEqualsDateAndCompleteDate(date, this.dateOriginal)) {
        date.hours = this.dateOriginal.split(' ')[1].trim();
      } else {
        if (!date) {
          date = '';
      }
    }
      this.getDate.emit(date);
    }
  }

  verIBI() {
  }

  modificar(date) {
    if (date) {
      if (!this.dateOriginal) {
        this.dateOriginal = date;
      }
      this.model = this.utilsService.parseDatePickerData(date);
    } else {
      this.model = null;
    }
    this.lastChange = this.utilsService.deepCopy(this.model);
  }



}
