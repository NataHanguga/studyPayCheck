import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { MainComponent } from './components/main/main.component';
import { TableComponent } from './components/table/table.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'list', component: ListComponent},
  {path: 'table', component: TableComponent },
  {path: 'menu', component: MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
