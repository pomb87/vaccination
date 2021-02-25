import { Component, OnInit } from '@angular/core';
import { VaccinationService } from '../vaccination.service';
import { MessageService } from '../message.service';
import { DatePipe } from '@angular/common';
import { VaccData } from '../vaccData';
import { VaccDataEntry } from '../vaccData';
import { DataPerAge, DataPerAgeData } from '../dataPerAge';
import { NumberValueAccessor } from '@angular/forms';
import { DataPerAreaData, GraphData } from '../dataPerArea';

@Component({
  selector: 'app-vacc-per-age',
  templateUrl: './vacc-per-age.component.html',
  styleUrls: ['./vacc-per-age.component.css']
})
export class VaccPerAgeComponent implements OnInit {
  data: VaccData;
  dataEntryList: VaccDataEntry[];
  dataEntryListCurrent: Array<VaccDataEntry> = [];
  dataPerAge: DataPerAge;
  datepipe: DatePipe = new DatePipe('en-US');
  currentDate: Date;
  currentObj: Object;

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
        this.fillDataPerAge();
      });
  }

  private fillDataPerAge() {
    this.log("fillDataPerAge");
    if (this.dataEntryList == null) {
      this.log("dataEntryList == null");
    } else {
      this.log("dataEntryList != null");
      this.sortData(this.dataEntryList);
      if (this.dataEntryListCurrent != null) {
        this.log("dataEntryListCurrent != null");
        this.dataEntryListCurrent.forEach(elem => this.mapDataPerAge(elem));
      }
      this.mapDataPerAreaGraph();
      this.mapDataPerAreaGraph2();
      console.log(this.dataPerAge);
    }
  }

  private mapDataPerAreaGraph() {
    this.log("mapDataPerAreaGraph");
    if (this.dataPerAge != null) {
      this.log("mapDataPerAreaGraph not null");
      this.dataPerAge.graph = [];
      this.dataPerAge.graph.push(this.mapDataPerAgeGraphPerGroup(this.dataPerAge.group1, "bis 24 Jahren"));
      this.dataPerAge.graph.push(this.mapDataPerAgeGraphPerGroup(this.dataPerAge.group2, "25 - 34 Jahren"));
      this.dataPerAge.graph.push(this.mapDataPerAgeGraphPerGroup(this.dataPerAge.group3, "35 - 44 Jahren"));
      this.dataPerAge.graph.push(this.mapDataPerAgeGraphPerGroup(this.dataPerAge.group4, "45 - 54 Jahren"));
      this.dataPerAge.graph.push(this.mapDataPerAgeGraphPerGroup(this.dataPerAge.group5, "55 - 64 Jahren"));
      this.dataPerAge.graph.push(this.mapDataPerAgeGraphPerGroup(this.dataPerAge.group6, "65 - 74 Jahren"));
      this.dataPerAge.graph.push(this.mapDataPerAgeGraphPerGroup(this.dataPerAge.group7, "75 - 84 Jahren"));
      this.dataPerAge.graph.push(this.mapDataPerAgeGraphPerGroup(this.dataPerAge.group8, "ab 84 Jahren"));
    } else {
      this.log("mapDataPerAreaGraph null");
    }
  }

  private mapDataPerAgeGraphPerGroup(toMap: DataPerAgeData, label: string) {
    if (toMap != null) {
      var entry = {
        name: label,
        value: new Number(toMap.groupAll1)
      };
      return entry;
    }
  }

  private mapDataPerAreaGraph2() {
    this.log("mapDataPerAreaGraph");
    if (this.dataPerAge != null) {
      this.log("mapDataPerAreaGraph not null");
      this.dataPerAge.graph2 = [];
      this.dataPerAge.graph2.push(this.mapDataPerAgeGraphPerGroup2(this.dataPerAge.group1, "bis 24 Jahren"));
      this.dataPerAge.graph2.push(this.mapDataPerAgeGraphPerGroup2(this.dataPerAge.group2, "25 - 34 Jahren"));
      this.dataPerAge.graph2.push(this.mapDataPerAgeGraphPerGroup2(this.dataPerAge.group3, "35 - 44 Jahren"));
      this.dataPerAge.graph2.push(this.mapDataPerAgeGraphPerGroup2(this.dataPerAge.group4, "45 - 54 Jahren"));
      this.dataPerAge.graph2.push(this.mapDataPerAgeGraphPerGroup2(this.dataPerAge.group5, "55 - 64 Jahren"));
      this.dataPerAge.graph2.push(this.mapDataPerAgeGraphPerGroup2(this.dataPerAge.group6, "65 - 74 Jahren"));
      this.dataPerAge.graph2.push(this.mapDataPerAgeGraphPerGroup2(this.dataPerAge.group7, "75 - 84 Jahren"));
      this.dataPerAge.graph2.push(this.mapDataPerAgeGraphPerGroup2(this.dataPerAge.group8, "ab 84 Jahren"));
    } else {
      this.log("mapDataPerAreaGraph null");
    }
  }

  private mapDataPerAgeGraphPerGroup2(toMap: DataPerAgeData, label: string) {
    if (toMap != null) {
      var entry = {
        name: label,
        value: new Number(toMap.groupAll2)
      };
      return entry;
    }
  }


  private mapDataPerAge(toMap: VaccDataEntry) {
    var group1 = this.mapDataPerAgeV1(toMap, "<24", this.dataPerAge != null ? this.dataPerAge.group1 : null);
    var group2 = this.mapDataPerAgeV2(toMap, "_25-34", this.dataPerAge != null ? this.dataPerAge.group2 : null);
    var group3 = this.mapDataPerAgeV2(toMap, "_35-44", this.dataPerAge != null ? this.dataPerAge.group3 : null);
    var group4 = this.mapDataPerAgeV2(toMap, "_45-54", this.dataPerAge != null ? this.dataPerAge.group4 : null);
    var group5 = this.mapDataPerAgeV2(toMap, "_55-64", this.dataPerAge != null ? this.dataPerAge.group5 : null);
    var group6 = this.mapDataPerAgeV2(toMap, "_65-74", this.dataPerAge != null ? this.dataPerAge.group6 : null);
    var group7 = this.mapDataPerAgeV2(toMap, "_75-84", this.dataPerAge != null ? this.dataPerAge.group7 : null);
    var group8 = this.mapDataPerAgeV1(toMap, "_>84", this.dataPerAge != null ? this.dataPerAge.group8 : null);

    this.dataPerAge = {
      group1: group1,
      group2: group2,
      group3: group3,
      group4: group4,
      group5: group5,
      group6: group6,
      group7: group7,
      group8: group8,
      graph: [],
      graph2: []
    }
    this.log("dataPerAge" + this.dataPerAge);
  }

  private mapDataPerAgeV1(toMap: VaccDataEntry, toAdd: string, existingData: DataPerAgeData) {
    var existingGroupM = 0;
    var existingGroupM2 = 0;
    var existingGroupW = 0;
    var existingGroupW2 = 0;
    var existingGroupAll1 = 0;
    var existingGroupAll2 = 0;
    var existingGroupAll = 0;

    if (existingData != null) {
      existingGroupM = existingData.groupM;
      existingGroupM2 = existingData.groupM2;
      existingGroupW = existingData.groupW;
      existingGroupW2 = existingData.groupW2;
      existingGroupAll = existingData.groupAll;
      existingGroupAll1 = existingData.groupAll1;
      existingGroupAll2 = existingData.groupAll2;
    }
    var entry = {
      groupM: Number(toMap['Gruppe' + toAdd + '_M_1']) + existingGroupM,
      groupW: Number(toMap['Gruppe' + toAdd + '_W_1']) + existingGroupW,
      groupD: 0,
      groupM2: Number(toMap['Gruppe' + toAdd + '_M_2']) + existingGroupM2,
      groupW2: Number(toMap['Gruppe' + toAdd + '_W_2']) + existingGroupW2,
      groupD2: 0,
      groupAll: existingGroupAll + Number(toMap['Gruppe' + toAdd + '_M_1']) + Number(toMap['Gruppe' + toAdd + '_W_1']) + Number(toMap['Gruppe' + toAdd + '_M_2']) + Number(toMap['Gruppe' + toAdd + '_W_2']),
      groupAll1: existingGroupAll1 + Number(toMap['Gruppe' + toAdd + '_M_1']) + Number(toMap['Gruppe' + toAdd + '_W_1']),
      groupAll2: existingGroupAll2 + Number(toMap['Gruppe' + toAdd + '_M_2']) + Number(toMap['Gruppe' + toAdd + '_W_2'])
    }

    return entry;
  }

  private mapDataPerAgeV2(toMap: VaccDataEntry, toAdd: string, existingData: DataPerAgeData) {
    var existingGroupM = 0;
    var existingGroupM2 = 0;
    var existingGroupW = 0;
    var existingGroupW2 = 0;
    var existingGroupD = 0;
    var existingGroupD2 = 0;
    var existingGroupAll1 = 0;
    var existingGroupAll2 = 0;
    var existingGroupAll = 0;

    if (existingData != null) {
      existingGroupM = existingData.groupM;
      existingGroupM2 = existingData.groupM2;
      existingGroupW = existingData.groupW;
      existingGroupW2 = existingData.groupW2;
      existingGroupD = existingData.groupD;
      existingGroupD2 = existingData.groupD2;
      existingGroupAll = existingData.groupAll;
      existingGroupAll1 = existingData.groupAll1;
      existingGroupAll2 = existingData.groupAll2;
    }
    var entry = {
      groupM: existingGroupM + Number(toMap['Gruppe' + toAdd + '_M_1']),
      groupW: existingGroupW + Number(toMap['Gruppe' + toAdd + '_W_1']),
      groupD: existingGroupD + Number(toMap['Gruppe' + toAdd + '_D_1']),
      groupM2: existingGroupM2 + Number(toMap['Gruppe' + toAdd + '_M_2']),
      groupW2: existingGroupW2 + Number(toMap['Gruppe' + toAdd + '_W_2']),
      groupD2: existingGroupD2 + Number(toMap['Gruppe' + toAdd + '_D_1']),
      groupAll: existingGroupAll + Number(toMap['Gruppe' + toAdd + '_M_1']) + Number(toMap['Gruppe' + toAdd + '_W_1']) + Number(toMap['Gruppe' + toAdd + '_D_1']) + Number(toMap['Gruppe' + toAdd + '_M_2']) + Number(toMap['Gruppe' + toAdd + '_W_2']) + Number(toMap['Gruppe' + toAdd + '_D_2']),
      groupAll1: existingGroupAll1 + Number(toMap['Gruppe' + toAdd + '_M_1']) + Number(toMap['Gruppe' + toAdd + '_W_1']) + Number(toMap['Gruppe' + toAdd + '_D_1']),
      groupAll2: existingGroupAll2 + Number(toMap['Gruppe' + toAdd + '_M_2']) + Number(toMap['Gruppe' + toAdd + '_W_2']) + Number(toMap['Gruppe' + toAdd + '_D_2'])
    }
    return entry;
  }

  private sortData(input: VaccDataEntry[]) {
    this.log("SortData");
    input.sort(function (a, b) {
      var dateA = new Date(a.Datum).getTime();
      var dateB = new Date(b.Datum).getTime();
      return dateB > dateA ? 1 : -1;
    });
    this.log("SortData done");
    this.currentDate = new Date(input[0].Datum);
    this.currentObj = input[0].Datum;
    this.log("currentDate = " + this.currentDate)
    input.forEach(elem => {
      if (elem.Datum === this.currentObj && elem.BundeslandID == 10) {
        this.log("bd " + elem.Name + " push current = " + this.currentObj + "  elem.Datum" + elem.Datum + " value m1 "
         + elem['Gruppe<24_M_1'] + " value d1 " + elem['Gruppe<24_D_1'] + " value d2 " + elem['Gruppe<24_D_2']
         + "value w1 " + elem['Gruppe<24_W_1'] + " value w2 " + elem['Gruppe<24_W_2']
         );
        this.dataEntryListCurrent.push(elem);
      }
    });
    this.log("dataEntryListCurrent = " + this.dataEntryListCurrent.length);
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

