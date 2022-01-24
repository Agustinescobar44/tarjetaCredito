import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { TarjetaCredito } from '../models/TarjetaCredito';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private tarjeta = new Subject<any>();

  constructor(private firestore: AngularFirestore) { }

  guardarTarjeta(tarjeta: TarjetaCredito): Promise<any>{
      return this.firestore.collection('tarjetas').add(tarjeta)
    }

  editarTarjeta(id:string, tarjeta:any):Promise<any>{
    return this.firestore.collection('tarjetas').doc(id).update(tarjeta)
  }

  obtenerTarjetas() : Observable<any>{
    return this.firestore.collection('tarjetas', ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges();
  }

  eliminarTarjeta(id:string): Promise<any>{
    return this.firestore.collection('tarjetas').doc(id).delete();
  }
  setTarjeta(tarjeta:TarjetaCredito){
    this.tarjeta.next(tarjeta);
  }
  getTarjeta(): Observable<any> {
    return this.tarjeta;
  }
}
