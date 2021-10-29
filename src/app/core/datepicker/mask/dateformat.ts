import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';


function padNumber(value: any, size: number) {
    if (isNumber(value)) {
        return zfill(value, size);
        // return `0${value}`.slice(size * -1);
    } else {
        return '';
    }
}

function zfill(value: number, size: number) {
    const numberOutput = Math.abs(value); /* Valor absoluto del número */
    const length = value.toString().length; /* Largo del número */
    const zero = '0'; /* String de cero */

    if (size <= length) {
        if (value < 0) {
             return ('-' + numberOutput.toString());
        } else {
             return numberOutput.toString();
        }
    } else {
        if (value < 0) {
            return ('-' + (zero.repeat(size - length)) + numberOutput.toString());
        } else {
            return ((zero.repeat(size - length)) + numberOutput.toString());
        }
    }
}

function isNumber(value: any): boolean {
    return !isNaN(toInteger(value));
}
function toInteger(value: any): number {
    return parseInt(value, 10);
    // return parseInt(`${value}`, 10);
}

@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {

    parse(value: string): NgbDateStruct {
        if (value) {
            const dateParts = value.trim().split('/');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return { year: toInteger(dateParts[0]), month: null, day: null };
            } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return { year: toInteger(dateParts[1]), month: toInteger(dateParts[0]), day: null };
            } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return { year: toInteger(dateParts[2]), month: toInteger(dateParts[1]), day: toInteger(dateParts[0]) };
            }
        }
        return null;
    }
    format(date: NgbDateStruct): string {
        let stringDate = '';
        if (date) {
            stringDate += isNumber(date.day) ? padNumber(date.day, 2) + '/' : '';
            stringDate += isNumber(date.month) ? padNumber(date.month, 2) + '/' : '';
            // stringDate += padNumber(date.year, 4);
            stringDate += date.year;

        }
        return stringDate;
    }
}
