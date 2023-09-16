import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-informacion-personal',
    templateUrl: './informacion-personal.component.html',
    styleUrls: ['./informacion-personal.component.scss'],
})
export class InformacionPersonalComponent implements OnInit {

    generoRaddioButton: string = 'M';

    constructor() {}

    ngOnInit(): void {}
}
