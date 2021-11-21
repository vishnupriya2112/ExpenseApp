import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule }   from '@angular/forms';
import { PasswordPatternDirective } from './shared/directives/password-pattern.directive';
import { MatchPasswordDirective } from './shared/directives/match-password.directive';
import { MatSelectModule } from '@angular/material/select';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthInterceptor } from './shared/guards/auth.interceptor';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { UserComponent } from './modules/user/user.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import { ProfileComponent } from './modules/profile/profile.component';
import {MatListModule} from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './modules/home/home.component';
import { AuthService } from './shared/service/auth.service';
import { RegisterComponent } from './modules/register/register/register.component';
import { LoginComponent } from './modules/login/login/login.component';
import { LoginService } from './modules/login/service/login.service';
import { EditProfileComponent } from './modules/edit-profile/edit-profile.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import {SocialLoginModule,GoogleLoginProvider,SocialAuthServiceConfig} from 'angularx-social-login'; 
import { AddItemFormComponent } from './modules/add-item-form/add-item-form.component';
import { BudgetItemCardComponent } from './modules/budget-item-list/budget-item-card/budget-item-card.component';
import { BudgetItemListComponent } from './modules/budget-item-list/budget-item-list.component';
import { EditItemModalComponent } from './modules/edit-item-modal/edit-item-modal.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';


import { ChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { StatisticsComponent } from './modules/statistics/statistics.component';
import { BarChartComponent } from './modules/bar-chart/bar-chart.component';
import { LandingPageComponent } from './modules/landing-page/landing-page.component';
import { DailyItemsComponent } from './modules/daily-items/daily-items.component';
import { MonthlyItemsComponent } from './modules/monthly-items/monthly-items.component';
import { YearlyItemsComponent } from './modules/yearly-items/yearly-items.component';
import { WeeklyItemsComponent } from './modules/weekly-items/weekly-items.component';
import { PieChartComponent } from './modules/pie-chart/pie-chart.component';
import { CompareDatesComponent } from './modules/compare-dates/compare-dates.component';
import { TableItemsComponent } from './modules/table-items/table-items.component';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    PasswordPatternDirective,
    MatchPasswordDirective,
    UserComponent,
    ProfileComponent,
    HomeComponent,
    EditProfileComponent,
    AddItemFormComponent,
    BudgetItemCardComponent,
    BudgetItemListComponent,
    EditItemModalComponent,
    PieChartComponent,
    StatisticsComponent,
    BarChartComponent,
    LandingPageComponent,
    DailyItemsComponent,
    MonthlyItemsComponent,
    YearlyItemsComponent,
    WeeklyItemsComponent,
    CompareDatesComponent,
    TableItemsComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    MatSidenavModule,
    MatDividerModule,
    MatMenuModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDialogModule,
    SocialLoginModule,
    MatPaginatorModule,
    MatSortModule,
    ChartsModule
  ],
  providers: 
  [ LoginService,
    AuthService,
    AuthGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },
  {
    provide: MatDialogRef,
    useValue: {}
  },
  // {
  //   provide: MAT_DATE_FORMATS, 
  //   useValue: MY_FORMATS
  // },
  DatePipe,
  {
    provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('464937007748-7dqsu7ri00iirilgel3nn7hriua97rhq.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig,
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
