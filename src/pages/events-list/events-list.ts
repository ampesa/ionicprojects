import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { getPath } from '../../utils/imageutils';
import { EventsRestProvider } from '../../providers/events-rest/events-rest';
import { BetPage } from '../../pages/bet/bet';

/**
 * Generated class for the EventsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-events-list',
  templateUrl: 'events-list.html',
})
export class EventsListPage {

  // variables que recogen la información necesaria
  userName: string = "";
  eventsToBet: object [] = [];
  teamName: string = "";
  eventId: number;
  selectedEvent: object;

  constructor(public eventsAPI: EventsRestProvider, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

  }

  /**
   * Cada vez que entramos en esta página mostramos el loadingCtrl para avisar al usuario de que se están carganado datos desde la api
   * Obtenemos los datos de los eventos a através de la APi
   * */ 
  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({
      content: "Getting information from API..."
    });
    loading.present();
    this.eventsAPI.getEventsData().subscribe( data => {
      let events = [];
      for (let i = 0; i<10; i++){
        events.push(data[i]);
      }
      this.eventsToBet = events;
      console.log(this.eventsToBet[0]['Local']);
      loading.dismiss();
    }, error => {
      let toast = this.toastCtrl.create({
        message: 'Failed to get request from API' + error,
        duration: 5000,
        position: 'bottom'
      });
      toast.present();
    } );
  }

  // Método que devuelve la ruta de acceso a las imágenes, recibe el nombre del equipo por parámetro
  getImage(teamName){
    return getPath(teamName);
  }

  /**
   * Método que se ejecuta al seleccionar un partido, recibe el evento que lo lanza y lo asigna a la 
   * variable selectedEvent y se lo pasa a la página BetPage al lanzarla
   */
  eventSelection(event){
    this.selectedEvent = event;
    this.eventId = this.selectedEvent["EventId"];
    console.log(this.selectedEvent + "Id: " + this.eventId);
    this.navCtrl.push( BetPage, {selectedEvent: this.selectedEvent} );
  }

}
