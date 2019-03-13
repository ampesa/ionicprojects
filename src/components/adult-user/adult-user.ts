import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AdultUserComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'adult-user',
  templateUrl: 'adult-user.html'
})

export class AdultUserComponent {

  // variable que recoge el nombre de usuario
  userName: string;

  constructor( public navParams: NavParams, public viewCtrl: ViewController ) {

  }

  ionViewDidEnter(){
    // recogemos el nombre de usuario y lo pasamos a la variable userName
    this.userName = this.navParams.get('userName');
  }

  /**
   * Si selecciona 'yes' el resultado que devolvemos es ir a la página de eventos
   */
  goToEvents(){
    this.viewCtrl.dismiss({result: "goToEvents"});
    console.log("your selection is go to Events");
  }

  /**
   * Si selecciona no, le devolvemos a la página de login
   */
  backToLogin(){
    this.viewCtrl.dismiss({result: "backToLogin"});
    console.log("your selection is back to Login");
  }

}
