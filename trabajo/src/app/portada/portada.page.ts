import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonItem,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.page.html',
  styleUrls: ['./portada.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonItem,
    IonIcon
  ]
})
export class PortadaPage implements OnInit {
  usuario: string = '';
  password: string = '';

  constructor(private router: Router, private toastController: ToastController) {}

  ngOnInit() {}

  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: color,
    });
    await toast.present();
  }

  iniciarSesion() {
    if (this.usuario === 'rtapia' && this.password === '12345') {
      localStorage.setItem('usuarioLogueado', this.usuario);
      this.presentToast('✅ Bienvenido rtapia', 'success');
      this.router.navigate(['/tabs/tab2']);

    } else if (
      (this.usuario === 'sborda' && this.password === '123456') ||
      (this.usuario === 'lgardel' && this.password === 'gardel')
    ) {
      localStorage.setItem('usuarioLogueado', this.usuario);
      this.presentToast(`✅ Bienvenido ${this.usuario}`, 'success');
      this.router.navigate(['/tabs/tab1']);

    } else {
      this.presentToast('❌ Usuario o contraseña incorrectos', 'danger');
    }
  }
}
