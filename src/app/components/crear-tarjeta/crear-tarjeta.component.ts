import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit, OnDestroy {

  form: FormGroup;
  enviando = false;
  titulo = "Agregar Tarjeta";
  id: string|undefined;

  constructor(private fb:FormBuilder, private _tarjetaService: TarjetaService , private toastr: ToastrService) { 
    this.form = this.fb.group({
      titular:['',Validators.required],
      numeroTarjeta:['',[
          Validators.required, 
          Validators.maxLength(16),
          Validators.minLength(16)
      ]],
      fechaExpiracion:['',[
          Validators.required, 
          Validators.maxLength(5),
          Validators.minLength(5)
      ]],
      cvv:['',[
        Validators.required, 
        Validators.maxLength(3),
        Validators.minLength(3)
    ]]
    })

  }
  ngOnDestroy(): void {

  }
  ngOnInit(): void {
    this.escucharEdit();

  }
  escucharEdit(){
    this._tarjetaService.getTarjeta().subscribe({
      next: d=>{
        this.titulo="Editar Tarjeta"
        this.id = d.id;
        this.form.patchValue({
          titular: d.titular,
          numeroTarjeta: d.numeroTarjeta,
          fechaExpiracion: d.fechaExpiracion,
          cvv: d.cvv
        })
        
      }
    });
  }
  

  guardarTarjeta(){
    this.enviando = true;

    if(this.id===undefined){
      this.agregarTarjeta();
    }else{
      this.editarTajeta(this.id)
    }
  }

  editarTajeta(id:string){
    const TARJETA: any = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaActualizacion : new Date()
    };

    this._tarjetaService.editarTarjeta(id, TARJETA).then(()=>{
      this.enviando =false 
      this.titulo = "Agregar tarjeta";
      this.form.reset();
      this.id = undefined
      this.toastr.info('La tarjeta fue actualizada con exito','Registro actualizado')
    },error=>{
      this.enviando =false 
      this.toastr.error('Oops... ocurrio un error', 'Error');

    })
  }

  cancelEdit(){
    this.enviando =false 
    this.titulo = "Agregar tarjeta";
    this.form.reset();
    this.id = undefined
  }

  agregarTarjeta(){
    const TARJETA: TarjetaCredito = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaCreacion : new Date(),
      fechaActualizacion : new Date()
    };

    this._tarjetaService.guardarTarjeta(TARJETA).then(()=>{
      this.form.reset();
      this.toastr.success('Tarjeta registrada con exito!','Tarjeta Registrada');
      this.enviando= false
    },() =>{
      this.toastr.error('Oops... ocurrio un error', 'Error');
      this.enviando= false
      
    })
  }
}
