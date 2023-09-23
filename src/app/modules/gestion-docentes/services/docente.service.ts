import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backend } from 'src/app/core/constants/api-url';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

    constructor(private http: HttpClient) {}

    uploadDocentes(file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post(
            backend('docentes/upload'),
            formData
        );
    }
}
