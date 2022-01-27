import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ServicioService } from '../../../../../services/servicio.service';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-editar-tus-datos',
  templateUrl: './editar-tus-datos.page.html',
  styleUrls: ['./editar-tus-datos.page.scss'],
})
export class EditarTusDatosPage implements OnInit {

  public previsualizacion= '../../../../../../assets/img/avatar.jpg';
  public customer_id = localStorage.getItem('currentUserSoluna');
  public cliente;

  public datos = this.fb.group({
    name: ['', [Validators.required] ],
    surname: ['', [Validators.required] ],
    email: ['', [Validators.required] ],
    phone: ['', [Validators.required] ],
    id_card: ['', [Validators.required] ],
    bank_account: [''],
    customer_id: []
  })

  constructor(private modalController: ModalController,
    public sanitizer: DomSanitizer, private _service: ServicioService, private fb: FormBuilder,
    private alertController: AlertController) { }

  ngOnInit() {
    this.getCliente();
  }

  getCliente() {

    this._service.getCustomerById(this.customer_id).subscribe( res => {
    // this._service.getCustomerById(5211).subscribe( res => {
      this.cliente = res[0];
      // console.log(res[0]);
      
      this.datos.get('name').setValue(this.cliente.name);
      this.datos.get('surname').setValue(this.cliente.surname);
      this.datos.get('email').setValue(this.cliente.email);
      this.datos.get('phone').setValue(this.cliente.phone);
      this.datos.get('id_card').setValue(this.cliente.id_card);
      this.datos.get('bank_account').setValue(this.cliente.bank_account);
      this.datos.get('customer_id').setValue(this.customer_id);

      if (this.cliente.photo) {

        this.previsualizacion = "https://belife.io/cust_photo/" + this.cliente.photo;
        
      }

    }, error =>{
      console.log(error);
    })
  }

  guardar() {
    // console.log(this.datos.value);
    // console.log(JSON.stringify( this.datos.value));
    // console.log(JSON.parse( JSON.stringify(this.datos.value)));

    // Los posts en la api solo funcionan con formData, ni idea de por qué, da igual el header que ponga
    let updated = new FormData()
    updated.append('name', this.datos.get('name').value);
    updated.append('surname', this.datos.get('surname').value);
    updated.append('email', this.datos.get('email').value);
    updated.append('phone', this.datos.get('phone').value);
    updated.append('id_card', this.datos.get('id_card').value);
    updated.append('bank_account', this.datos.get('bank_account').value);
    updated.append('customer_id', this.datos.get('customer_id').value);

    this._service.updateCustomerData(updated).subscribe( async res => {

      const alert = await this.alertController.create({
        cssClass: 'confirmarCambiar',
        header: 'Datos actualizados correctamente',
        buttons: [{
          cssClass: 'confirmarCambiarBoton',
          text: 'OK',
          handler: () => {
            this.dismiss();
          } 
        }]
      });

      await alert.present();

    })
  }

  /*----------------------------------METODOS PARA LA FOTO DE PERFIL------------------------- */
  fileChangeEvent(fileInput: any) {
      const archivo= fileInput.target.files[0];
      this.extraerBase64(archivo).then((imagen: any) =>{
        this.previsualizacion = imagen.base;
      });
    }

    extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result
          });
        };
        reader.onerror = error => {
          resolve({
            base: null
          });
        };
      } catch (e) {
        return null;
      }
    });

    /*----------------------------------CERRAR MODAL------------------------- */
  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
