import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/core/services/connection/connection.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';

@Component({
  selector: 'app-epis-analisis',
  templateUrl: './epis-analisis.component.html',
  styleUrls: ['./epis-analisis.component.scss']
})
export class EpisAnalisisComponent implements OnInit {

  data: any;

  chartOptions: any;
  mostrar = false;

  constructor(private connectionService: ConnectionService, private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.data = {
      labels: [],
      datasets: [
          {
              data: [],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#66BB6A"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#66BB6A"
              ]
          }
      ]
  };
    this.chartOptions = this.getLightTheme();
  this.obtenerEpis();
  }


  obtenerEpis(){
    var idSucursal = this.utilsService.obtenerIdUsuarioByToken(sessionStorage.getItem('token'));
    var params = [];
    params.push(idSucursal);
    params.push(this.utilsService.parseFecha(new Date()));
    this.connectionService.getEpisAnalisis(params).subscribe((res => {
      if(res.epis != undefined){
        if(res.epis.length > 0){
          res.epis.forEach(epi => {
          this.data.labels.push(epi.descripcion + " (Stock mínimo: " + epi.minimo +")");
          this.data.datasets[0].data.push(epi.cantidad);
        });
        this.mostrar =true;
        }
      }
    }), (err => {
    }));
  }

  getLightTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    }
}

}
