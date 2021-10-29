import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/core/services/connection/connection.service';
import { BAJA_ANALISIS_BLANK } from 'src/app/core/interfaces/baja';

@Component({
  selector: 'app-bajas-analisis',
  templateUrl: './bajas-analisis.component.html',
  styleUrls: ['./bajas-analisis.component.scss']
})
export class BajasAnalisisComponent implements OnInit {

  basicData: any;
  basicOptions: any;
  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  mostrar = false;
  labels = [];
  bajas = [];
  altas = [];

  bajasAnalisis = [];

  constructor(private connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.basicData = {
      labels: [],
      datasets: [
          {
              label: 'Bajas',
              data: [],
              fill: false,
              borderColor: '#42A5F5',
              tension: .4
          },
          {
              label: 'Altas',
              data: [],
              fill: false,
              borderColor: '#FFA726',
              tension: .4
          }
      ]
  };
  this.obtenerBajas();
  }

  obtenerBajas(){
    this.connectionService.getBajasAnalisis().subscribe((res => {
        if(res.bajas.length > 0){
          res.bajas.forEach(solicitud => {
            var bajaAnalisis = BAJA_ANALISIS_BLANK();
            bajaAnalisis.mes = solicitud.mes - 1;
            bajaAnalisis.año = solicitud.año;
            bajaAnalisis.bajas = solicitud.numBajas;
            this.bajasAnalisis.push(bajaAnalisis);
        });
      }   
        if(res.altas.length > 0){
          res.altas.forEach(alta => {
            var bajaAnalisis = BAJA_ANALISIS_BLANK();
            bajaAnalisis.mes = alta.mes - 1;
            bajaAnalisis.año = alta.año;
            bajaAnalisis.altas = alta.numAltas;

            var enc = this.bajasAnalisis.filter(bajaAdd => bajaAdd.mes === bajaAnalisis.mes && bajaAdd.año === bajaAnalisis.año);
            if(enc.length === 0){
              this.bajasAnalisis.push(bajaAnalisis);
            } else {
              var index = this.bajasAnalisis.indexOf(enc[0]);
              this.bajasAnalisis[index].altas = bajaAnalisis.altas;
            }
          });
          this.ordenarArray();
          this.bajasAnalisis.forEach(element => {
            this.basicData.labels.push(this.meses[element.mes] + " " + element.año);
            this.basicData.datasets[0].data.push(element.bajas);
            this.basicData.datasets[1].data.push(element.altas);
          });
        }
        this.mostrar =true;
    }), (err => {
     
    }));
  }


  applyLightTheme() {
    this.basicOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
  
  }

  ordenarArray(){
    this.bajasAnalisis.sort(function (a, b) {
      if(a.año > b.año){
        return 1;
      } else if(a.año === b.año){
        if(a.mes > b.mes){
          return 1;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
  })
  }

}
