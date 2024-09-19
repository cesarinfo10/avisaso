import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('direccionInput', { static: false }) direccionInput!: IonInput;

  public map: mapboxgl.Map | undefined;
  public style = 'mapbox://styles/mapbox/streets-v11';
  private geocodingClient: any;
  public sugerencias: any[] = [];

  telefono: string = '';
  correo: string = '';
  tipo_usuario: string = '';
  direccionSeleccionada: boolean = false;

  latitudSeleccionada: number | null = null;
  longitudSeleccionada: number | null = null;

  post = {
    coords: null as string | null,
    posicion: false
  };
  cargandoGeo = false;

  constructor(private geolocation: Geolocation, private router: Router,  private route: ActivatedRoute) {
    (mapboxgl as any).accessToken = environment.MAPBOX_API_KEY;
    this.geocodingClient = MapboxGeocoding({ accessToken: environment.MAPBOX_API_KEY });
  }

  ngOnInit() {
    this.getGeo();
    this.route.queryParams.subscribe(params => {
      this.telefono = params['telefono'] || '';
      this.correo = params['correo'] || '';
      this.tipo_usuario = params['tipo_usuario'] || '';
    });
  }

  getGeo() {
   /* if (!this.post.posicion) {
      this.post.coords = null;
      return;
    }*/

    this.cargandoGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      this.cargandoGeo = false;
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      this.post.coords = coords;
      this.mapa(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
      this.cargandoGeo = false;
    });
  }

  mapa(latitude: number, longitude: number) {
    this.map = new mapboxgl.Map({
      container: 'mapComb',
      style: this.style,
      zoom: 15,
      center: [longitude, latitude]
    });

    // Añadir el marcador al mapa
  /*  const marker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(this.map);*/
  }

  obtenerSugerencias(direccion: string | number | null | undefined) {
    if (direccion === null || direccion === undefined || direccion === '') {
      this.sugerencias = [];
      return;
    }

    const direccionStr = String(direccion);

    this.geocodingClient.forwardGeocode({
      query: direccionStr,
      limit: 5
    })
    .send()
    .then((response: any) => {
      this.sugerencias = response.body.features;
    })
    .catch((error: any) => {
      console.error('Error obteniendo sugerencias:', error);
      this.sugerencias = [];
    });
  }

  seleccionarSugerencia(sugerencia: any) {
    const [longitude, latitude] = sugerencia.center;

    if (this.map) {
      // Centrar el mapa en la dirección seleccionada
      this.map.setCenter([longitude, latitude]);

      // Añadir un marcador en la dirección seleccionada
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(this.map);
    }

    // Actualizar el valor del campo de entrada
    this.direccionInput.value = sugerencia.place_name;

    // Guardar las coordenadas seleccionadas
    this.latitudSeleccionada = latitude;
    this.longitudSeleccionada = longitude;

    // Limpiar las sugerencias
    this.sugerencias = [];

        // Marcar que se ha seleccionado una dirección
        this.direccionSeleccionada = true;
  }

  confirmarDireccion() {
    const direccion = this.direccionInput.value;
    console.log('Dirección confirmada:', direccion);
    // Redirigir a la página de usuario y pasar el dato de la dirección
    this.router.navigate(['/usuario'], {
      queryParams: {
        direccion,
        telefono: this.telefono,
        correo: this.correo,
        tipo_usuario: this.tipo_usuario,
        latitud: this.latitudSeleccionada,
        longitud: this.longitudSeleccionada
      }
    });
  }
}
