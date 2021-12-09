import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-editar-bancarios',
  templateUrl: './editar-bancarios.page.html',

  styleUrls: ['./editar-bancarios.page.scss'],
})
export class EditarBancariosPage implements OnInit {

  public previsualizacion= '../../../../../../assets/img/avatar.jpg';

  constructor(private modalController: ModalController,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {
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
