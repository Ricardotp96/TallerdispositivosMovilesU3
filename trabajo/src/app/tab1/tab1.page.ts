/*import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonIcon,
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular/standalone';

import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    ExploreContainerComponent,
  ],
})
export class Tab1Page implements OnInit {
  segment: string = 'crear';
  usuarioLogueado: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.usuarioLogueado = localStorage.getItem('usuarioLogueado') || 'Invitado';
  }

  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }

  logout() {
    localStorage.removeItem('usuarioLogueado');
    this.router.navigate(['/portada']); // Ajusta la ruta si tu ruta login es diferente
  }
}
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonChip,
  IonSelect,
  IonSelectOption,
  ToastController,
  AlertController
} from '@ionic/angular/standalone';

import { ExploreContainerComponent } from '../explore-container/explore-container.component';

// ✅ Interface para definir la estructura de las solicitudes
interface Solicitud {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  departamento: string;
  solicitud: string;
  archivo?: string;
  fechaCreacion: Date;
  estado: 'pendiente' | 'en_proceso' | 'completada';
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonChip,
    IonSelect,
    IonSelectOption,
    ExploreContainerComponent,
    FormsModule // ✅ Agregado para usar ngModel
  ]
})
export class Tab1Page implements OnInit {
  segment: string = 'crear';
  usuarioLogueado: string = '';

  // ✅ Variables del formulario
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  departamento: string = '';
  solicitud: string = '';
  archivo: File | null = null;

  // ✅ Variables para historial y filtros
  filtroHistorial: string = '';
  filtroEstado: string = '';
  solicitudesFiltradas: Solicitud[] = [];

  // ✅ Array para almacenar las solicitudes en memoria temporal
  private solicitudes: Solicitud[] = [];

  constructor(
    private router: Router, 
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.usuarioLogueado = localStorage.getItem('usuarioLogueado') || 'Invitado';
    
    // ✅ Cargar solicitudes guardadas del localStorage
    this.cargarSolicitudes();
    
    // ✅ Inicializar lista filtrada
    this.filtrarSolicitudes();
  }

  segmentChanged(event: any) {
    this.segment = event.detail.value;
    
    // ✅ Actualizar filtros cuando se cambia a historial
    if (this.segment === 'historial') {
      this.filtrarSolicitudes();
    }
  }

  // ✅ Manejar selección de archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validar tamaño del archivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.mostrarToast('⚠️ El archivo no puede ser mayor a 5MB', 'warning');
        event.target.value = '';
        return;
      }
      
      // Validar tipos de archivo permitidos
      const tiposPermitidos = ['application/pdf', 'application/msword', 
                              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                              'image/jpeg', 'image/jpg', 'image/png'];
      
      if (!tiposPermitidos.includes(file.type)) {
        this.mostrarToast('⚠️ Tipo de archivo no permitido. Use PDF, DOC, DOCX, JPG o PNG', 'warning');
        event.target.value = '';
        return;
      }
      
      this.archivo = file;
      this.mostrarToast(`✅ Archivo "${file.name}" seleccionado`, 'success');
    }
  }

  // ✅ Crear nueva solicitud
  async crearSolicitud() {
    // Validar campos requeridos
    if (!this.nombre || !this.email || !this.telefono || !this.departamento || !this.solicitud) {
      this.mostrarToast('⚠️ Por favor completa todos los campos obligatorios (*)', 'warning');
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.mostrarToast('⚠️ Por favor ingresa un email válido', 'warning');
      return;
    }

    // ✅ Crear nueva solicitud
    const nuevaSolicitud: Solicitud = {
      id: this.generarId(),
      nombre: this.nombre.trim(),
      email: this.email.trim().toLowerCase(),
      telefono: this.telefono.trim(),
      departamento: this.departamento.trim(),
      solicitud: this.solicitud.trim(),
      archivo: this.archivo ? this.archivo.name : undefined,
      fechaCreacion: new Date(),
      estado: 'pendiente'
    };

    // ✅ Agregar a la lista y guardar
    this.solicitudes.push(nuevaSolicitud);
    this.guardarSolicitudes();

    // ✅ Mostrar confirmación
    this.mostrarToast('✅ Solicitud creada correctamente', 'success');
    
    // ✅ Limpiar formulario
    this.limpiarFormulario();

    // ✅ Actualizar lista filtrada
    this.filtrarSolicitudes();

    // ✅ Log para debug (opcional)
    console.log('Nueva solicitud creada:', nuevaSolicitud);
    console.log('Total de solicitudes:', this.solicitudes.length);
  }

  // ✅ Limpiar formulario
  limpiarFormulario() {
    this.nombre = '';
    this.email = '';
    this.telefono = '';
    this.departamento = '';
    this.solicitud = '';
    this.archivo = null;
    
    // Limpiar input de archivo
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  // ✅ Logout
  logout() {
    localStorage.removeItem('usuarioLogueado');
    this.router.navigate(['/portada']);
  }

  // ✅ Métodos auxiliares privados
  private generarId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private async mostrarToast(mensaje: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }

  private guardarSolicitudes() {
    try {
      localStorage.setItem('solicitudes', JSON.stringify(this.solicitudes));
    } catch (error) {
      console.error('Error al guardar solicitudes:', error);
      this.mostrarToast('⚠️ Error al guardar la solicitud', 'warning');
    }
  }

  private cargarSolicitudes() {
    try {
      const solicitudesGuardadas = localStorage.getItem('solicitudes');
      if (solicitudesGuardadas) {
        this.solicitudes = JSON.parse(solicitudesGuardadas);
        // ✅ Convertir fechas de string a Date objects
        this.solicitudes = this.solicitudes.map(solicitud => ({
          ...solicitud,
          fechaCreacion: new Date(solicitud.fechaCreacion)
        }));
        console.log('Solicitudes cargadas:', this.solicitudes.length);
      }
    } catch (error) {
      console.error('Error al cargar solicitudes:', error);
      this.solicitudes = [];
    }
  }

  // ✅ Método público para obtener solicitudes (para uso futuro en otras pestañas)
  public obtenerSolicitudes(): Solicitud[] {
    return [...this.solicitudes]; // Retorna una copia para evitar mutaciones
  }

  // ✅ Método público para obtener estadísticas (para uso futuro)
  public obtenerEstadisticas() {
    return {
      total: this.solicitudes.length,
      pendientes: this.solicitudes.filter(s => s.estado === 'pendiente').length,
      enProceso: this.solicitudes.filter(s => s.estado === 'en_proceso').length,
      completadas: this.solicitudes.filter(s => s.estado === 'completada').length
    };
  }

  // ✅ MÉTODOS PARA HISTORIAL

  // Filtrar solicitudes según texto y estado
  filtrarSolicitudes() {
    let solicitudesFiltradas = [...this.solicitudes];

    // Filtrar por texto (nombre o email)
    if (this.filtroHistorial.trim()) {
      const filtroTexto = this.filtroHistorial.toLowerCase().trim();
      solicitudesFiltradas = solicitudesFiltradas.filter(solicitud => 
        solicitud.nombre.toLowerCase().includes(filtroTexto) ||
        solicitud.email.toLowerCase().includes(filtroTexto) ||
        solicitud.departamento.toLowerCase().includes(filtroTexto)
      );
    }

    // Filtrar por estado
    if (this.filtroEstado) {
      solicitudesFiltradas = solicitudesFiltradas.filter(solicitud => 
        solicitud.estado === this.filtroEstado
      );
    }

    // Ordenar por fecha (más recientes primero)
    solicitudesFiltradas.sort((a, b) => 
      new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()
    );

    this.solicitudesFiltradas = solicitudesFiltradas;
  }

  // Limpiar filtros
  limpiarFiltros() {
    this.filtroHistorial = '';
    this.filtroEstado = '';
    this.filtrarSolicitudes();
  }

  // Cambiar estado de una solicitud
  async cambiarEstado(solicitud: Solicitud, nuevoEstado: 'pendiente' | 'en_proceso' | 'completada') {
    const estadoAnterior = solicitud.estado;
    solicitud.estado = nuevoEstado;
    
    this.guardarSolicitudes();
    this.filtrarSolicitudes();
    
    const textoEstado = this.obtenerTextoEstado(nuevoEstado);
    this.mostrarToast(`✅ Estado cambiado a "${textoEstado}"`, 'success');
  }

  // Eliminar solicitud
  async eliminarSolicitud(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar esta solicitud? Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.solicitudes = this.solicitudes.filter(s => s.id !== id);
            this.guardarSolicitudes();
            this.filtrarSolicitudes();
            this.mostrarToast('✅ Solicitud eliminada', 'success');
          }
        }
      ]
    });

    await alert.present();
  }

  // Formatear fecha para mostrar
  formatearFecha(fecha: Date): string {
    const fechaObj = new Date(fecha);
    const ahora = new Date();
    const diferenciaDias = Math.floor((ahora.getTime() - fechaObj.getTime()) / (1000 * 60 * 60 * 24));

    if (diferenciaDias === 0) {
      return `Hoy, ${fechaObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diferenciaDias === 1) {
      return `Ayer, ${fechaObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diferenciaDias < 7) {
      return `Hace ${diferenciaDias} días`;
    } else {
      return fechaObj.toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }

  // Obtener color según estado
  obtenerColorEstado(estado: string): string {
    switch (estado) {
      case 'pendiente': return 'warning';
      case 'en_proceso': return 'tertiary';
      case 'completada': return 'success';
      default: return 'medium';
    }
  }

  // Obtener icono según estado
  obtenerIconoEstado(estado: string): string {
    switch (estado) {
      case 'pendiente': return 'time';
      case 'en_proceso': return 'sync';
      case 'completada': return 'checkmark-circle';
      default: return 'help-circle';
    }
  }

  // Obtener texto según estado
  obtenerTextoEstado(estado: string): string {
    switch (estado) {
      case 'pendiente': return 'Pendiente';
      case 'en_proceso': return 'En Proceso';
      case 'completada': return 'Completada';
      default: return 'Desconocido';
    }
  }
}