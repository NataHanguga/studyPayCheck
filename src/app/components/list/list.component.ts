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
  studentListByTeacher: any;
  studentList: any;
  list: any;
  open = '';
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

   public selectItem(event: any) {
    console.log(event.target.value, this.studentItem.value.studentType);
    return event.target.value;
  }

  showContent(value) {
    if (this.open === value) {
      this.open = '';
      return;
    }
    this.open = value;
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
        this.getStudentsByTeacher();
        console.log(data);
      }
    );
  }

  public deleteStudent(id) {
    this.studentService.deleteStudent(id).subscribe(
      data => {
        this.getStudentsByTeacher();
        console.log(data);
      }
    );
  }

  public getStudentsByTeacher() {
    this.studentService.getStudentsByTeacher().subscribe(
      data => {
        const arr = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++) {
          arr.push({pay: data[i].arr.flat(3),
            teacher: data[i].teacher});

        }
        console.log(arr);
        this.studentListByTeacher = arr;
      }
    );
  }
}
