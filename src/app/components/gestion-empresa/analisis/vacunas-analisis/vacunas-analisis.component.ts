import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/core/services/connection/connection.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';

@Component({
  selector: 'app-vacunas-analisis',
  templateUrl: './vacunas-analisis.component.html',
  styleUrls: ['./vacunas-analisis.component.scss']
})
export class VacunasAnalisisComponent implements OnInit {

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
    this.obtenerVacunasEmpleados();
  }


  obtenerVacunasEmpleados(){
    var idSucursal = this.utilsService.obtenerIdUsuarioByToken(sessionStorage.getItem('token'));
    this.connectionService.getVacunasAnalisis(idSucursal).subscribe((res => {
      if(res.vacunas != undefined){
        if(res.vacunas.length > 0){
          this.data.datasets[0].data.push(res.vacunas[0].no_vacunados);
          this.data.labels.push('No vacunados');
          this.data.datasets[0].data.push(res.vacunas[0].pauta_completa);
          this.data.labels.push('Pauta completa');
          this.data.datasets[0].data.push(res.vacunas[0].total - res.vacunas[0].pauta_completa - res.vacunas[0].no_vacunados);
          this.data.labels.push('Sin pauta completa');

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
