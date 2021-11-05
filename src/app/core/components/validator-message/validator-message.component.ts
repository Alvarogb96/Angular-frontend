import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-validator-message',
  templateUrl: './validator-message.component.html',
  styleUrls: ['./validator-message.component.scss']
})
export class ValidatorMessageComponent implements OnInit {
  @Input() public model: any;
  @Input() public isInvalid = false;
  @Input() public errors: any = {};


  constructor() { }

  ngOnInit() {
  }

  ver(object) {
    console.log('SM - VER', object);
  }

}
