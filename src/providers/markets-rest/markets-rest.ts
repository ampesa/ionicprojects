import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MarketsRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MarketsRestProvider {
  
  //String con la url para hacer la consulta 'get' sobre la Web API
  baseUrl : string = "http://localhost:53454/api/Markets/";

  constructor(public http: HttpClient) {
    
  }
  // método que ejecuta la consulta sobre los mercados según el id del evento
  getMarketsData(id){
    return this.http.get(this.baseUrl + id + "/");
  }

  /**
   * método que ejecuta la iserción de la apuesta a través de la WebApi, recibe un objeto de tipo apuesta
   * y lo envía al servidor en formato 'json' para ser introducido en la BBDD.
   * */ 
  putMarketBet(bet){

    this.http.put(this.baseUrl, bet, {
      headers: {
        responseType: "json"
      }}).subscribe();
  }

}
