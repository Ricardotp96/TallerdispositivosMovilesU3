import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ExploreContainerComponent
  ]
})
export class Tab2Page implements OnInit {
  usuarioLogueado: string = '';

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.usuarioLogueado = localStorage.getItem('usuarioLogueado') || 'Invitado';
  }

  segmentChanged(event: any) {
    const selectedValue = event.detail.value;
    console.log('Segment seleccionado:', selectedValue);
  }

  async logout() {
    await this.toastController.create({
      message: '👋 Sesión cerrada correctamente',
      duration: 2000,
      position: 'bottom',
      color: 'warning',
    }).then(toast => toast.present());

    localStorage.removeItem('usuarioLogueado');
    this.router.navigate(['/portada']);
  }
}
