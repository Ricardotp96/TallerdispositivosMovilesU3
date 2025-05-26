import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true, // Asegúrate de que esto esté si estás usando componentes standalone
  imports: [
    IonicModule, // ✅ Importa todos los componentes de Ionic
    ExploreContainerComponent
  ]
})
export class Tab2Page {
  constructor() {}
  segmentChanged(event: any) {
    const selectedValue = event.detail.value;
    console.log('Segment seleccionado:', selectedValue);

    // Aquí puedes manejar el valor seleccionado
    // if (selectedValue === 'crear') { ... }
    // if (selectedValue === 'estado') { ... }
  }
}
