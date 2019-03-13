import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { getPath } from '../../utils/imageutils';

/**
 * Generated class for the ConfirmBetComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'confirm-bet',
  templateUrl: 'confirm-bet.html'
})
export class ConfirmBetComponent {

  selectedBet: object;
  selectedEvent: object;
  home: string = "";
  visitor: string = "";
  betType: string = "";
  overUnder: string = "";
  amount: string = "";

  constructor(public navParams: NavParams, public viewCtrl: ViewController ) {

  }

  /**
   * Al crear el componente recogemos en las variables los valores enviados por la BetPage
   */
  ionViewDidEnter(){
    this.selectedBet = this.navParams.get('selectedBet');
    this.selectedEvent = this.navParams.get('selectedEvent');
    this.home = this.selectedEvent["Local"];
    this.visitor = this.selectedEvent["Visitor"];
    this.betType = this.selectedBet["Type"];
    if(this.selectedBet["Over"] ==="true"){
      this.overUnder = "Over";
    } else {
      this.overUnder = "Under";
    }
    this.amount = this.selectedBet["Amount"];
  }
  // Si confirma la apuesta devolvemos 'ok'
  ok(){
    this.viewCtrl.dismiss({result: "ok"});
    console.log("you confirmed your bet: ");
    console.log(this.selectedBet);
  }
  // Si cancela devolvemos 'cancel'
  cancel(){
    this.viewCtrl.dismiss({result: "cancel"});
    console.log("you canceled your bet");
  }

  // Método que devuelve la ruta de acceso a las imágenes, recibe el nombre del equipo por parámetro
  getImage(teamName){
    return getPath(teamName);
  }


}
