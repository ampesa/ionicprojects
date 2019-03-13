import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { BetPage } from '../pages/bet/bet';
import { EventsListPage } from '../pages/events-list/events-list';
import { AdultUserComponent } from '../components/adult-user/adult-user';
import { ConfirmBetComponent } from '../components/confirm-bet/confirm-bet';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EventsRestProvider } from '../providers/events-rest/events-rest';
import { MarketsRestProvider } from '../providers/markets-rest/markets-rest';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AdultUserComponent,
    ConfirmBetComponent,
    EventsListPage, 
    BetPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AdultUserComponent,
    ConfirmBetComponent,
    EventsListPage,
    BetPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventsRestProvider,
    MarketsRestProvider
  ]
})
export class AppModule {}
