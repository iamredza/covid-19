import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SubSink } from 'subsink';
import * as moment from 'moment';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit, OnDestroy {

  worldData: any = [];
  
  private subs = new SubSink();
  
  constructor(private dsvc: DataService) {
    this.dsvc.loader = true;
  }

  ngOnInit() {
    this.getWorldStats();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  numberWithCommas(x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
  }

  getWorldStats () {

    this.worldData = [];
    this.subs.sink = this.dsvc.getAll('/countries').subscribe(
      data => {
        this.worldData = data;

        if (this.worldData) {
          this.worldData.filter(wd => {
            wd.todayDeaths = this.numberWithCommas(wd.todayDeaths);
            wd.todayCases = this.numberWithCommas(wd.todayCases);
            wd.todayRecovered = this.numberWithCommas(wd.todayRecovered);
            wd.active = this.numberWithCommas(wd.active);
            wd.cases = this.numberWithCommas(wd.cases);
            wd.deaths = this.numberWithCommas(wd.deaths);
            wd.critical = this.numberWithCommas(wd.critical);
            wd.updated = moment(wd.updated).format('DD-MM-YYYY h:mm A');
          })
        }
        this.dsvc.loader = false;
        // console.log('worldData', this.worldData);
        
    }),
    error => {
      this.dsvc.loader = false;
      alert('Data unreachable!');
      console.log({'err':error});
    };
    
  }

}
