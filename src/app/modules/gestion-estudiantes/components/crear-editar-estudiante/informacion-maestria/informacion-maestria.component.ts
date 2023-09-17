import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-informacion-maestria',
    templateUrl: './informacion-maestria.component.html',
    styleUrls: ['./informacion-maestria.component.scss'],
})
export class InformacionMaestriaComponent implements OnInit {

    generoRaddioButton: string = 'M';
    estadoRadioButton: string;

    constructor() {}

    ngOnInit(): void {}
}
