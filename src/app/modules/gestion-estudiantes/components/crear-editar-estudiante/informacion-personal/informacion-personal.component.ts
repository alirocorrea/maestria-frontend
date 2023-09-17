import { Component, OnInit } from '@angular/core';
import { TipoIdentificacion, TipoPoblacion } from '../../../../../core/enums/domain-enum';
import { enumToSelectItems } from 'src/app/core/utils/util';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-informacion-personal',
    templateUrl: './informacion-personal.component.html',
    styleUrls: ['./informacion-personal.component.scss'],
})
export class InformacionPersonalComponent implements OnInit {

    generoRaddioButton: string = 'M';

    tiposIndentificacion: SelectItem[] = enumToSelectItems(TipoIdentificacion);
    tiposPoblacion: SelectItem[] = enumToSelectItems(TipoPoblacion);

    constructor() {}

    ngOnInit(): void {}

}
