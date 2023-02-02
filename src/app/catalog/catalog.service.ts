import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from './Curso';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  baseURL = "http://localhost:3000/cursos";

  constructor(
    private api: HttpClient,
  ) { }

  list(): Observable<Curso[]> {
    return this.api.get(this.baseURL).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  update(id: number, curso: Curso): Observable<Curso> {
    return this.api.put(this.baseURL + `/${id}`, curso).pipe(
      map((res: any) => {
        return curso;
      })
    );
  }

  create(curso: Curso): Observable<Curso> {
    return this.api.post(this.baseURL, curso).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  delete(id: number): Observable<Curso> {
    return this.api.delete(this.baseURL + `/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

}
