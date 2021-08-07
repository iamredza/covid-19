import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MatProgressSpinnerModule,
  MatTabsModule,
} from '@angular/material';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { routes } from './app-routes';
import { RouterModule } from '@angular/router';
import { MalaysiaComponent } from './statistic/malaysia/malaysia.component';
import { WorldComponent } from './statistic/world/world.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MalaysiaComponent,
    WorldComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    MatTabsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
