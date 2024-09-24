import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {
  public map: mapboxgl.Map | undefined;
  public style = 'mapbox://styles/mapbox/streets-v11';
  private geocodingClient: any;
  cargandoGeo = false;

  nomServicio = '';

  post = {
    coords: null as string | null,
    posicion: false
  };

  constructor(private servicio: UserService, private geolocation: Geolocation) {
    (mapboxgl as any).accessToken = environment.MAPBOX_API_KEY;
    this.geocodingClient = MapboxGeocoding({ accessToken: environment.MAPBOX_API_KEY });
  }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.cargandoGeo = false;
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      this.post.coords = coords;
      this.mapa([

        { latitude: -41.1334722, longitude: -71.3102778, nombres: 'Centro Cívico', celular: '+56 9 2944 39393939' },

      ]);
    }).catch((error) => {
      console.log('Error getting location', error);
      this.cargandoGeo = false;
    });
  }

  mapa(coordenadas: { latitude: number, longitude: number, nombres: string, celular: string }[]) {
    this.map = new mapboxgl.Map({
      container: 'mapComb',
      style: this.style,
      zoom: 12,
      center: [coordenadas[0].longitude, coordenadas[0].latitude]
    });

    // Añadir marcadores al mapa
    coordenadas.forEach(coord => {
      if (this.map) {
        const marker = new mapboxgl.Marker()
          .setLngLat([coord.longitude, coord.latitude])
          .addTo(this.map);

          const popup = new mapboxgl.Popup({ closeOnClick: false })
          .setHTML(`
            <div style="background-color: orange; color: black; padding: 10px; border-radius: 5px;">
              <h3>${coord.nombres}</h3>
              <p>
                <a href="https://wa.me/${this.formatPhoneNumber(coord.celular)}?text=${encodeURIComponent(`Hola ${coord.nombres}, Te encontré en AVISASO y quisiera más información de tus servicios.`)}" target="_blank" style="color: white; text-decoration: none;">
                  <i class="fab fa-whatsapp" style="color: green;"></i> ${coord.celular}
                </a>
              </p>
            </div>
          `);

        marker.setPopup(popup);

      }
    });
  }

  // Método para formatear el número de celular
  formatPhoneNumber(phoneNumber: string): string {
    // Elimina todos los caracteres que no sean dígitos
    const cleaned = phoneNumber.replace(/\D/g, '');

    // Asegúrate de que el número tenga el código de país (ejemplo: +54 para Argentina)
    if (cleaned.startsWith('0')) {
      // Si el número empieza con 0, reemplázalo con el código de país
      return '54' + cleaned.substring(1);
    } else if (!cleaned.startsWith('54')) {
      // Si el número no empieza con el código de país, añádelo
      return '54' + cleaned;
    }

    return cleaned;
  }


  async consultarServivesUser() {
    const nomServicio = this.nomServicio;
    console.log(nomServicio);
    this.servicio.busquedaServiceUserOne(nomServicio).subscribe(async data => {
      console.log('Datos recibidos:', data); // Verifica la estructura de los datos recibidos
      const coordenadas = data.map((item: { latitud: number, longitud: number, nombres: string, celular: string }) => ({
        latitude: item.latitud,
        longitude: item.longitud,
        nombres: item.nombres,
        celular: item.celular
      }));
      console.log('Coordenadas:', coordenadas); // Verifica las coordenadas mapeadas
      this.mapa(coordenadas);
    });
  }
}
