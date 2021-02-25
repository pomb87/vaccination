import { Component, OnInit } from '@angular/core';
import { VaccinationService } from '../vaccination.service';
import { MessageService } from '../message.service';
import { VaccData } from '../vaccData';
import { VaccDataEntry } from '../vaccData';
import { DataPerArea } from '../dataPerArea';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vacc-per-area',
  templateUrl: './vacc-per-area.component.html',
  styleUrls: ['./vacc-per-area.component.css']
})
export class VaccPerAreaComponent implements OnInit {

  data: VaccData;
  dataEntryList: VaccDataEntry[];
  dataPerArea: Array<DataPerArea> = [];
  title = 'Übersicht der Impfungen pro Bundesland';
  datepipe: DatePipe = new DatePipe('en-US')
  currentDataDate: Date;

  private getLastWeek() {
    var today = new Date();
    if (this.currentDataDate != null) {
      today = new Date(this.currentDataDate);
    }
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
    this.log("lastweek = " + lastWeek)
    return lastWeek;
  }

  private sortRootData(input: DataPerArea[]) {
    input.sort(function (a, b) {
      return Number(a.areaId) > Number(b.areaId) ? -1 : 1;
    });
  }

  private sortDataPerDate(input: VaccDataEntry[]) {
    input.sort(function (a, b) {
      var dateA = new Date(a.Datum).getTime();
      var dateB = new Date(b.Datum).getTime();
      return dateA > dateB ? -1 : 1;
    });
    this.currentDataDate = input[0].Datum;
  }

  private sortGraphData(input: DataPerArea) {
    input.graphdata.sort(function (a, b) {
      var dateA = new Date(a.name).getTime();
      var dateB = new Date(b.name).getTime();
      return dateA > dateB ? -1 : 1;
    });
  }

  private sortData(input: DataPerArea) {
    input.data.sort(function (a, b) {
      var dateA = new Date(a.date).getTime();
      var dateB = new Date(b.date).getTime();
      return dateA > dateB ? 1 : -1;
    });
  }

  private setCurrentData(input: DataPerArea) {
    input.currentData = input.data[input.data.length - 1];
  }

  private fillDataPerArea() {
    this.log("fillDataPerArea");
    if (this.dataEntryList == null) {
      this.log("dataEntryList == null");
    } else {
      this.log("dataEntryList != null");
    }
    this.sortDataPerDate(this.dataEntryList);
    this.dataEntryList.forEach(element => this.mapDataPerArea(element));
    this.log("sortRootData");
    this.sortRootData(this.dataPerArea);
    this.log("sort graphArray");
    this.dataPerArea.forEach(element => this.sortGraphData(element));
    this.log("sort data");
    this.dataPerArea.forEach(element => this.sortData(element));
    this.log("set current data");
    this.dataPerArea.forEach(element => this.setCurrentData(element));
    console.log(this.dataPerArea);
  }

  private mapDataPerArea(toMap: VaccDataEntry) {
    if (this.dataPerArea == null) {
      this.mapDataPerAreaRoot(toMap);
    } else {
      const found = this.dataPerArea.find(element => element.areaId == toMap.BundeslandID);
      if (found == null) {
        this.mapDataPerAreaRoot(toMap);
      } else {
        if (new Date(toMap.Datum) > this.getLastWeek()) {
          found.data.push(this.mapDataPerAreaEntry(toMap));
          found.graphdata.push(this.mapDataPerAreaGraphEntry(toMap));
        }
      }
    }
  }

  private mapDataPerAreaRoot(toMap: VaccDataEntry) {
    if (new Date(toMap.Datum) > this.getLastWeek()) {
      this.log("mapDataPerAreaRoot " + new Date(toMap.Datum))
      var entry = {
        areaId: toMap.BundeslandID,
        name: toMap.Name,
        data: [this.mapDataPerAreaEntry(toMap)],
        graphdata: [this.mapDataPerAreaGraphEntry(toMap)],
        currentData: null
      };
      this.log("mapDataPerAreaRoot push")
      this.dataPerArea.push(entry);
    }
  }

  private mapDataPerAreaEntry(toMap: VaccDataEntry) {
    var entry = {
      date: toMap.Datum,
      dateString: this.datepipe.transform(toMap.Datum, 'dd-MM-YYYY'),
      amountPeople: toMap.Bevölkerung,
      registeredVaccinations: toMap.EingetrageneImpfungen,
      registeredVaccinationsPer100: toMap.EingetrageneImpfungenPro100,
      partlyVaccined: toMap.Teilgeimpfte,
      partlyVaccinedPer100: toMap.TeilgeimpftePro100,
      fullyVaccined: toMap.Vollimmunisierte,
      fullyVaccinedPer100: toMap.VollimmunisiertePro100
    };
    return entry;
  }

  private mapDataPerAreaGraphEntry(toMap: VaccDataEntry) {
    if (new Date(toMap.Datum) > this.getLastWeek()) {
      this.log("mapDataPerAreaGraphEntry " + new Date(toMap.Datum))
      var entry = {
        name: this.datepipe.transform(toMap.Datum, 'dd-MM-YYYY'),
        value: parseInt(toMap.EingetrageneImpfungen)
      };
      return entry;
    }
  }

  getData() {
    this.log("getData start");
    this.vaccService.getData()
      .subscribe(resp => {
        this.data = resp;
        if (this.data == null) {
          this.log("getData null");
        } else {
          this.log("getData not null");
          this.dataEntryList = this.data.vaccData;
        }
        this.log("getData end");
        this.fillDataPerArea();
      });
  }

  private log(message: string) {
    this.vaccService.log('ShowDataComponent: ' + message);
  }

  constructor(private vaccService: VaccinationService
    , private messageService: MessageService) { }

  ngOnInit(): void {
    this.getData();
  }
}
