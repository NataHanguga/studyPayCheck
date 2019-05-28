import { Component, OnInit } from '@angular/core';
import { StudentsDataService } from 'src/app/services/students-data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  studentsData: any;
  constructor(private studentService: StudentsDataService) { }

  ngOnInit() {
    this.getStudentsData();
  }

  getStudentsData() {
    this.studentService.getStudents().subscribe(
      data => {
        this.studentsData = data;
        console.log(data, typeof this.studentsData);
      }
    );
  }

}
