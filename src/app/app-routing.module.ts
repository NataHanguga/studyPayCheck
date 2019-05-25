import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { MainComponent } from './components/main/main.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'list', component: ListComponent},
  {path: 'table', component: TableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
