import { TooltipModule } from 'primeng/tooltip';
import { DatepickerComponent } from './datepicker.component';
import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDateParserFormatter, NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from './mask/dateformat';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Injectable()
export abstract class NgbDatepickerI18n {
  abstract getWeekdayShortName( weekday: number ): string;
  abstract getMonthShortName( month: number ): string;
  abstract getMonthFullName( month: number ): string;
  abstract getDayAriaLabel( date: NgbDateStruct ): string;
}

@NgModule({
  declarations: [
    DatepickerComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    TooltipModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ], exports: [
    DatepickerComponent
  ],
  providers: [
    { provide: NgbDatepickerI18n, useClass: DatepickerComponent },
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
  ]
})
export class DatepickerModule { }

