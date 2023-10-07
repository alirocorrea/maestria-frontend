import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-modal-prorroga',
    templateUrl: './modal-prorroga.component.html',
    styleUrls: ['./modal-prorroga.component.scss'],
})
export class ModalProrrogaComponent implements OnInit {

    constructor(
        private config: DynamicDialogConfig,
        private ref: DynamicDialogRef,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {}
}
