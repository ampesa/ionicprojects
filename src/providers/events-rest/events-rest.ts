import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the EventsRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventsRestProvider {

  //String con la url para hacer la consulta 'get' sobre la Web API
  baseUrl : string = "http://localhost:53454/api/Events/";

  constructor(public http: HttpClient) {
    
  }

  // método que ejecuta la consulta sobre los eventos disponibles para apostar
  getEventsData(){
    return this.http.get(this.baseUrl);
  }

}
