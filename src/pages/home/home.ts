import { Component } from '@angular/core';
import { NavController, ToastController, ModalController, Events } from 'ionic-angular';
import { AdultUserComponent } from '../../components/adult-user/adult-user';
import { EventsListPage } from '../events-list/events-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // variable para recoger el nombre de usuario y pasarlo al componente 'adult-user'
  userName : string = "";

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public modalCtrl: ModalController, public events: Events) {

  }
  // Método que se ejecuta cuando seleccionamos el link "forgotten password", lanza un toast
  forgottenPass(){
    let toast = this.toastCtrl.create({
      message: 'We have sent you an email. Check your inbox and follow de link to reset your password',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  /**
   * Método que se ejecuta al hacer clic en el botón de 'login'. Confirma que haya al menos un nombre de usuario
   * Si el nombre falta, lanza un toast para avisar al usuario. Si el nombre existe, lanza el componente para confirmar
   * que el usuario es adulto. Si confirma que es adulto le lleva a la página con el listado de eventos
   */
  login(){
    if (this.userName === ""){
      let toast = this.toastCtrl.create({
        message: 'Please enter your name',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    } else {
      let modal = this.modalCtrl.create(AdultUserComponent, {userName: this.userName},
        {
          enableBackdropDismiss : false
        });
      modal.onDidDismiss( data=>{
        if(data){
          if(data.result === 'goToEvents'){
            // Si confirma que es adulto. Vamos a la pantalla de eventos
            this.navCtrl.push(EventsListPage, {userName: this.userName});
            console.log("your selection is " + data.result);
          } else if (data.result === 'backToLogin') { // si no es adulto, vuelve a la pantalla de login
            let toast = this.toastCtrl.create({
              message:'You are not old enough!',
              duration: 2000,
              position: 'Botom'
            });
            this.navCtrl.push(HomePage);
            toast.present();
            console.log("your selection is " + data.result);
          }
        }
      } );
      modal.present();
    }
    console.log(this.userName);

  }
  /**
   * Método para registrar un usuario nuevo. No implementado, simplemente muestra un toast
   */
  signUp(){
    let toast = this.toastCtrl.create({
      message:'Check your inbox to confirm your account!',
      duration: 2000,
      position: 'Botom'
    });
    toast.present();
  }

}
