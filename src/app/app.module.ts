import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './page/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentComponent } from './components/content/content.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldControl} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { StarsComponent } from './components/stars/stars.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule } from '@angular/material/checkbox';
import {MatCardModule}  from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { NgImageSliderModule } from 'ng-image-slider';
import { AccommodationDetailsComponent } from './page/accommodation-details/accommodation-details.component';
import { LoginComponent } from './page/login/login.component';
import { RegistrationComponent } from './page/registration/registration.component';
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';
import { AgmCoreModule } from '@agm/core';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { AccommodationAddComponent } from './accommodation/accommodation-add/accommodation-add.component';
import { AccommodationEditComponent } from './accommodation/accommodation-edit/accommodation-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ContentComponent,
    StarsComponent,
    AccommodationDetailsComponent,
    LoginComponent,
    RegistrationComponent,
    SearchComponent,
    TableComponent,
    AccommodationComponent,
    AccommodationAddComponent,
    AccommodationEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatGridListModule,
    MatPaginatorModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgImageSliderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAe6_qr3ZfC1haiTsgwf8V9YPRsU12tMZ8'
    })
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
