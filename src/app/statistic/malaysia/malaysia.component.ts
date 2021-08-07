import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SubSink } from 'subsink';
import * as moment from 'moment';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-malaysia',
  templateUrl: './malaysia.component.html',
  styleUrls: ['./malaysia.component.css']
})
export class MalaysiaComponent implements OnInit, OnDestroy {
  
  stats: any = [];
  historical: any = [];
  vaccination: any = [];
  updated: any = null;
  defaultData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  chart_deaths: ChartDataSets[] = [{data: this.defaultData, label: "Deaths"}];
  lineDeathChartLabels: Label[] = [];
  chart_cases: ChartDataSets[] = [{data: this.defaultData, label: "Cases"}];
  lineCasesChartLabels: Label[] = [];
  chart_recovered: ChartDataSets[] = [{data: this.defaultData, label: "Recovered"}];
  lineRecoveredChartLabels: Label[] = [];
  chart_vaccine: ChartDataSets[] = [{data: this.defaultData, label: "Vaccination"}];
  lineVaccineChartLabels: Label[] = [];

  lineChartOptions: (ChartOptions) = {
    responsive: true,
  };
  lineDeathChartColors: Color[] = [
    {
      borderColor: 'black',
    },
  ];
  lineCasesChartColors: Color[] = [
    {
      borderColor: 'orange',
    },
  ];
  lineRecoveredChartColors: Color[] = [
    {
      borderColor: 'green',
    },
  ];
  lineVaccineChartColors: Color[] = [
    {
      borderColor: 'blue',
    },
  ];
  lineChartLegend = true;
  lineChartType = 'line';
  lineChartPlugins = [];
  
  private subs = new SubSink();

  constructor(private dsvc: DataService) {
    this.dsvc.loader = true;
   }

  ngOnInit() {
    this.getMalaysiaStats();
    this.getMalaysiaHistoricalStats();
    // this.getMalaysiaVaccinationStats();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  numberWithCommas(x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
  }

  getMalaysiaStats () {

    this.stats = [];
    this.subs.sink = this.dsvc.getAll('/countries/malaysia').subscribe(
      data => {
        this.stats = data;
        this.stats.updated = moment(this.stats.updated).format('DD-MM-YYYY h:mm A');
        this.stats.todayDeaths = this.numberWithCommas(this.stats.todayDeaths);
        this.stats.todayCases = this.numberWithCommas(this.stats.todayCases);
        this.stats.todayRecovered = this.numberWithCommas(this.stats.todayRecovered);
        this.stats.active = this.numberWithCommas(this.stats.active);
        this.stats.cases = this.numberWithCommas(this.stats.cases);
        this.stats.deaths = this.numberWithCommas(this.stats.deaths);
        this.stats.critical = this.numberWithCommas(this.stats.critical);
        
    }),
    error => {
      alert('Data unreachable!');
      this.dsvc.loader = false;
      console.log({'err':error});
    };
    
  }

  getMalaysiaHistoricalStats () {

    this.stats = [];
    this.subs.sink = this.dsvc.getAll('/historical/malaysia').subscribe(
      data => {
        this.historical = data['timeline'];

        this.lineChartOptions = {
          responsive: true,
          scales: {
              yAxes: [{
                  ticks: {
                      stepSize: 1,
                  }
              }]
            }
        };

        this.chart_deaths = [];
        this.chart_cases = [];
        this.chart_recovered = [];

        if (this.historical.deaths) {
          
          this.lineDeathChartLabels = Object.keys(this.historical.deaths).filter(k => { return k });
          this.chart_deaths.push({ data: Object.values(this.historical.deaths).filter(v => { return v }), label: "Deaths" });
        }

        if (this.historical.cases) {
          this.lineCasesChartLabels = Object.keys(this.historical.cases).filter(k => { return k });
          this.chart_cases.push({ data: Object.values(this.historical.cases).filter(v => { return v }), label: "Cases" });
        }

        if (this.historical.recovered) {
          this.lineRecoveredChartLabels = Object.keys(this.historical.recovered).filter(k => { return k });
          this.chart_recovered.push({ data: Object.values(this.historical.recovered).filter(v => { return v }), label: "Recovered" });
        }
      this.dsvc.loader = false;
        
      window.scrollTo(0, 0);
    }),
    error => {
      alert('Data unreachable!');
      this.dsvc.loader = false;
      console.log({'err':error});
    };
    
  }

  getMalaysiaVaccinationStats () {

    this.vaccination = [];
    this.subs.sink = this.dsvc.getAll('/vaccine/coverage/countries/malaysia').subscribe(
      data => {
        this.vaccination = data['timeline'];

        this.lineChartOptions = {
          responsive: true,
          scales: {
              yAxes: [{
                  ticks: {
                      stepSize: 1,
                  }
              }]
            }
        };

        if (this.vaccination) {
          
          this.lineVaccineChartLabels = Object.keys(this.vaccination).filter(k => { return k });
          this.chart_vaccine.push({ data: Object.values(this.vaccination).filter(v => { return v }), label: "Vaccination" });
        }
        
      this.dsvc.loader = false;

    }),
    error => {
      alert('Data unreachable!');
      this.dsvc.loader = false;
      console.log({'err':error});
    };
    
  }

}
