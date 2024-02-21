import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { TodosPageComponent } from './todos-page/todos-page.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {path:'',component:LoginSignupComponent},
  {path:'loginsignup',component:LoginSignupComponent},
  {path:'todo',component:TodosPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}