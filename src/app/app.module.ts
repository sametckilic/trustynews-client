import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HomeModule } from './components/home/home.module';
import { FooterComponent } from './components/footer/footer.component';
import { SingleNewsModule } from './components/single-news/single-news.module';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
    SingleNewsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
