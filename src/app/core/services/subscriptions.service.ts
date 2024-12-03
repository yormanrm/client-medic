import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  
  public unsubscription(suscription: Subscription){
    if(suscription){
      console.log("all subscription eliminated");
      suscription.unsubscribe();
    }
  }

}