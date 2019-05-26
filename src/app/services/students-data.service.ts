import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Student } from '../clases/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsDataService {

  url = environment.url;
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
});
  constructor(private http: HttpClient) { }

  public getStudents(): Observable<Student> {
    const url = this.url + 'students';
    return this.http.get<Student>(`${url}`);
  }

  public getStudentById(id): Observable<Student> {
    const url = this.url + 'student/' + id;
    return this.http.get<Student>(`${url}`);
  }

  public editStudent(pay, id): Observable<Student> {
    const url = this.url + 'student/' + id;
    const data = {money: pay};
    return this.http.put<Student>(`${url}`, data);
  }

  public addStudent(data): Observable<Student> {
    const url = this.url + 'student';
    // const data = {};
    return this.http.post<Student>(`${url}`, data);
  }
}
