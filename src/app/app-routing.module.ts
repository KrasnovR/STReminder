import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainFormComponent } from './main-form/main-form.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { UpdateFormComponent } from './update-form/update-form.component';


const routes: Routes = [
  { path: '', component: MainFormComponent },
  { path: 'create', component: CreateFormComponent },
  { path: 'update', component: UpdateFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
