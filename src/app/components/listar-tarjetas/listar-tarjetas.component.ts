import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjetas',
  templateUrl: './listar-tarjetas.component.html',
  styleUrls: ['./listar-tarjetas.component.css']
})
export class ListarTarjetasComponent implements OnInit {

  listTarjetas: any[] = []

  constructor(private _tarjetaService: TarjetaService, private toastr: ToastrService) { }

  obtenerTarjetas(){
    this._tarjetaService.obtenerTarjetas().subscribe({
      next: data => {
        this.listTarjetas = []
        data.forEach((element:any) =>{
          this.listTarjetas.push({
            id: element.payload.doc.id,
            //se crea una copia de los datos que se trae de la consulta
            ...element.payload.doc.data()
          })

        })
        console.log(this.listTarjetas);
        
      }
    })
  }

  eliminarTarjeta(id:string){
     this._tarjetaService.eliminarTarjeta(id).then(()=>{
        this.toastr.error('La tarjeta fue eliminada con exito','Registro Eliminado')
     }, error =>{
       this.toastr.error('Oops... ocurrio un erro','No se pudo eliminar la tarjeta')
       
     })
  }

  editarTarjeta(tarjeta: TarjetaCredito){
    this._tarjetaService.setTarjeta(tarjeta);
  }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

}
