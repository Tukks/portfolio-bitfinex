import { Component, OnInit, Input } from '@angular/core';
import { isNullNumber } from '../../utils/value-utils';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  objectKeys = Object.keys;
  isNull = isNullNumber;
  @Input() data = {};
  constructor() { }

  ngOnInit() {
  }
}
