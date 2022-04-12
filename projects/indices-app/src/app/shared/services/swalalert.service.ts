import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SwalalertService {

  constructor(

  ) { }

  showError(title?: string, text?: string, confirmButtonText?: string, link?: string, titleLink?: string) {
    setTimeout(() => {
      this.closeSwal();
      Swal.fire({
        title: (title) ? title : 'Error',
        text: (text) ? text : 'Ha ocurrido un error inesperado, vuelve a intentar',
        icon: 'error',
        confirmButtonText: (confirmButtonText) ? confirmButtonText : 'Continuar',
        footer: (link) ? `<a href="${link}" target="_blank">${titleLink}</a>` : null,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
      })
    }, 1000);

  }
  /**
   *
   * @param title titulo optativo
   * @param confirmButtonText  texto del boton
   * @param link accion del boton
   * @param titleLink nombre del boton de redireccion
   */
  showSuccess(title?: string, confirmButtonText?: string, link?: string, titleLink?: string) {
    setTimeout(() => {
      return Swal.fire({
        icon: 'success',
        title: (title) ? title : 'Proceso finalizado exitosamente',
        showConfirmButton: (confirmButtonText) ? true : false,
        timer: (confirmButtonText) ? null : 2500,
        confirmButtonText: (confirmButtonText) ? confirmButtonText : null,
        footer: (link) ? `<a href="${link}" target="_blank">${titleLink}</a>` : null,
      })
    }, 1000);
  }

  showLoginSuccesss(title?: string,) {
    setTimeout(() => {
      this.closeSwal();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: (title) ? title : 'Proceso correcto'
      })
    }, 1000);
  }

  showHtml(html: string, confirmButtonText?: string, fullscreen?: boolean) {

    this.closeSwal();
    return Swal.fire({
      html: html,
      showCancelButton: (fullscreen) ? false : true,
      showConfirmButton: (confirmButtonText) ? true : false,
      confirmButtonText: (confirmButtonText) ? confirmButtonText : 'Continuar',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      grow: (fullscreen) ? 'fullscreen' : false,
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
    })


  }


  showConfirm(title?: string, text?: string, confirmButtonText?: string, icon?: SweetAlertIcon, showCancelButton?: boolean, imageUrl?: any, cancelButtonText?: string) {

    this.closeSwal();

    return Swal.fire({
      title: (title) ? title : '¿Estás seguro?',
      text: (text) ? text : 'Este proceso es irreversible',
      confirmButtonText: (confirmButtonText) ? confirmButtonText : 'Continuar',
      cancelButtonText: (cancelButtonText) ??'Cancelar',
      icon: (imageUrl)? null:   (icon) ?? 'warning',
      showCancelButton: (showCancelButton) ?? false,
      confirmButtonColor: '#d33',
      cancelButtonColor: (cancelButtonText) ? '#d33' : '#3085d6',
      imageUrl: (imageUrl)?? null,
      imageWidth: (imageUrl)? 204:null,
      imageHeight:  (imageUrl)? 204:null,
      imageAlt:  (imageUrl)? '':null,
    })
  }

  proccessSwal(title?: string) {
    Swal.fire({
      title: (title) ? title : 'Procesando datos',
      // timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },

    })

  }

  closeSwal() {
    Swal.close();

  }

}
