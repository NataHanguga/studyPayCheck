import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsDataService } from 'src/app/services/students-data.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  studentItem: FormGroup;
  submitted = false;
  studentsData: any;
  typeList = ['contract', 'beneficiary'];
  studentListByTeacher: [];
  studentList: any;
  list: any;
  open: any;
  constructor(private formBuilder: FormBuilder, private studentService: StudentsDataService) { }

  ngOnInit() {
    this.studentItem = this.formBuilder.group({
      fullName: ['', Validators.required],
      studentType: ['', Validators.required],
      teacher: ['', [Validators.required]],
      date: ['', Validators.required]
  });
    this.getStudentsByTeacher();
    console.log(this.open);
  }

  get f() { return this.studentItem.controls; }

  public getStudentsData() {
    this.studentService.getStudents().subscribe(
      data => {
        this.studentsData = data;
        console.log(data, typeof this.studentsData);
      }
    );
  }

  public selectItem(event: any) {
    console.log(event.target.value, this.studentItem.value.studentType);
    return event.target.value;
  }


  public onSubmit() {
    this.submitted = true;
    console.log(this.studentItem.value, this.studentItem.valid);
    // stop here if form is invalid
    if (this.studentItem.invalid) {
        return;
    }
    this.studentService.addStudent(this.studentItem.value).subscribe(
      data => {
        console.log(data);
      }

    );
    this.getStudentsData();

    // console.log(this.studentItem.value);

  }

  public getStudentsByTeacher() {
    this.studentService.getStudentsByTeacher().subscribe(
      data => {
        console.log(data);
        this.studentListByTeacher = data;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++) {
          const arr = data[i].arr[0];
          // this.studentList[0] = arr;
          console.log( data[i].arr[0] );
        }
      }
    );
  }
}
