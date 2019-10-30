import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableListComponent } from './table-list/table-list.component';
import { CreateTableComponent } from './create-table/create-table.component';


const routes: Routes = [{
  path: '',
  component: TableListComponent
},{
  path: 'create-table',
  component: CreateTableComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
