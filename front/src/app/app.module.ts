import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModuleComponent } from './components/module/module.component';
import { HttpClientModule } from '@angular/common/http';
import { GroupComponent } from './components/group/group.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { GroupFormComponent } from './components/groupform/groupform.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatOptionModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule, DatePipe} from '@angular/common';
import { NestedGridComponent } from './components/nested-grid/nested-grid.component';
import { SubmoduleformComponent } from './components/submoduleform/submoduleform.component';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { AddgroupComponent } from './components/addgroup/addgroup.component';
import { ModuleFormComponent } from './components/moduleform/moduleform.component';
import { MatChipsModule } from '@angular/material/chips';
import { UserManagmentComponent } from './components/user-managment/user-managment.component';
import { MatSortModule } from '@angular/material/sort';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorComponent } from './components/error/error.component';
import { UpdatesubmodulemodalComponent } from './components/updatesubmodulemodal/updatesubmodulemodal.component';
import {FonctionformComponent} from './components/fonctionform/fonctionform.component';
import { UpdatefunctionmodalComponent } from './components/updatefunctionmodal/updatefunctionmodal.component';
import { RapportComponent } from './components/rapport/rapport.component';
import { FunctionDetailsComponent } from './components/function-details/function-details.component';
import { UserRapportsComponent } from './components/user-rapports/user-rapports.component';
import { MatCardModule } from '@angular/material/card';
import { ListUserRapportsComponent } from './components/list-user-rapports/list-user-rapports.component';
import { ConfirmationDialogComponentComponent } from './components/confirmation-dialog-component/confirmation-dialog-component.component';
import { ChartComponent } from './components/chart/chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FunctionChartsComponent } from './components/function-charts/function-charts.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './auth.intercepter';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TableDialogComponent } from './components/table-dialog/table-dialog.component';
import { GroupdetailsComponent } from './components/groupdetails/groupdetails.component';
import { AssignModuleDialogComponent } from './components/assign-module-dialog/assign-module-dialog.component';
import { AssignfunctiondialogComponent } from './components/assignfunctiondialog/assignfunctiondialog.component';
import { UpdategroupformComponent } from './components/updategroupform/updategroupform.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './LoaderInterceptor';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OrderFunctionComponent } from './components/order-function/order-function.component';
import { OrderUserChartsComponent } from './components/order-user-charts/order-user-charts.component';
import { PaginatedTableComponent } from './components/paginated-table/paginated-table.component';
import { TestChartsComponent } from './components/test-charts/test-charts.component';
import { MapComponent } from './components/map/map.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { KpiChartComponent } from './components/kpi-chart/kpi-chart.component';
import { PassResetComponent } from './components/pass-reset/pass-reset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';

@NgModule({
  declarations: [
    AppComponent,
    ModuleComponent,
    GroupComponent,
    GroupFormComponent,
    NestedGridComponent,
    AddgroupComponent,
    SubmoduleformComponent,
    ModuleFormComponent,
    UserManagmentComponent,
    UserDialogComponent,
    HomeComponent,
    ErrorComponent,
    UpdatesubmodulemodalComponent,
    FonctionformComponent,
    UpdatefunctionmodalComponent,
    RapportComponent,
    FunctionDetailsComponent,
    UserRapportsComponent,
    ListUserRapportsComponent,
    ConfirmationDialogComponentComponent,
    ChartComponent,
    FunctionChartsComponent,
    LoginComponent,
    TableDialogComponent,
    GroupdetailsComponent,
    AssignModuleDialogComponent,
    AssignfunctiondialogComponent,
    UpdategroupformComponent,
    ForgotPassComponent,
    LoaderComponent,
    OrderFunctionComponent,
    OrderUserChartsComponent,
    PaginatedTableComponent,
    TestChartsComponent,
    MapComponent,
    ProfileComponent,
    KpiChartComponent,
    PassResetComponent,
    DashboardComponent,
    PasswordResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    FontAwesomeModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatOptionModule,
    MatCheckboxModule,
    MatSelectModule,
    CommonModule,
    TableModule,
    SharedModule,
    TreeTableModule,
    MatChipsModule,
    MatSortModule,
    MatCardModule,
    HighchartsChartModule,
    NgbCollapseModule,
    DragDropModule,
    MatAutocompleteModule,
    ToastrModule.forRoot(),
    TimepickerModule.forRoot()  
  ],
  providers: [
    CookieService,
    AuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
