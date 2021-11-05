import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/core/services/connection/connection.service';

@Component({
  selector: 'app-solicitudes-epi-analisis',
  templateUrl: './solicitudes-epi-analisis.component.html',
  styleUrls: ['./solicitudes-epi-analisis.component.scss']
})
export class SolicitudesEpiAnalisisComponent implements OnInit {

  stackedData: any;
  stackedOptions: any;
  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  labels = [];
  aprobadas = [];
  rechazadas = [];
  revision = [];
  mostrar = false;
  constructor(private connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.stackedData = {
      labels: [],
      datasets: [{
          type: 'bar',
          label: 'Aprobadas',
          backgroundColor: '#66BB6A',
          data: []
      }, {
          type: 'bar',
          label: 'Rechazadas',
          backgroundColor: '#C63737',
          data: []
      }]
  };
    this.obtenerSolicitudes();
    this.stackedOptions = {
      tooltips: {
          mode: 'index',
          intersect: false
      },
      responsive: true,
      scales: {
          xAxes: [{
              stacked: true,
          }],
          yAxes: [{
              stacked: true
          }]
      }
  };
    
  }

  obtenerSolicitudes(){
    
    this.connectionService.getSolicitudesAprobadas().subscribe((res => {
        if(res.solicitudes.length > 0){
          res.solicitudes.forEach(solicitud => {
          this.labels.push(this.meses[solicitud.mes - 1] + " " + solicitud.año);
          this.aprobadas.push(solicitud.aprobadas);
          this.rechazadas.push(solicitud.rechazadas);
        });
        this.stackedData.labels = this.labels;
        this.stackedData.datasets[0].data = this.aprobadas;
        this.stackedData.datasets[1].data = this.rechazadas;
        this.mostrar =true;
        }
          
      
    }), (err => {
    }));
  }

}
