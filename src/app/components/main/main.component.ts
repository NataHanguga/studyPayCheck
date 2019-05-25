import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsDataService } from 'src/app/services/students-data.service';
import { Student } from 'src/app/clases/student';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  studentsData: any;
  openList: false;
  studentItem: any;
  pay: any;

  constructor(private router: Router, private studentService: StudentsDataService) { }

  ngOnInit() {
   this.getStudentsData();
  }

  goTo() {
    return this.router.navigate(['/']);
  }

  getStudentsData() {
    this.studentService.getStudents().subscribe(
      data => {
        this.studentsData = data;
        console.log(data, typeof this.studentsData);
      }
    );
  }

  getStudentById(data) {
    this.studentService.getStudentById(data._id).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      data => {
        this.studentItem = data;
        console.log(data);
      }
    );
  }

  editTeacherData(pay) {
    console.log(pay);
    this.studentService.editStudent(pay, this.studentItem._id).subscribe(
      data => {
        console.log(data);
      }
    );
    this.pay = '';
  }

}
