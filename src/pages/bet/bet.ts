import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { MarketsRestProvider } from '../../providers/markets-rest/markets-rest';
import { getPath } from '../../utils/imageutils';
import { ConfirmBetComponent } from '../../components/confirm-bet/confirm-bet';

/**
 * Generated class for the BetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-bet',
  templateUrl: 'bet.html',
})
export class BetPage {

  // Variables a utilizar en la página
  selectedEvent: object;
  home: string = "";
  visitor: string = "";
  market: object;
  marketsToSelect: object[] = [];
  amount: string = "";
  overUnder: string = "";
  betType: string = "";
  selectedBet: object = {Idevent:"", Type:"", Amount:"", Over:undefined};

  constructor(public modalCtrl: ModalController, public marketsAPI: MarketsRestProvider, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

  }

  /**
   * Cada vez que se entra en la página se cargan los datos desde la Web API. Esto lo hacemos así para 
   * mostrar los datos más actualizados de cada mercado. Si el usuario apuesta, al regresar de la página de confirmación
   * podrá ver ya reflejados los cambios que ha generado su apuesta.
   */
  ionViewDidEnter() {
    this.selectedEvent = this.navParams.get('selectedEvent');
    console.log(this.selectedEvent);
    this.home = this.selectedEvent["Local"];
    console.log("home is " + this.home);
    this.visitor = this.selectedEvent["Visitor"];
    console.log("visitor is " + this.visitor);

    // Avisamos al usuario que estamos obteniendo datos de la API
    let loading = this.loadingCtrl.create({
      content: "Getting information from API..."
    });
    loading.present();
    this.marketsAPI.getMarketsData(this.selectedEvent["EventId"]).subscribe( data => {
      let markets = [];
      for (let i = 0; i<3; i++){
        markets.push(data[i]);
      }
      this.marketsToSelect = markets;
      console.log(this.marketsToSelect[0]['Type']);
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

  /**
   * Método que se lanza al hacer click en el botón Bet.
   * Primero comprueba que el usuario ha introducido los datos correspondientes a la apsuesta. Si falta alguno se lo solicita
   * con un toast.
   * Si están todos los datos, se los asigna a las variables del objeto 'selectedBet' y lo pasa al componente de confirmación ç
   * de la apuesta junto con los datos del evento.
   * Si confirma la apuesta se lanza la apuesta al servidor API y se le envía a la página de la apuesta confirmando la mismacon un toast
   * Si cancela regersa a la página de la apuesta, confirmando la cancelación con un toast
   */
  bet(){
    if(this.overUnder===""){
      let toast = this.toastCtrl.create({
        message: "You forgot to select Over or Under",
        duration: 2000,
        position: "bottom"
      });
      toast.present();
    } else if(this.betType===""){
      let toast = this.toastCtrl.create({
        message: "You may select bet type: 1.5 or 2.5 or 3.5?",
        duration: 2000,
        position: "bottom"
      });
      toast.present();
    } else if(this.amount==="0"){
      let toast = this.toastCtrl.create({
        message: "You forgot most important! You must show me the money!",
        duration: 2000,
        position: "bottom"
      });
      toast.present();
    } else {
      console.log("your bet is: Over/Under: " + this.overUnder + ", Bet Type: " + this.betType + ", Bet Amount: " + this.amount +"€");
      this.selectedBet["Idevent"] = (this.selectedEvent["EventId"]).toString();
      this.selectedBet["Type"] = this.betType;
      this.selectedBet["Amount"] = this.amount;
      if(this.overUnder==="over"){
        this.selectedBet["Over"] = "true";
      } else {
        this.selectedBet["Over"] = "false";
      }
      let modal = this.modalCtrl.create(ConfirmBetComponent, {selectedBet: this.selectedBet, selectedEvent: this.selectedEvent},
        {
          enableBackdropDismiss : false
        });
      modal.onDidDismiss( data=>{
        if(data){
          if(data.result === 'ok'){
            // Vamos a la pantalla de apuesta y mostramos toast confirmando que se ha realizado
            let toast = this.toastCtrl.create({
              message:'your bet is done!',
              duration: 2000,
              position: 'Botom'
            });
            this.marketsAPI.putMarketBet(this.selectedBet);
            this.navCtrl.push(BetPage, {selectedEvent: this.selectedEvent});
            toast.present();
            console.log("se ha realizado una apuesta");
          } else if (data.result === 'cancel') {
            let toast = this.toastCtrl.create({
              message:'bet canceled!',
              duration: 2000,
              position: 'Botom'
            });
            this.navCtrl.push(BetPage, {selectedEvent: this.selectedEvent});
            toast.present();
            console.log("se ha cancelado la apuesta");
          }
        }
      } );
      modal.present();
    }

  }
  // Método que devuelve la ruta de acceso a las imágenes, recibe el nombre del equipo por parámetro
  getImage(teamName){
    return getPath(teamName);
  }

}
