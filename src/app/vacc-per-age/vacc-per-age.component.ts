import { Component, OnInit } from '@angular/core';
import { VaccinationService } from '../vaccination.service';
import { MessageService } from '../message.service';
import { DatePipe } from '@angular/common';
import { VaccData } from '../vaccData';
import { VaccDataEntry } from '../vaccData';
import { DataPerAge } from '../dataPerAge';

@Component({
  selector: 'app-vacc-per-age',
  templateUrl: './vacc-per-age.component.html',
  styleUrls: ['./vacc-per-age.component.css']
})
export class VaccPerAgeComponent implements OnInit {
  data: VaccData;
  dataEntryList: VaccDataEntry[];
  dataPerAge: DataPerAge;
  datepipe: DatePipe = new DatePipe('en-US')

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
      this.mapDataPerAge(this.dataEntryList[this.dataEntryList.length - 1]);
      console.log(this.dataPerAge);
    }
  }

  private mapDataPerAge(oMap: VaccDataEntry) {
    var group1 = this.mapDataPerAgeV1(this.dataEntryList[this.dataEntryList.length - 1], "<24");
    var group2 = this.mapDataPerAgeV2(this.dataEntryList[this.dataEntryList.length - 1], "_25-34");
    var group3 = this.mapDataPerAgeV2(this.dataEntryList[this.dataEntryList.length - 1], "_35-44");
    var group4 = this.mapDataPerAgeV2(this.dataEntryList[this.dataEntryList.length - 1], "_45-54");
    var group5 = this.mapDataPerAgeV2(this.dataEntryList[this.dataEntryList.length - 1], "_55-64");
    var group6 = this.mapDataPerAgeV2(this.dataEntryList[this.dataEntryList.length - 1], "_65-74");
    var group7 = this.mapDataPerAgeV2(this.dataEntryList[this.dataEntryList.length - 1], "_75-8");
    var group8 = this.mapDataPerAgeV1(this.dataEntryList[this.dataEntryList.length - 1], ">84");
    this.dataPerAge = {
      group1: group1,
      group2: group2,
      group3: group3,
      group4: group4,
      group5: group5,
      group6: group6,
      group7: group7,
      group8: group8
    }
  }

  private mapDataPerAgeV1(toMap: VaccDataEntry, toAdd: string) {
    //var toAdd="24";
    var entry = {
      groupM: Number(toMap['Gruppe' + toAdd + '_M_1']),
      groupW: Number(toMap['Gruppe' + toAdd + '_W_1']),
      groupD: 0,
      groupM2: Number(toMap['Gruppe' + toAdd + '_M_2']),
      groupW2: Number(toMap['Gruppe' + toAdd + '_W_2']),
      groupD2: 0,
      groupAll: Number(toMap['Gruppe' + toAdd + '_M_1']) + Number(toMap['Gruppe' + toAdd + '_W_1']) + Number(toMap['Gruppe' + toAdd + '_M_2']) + Number(toMap['Gruppe' + toAdd + '_W_2']),
      groupAll1: Number(toMap['Gruppe' + toAdd + '_M_1']) + Number(toMap['Gruppe' + toAdd + '_W_1']),
      groupAll2: Number(toMap['Gruppe' + toAdd + '_M_2']) + Number(toMap['Gruppe' + toAdd + '_W_2'])
    }
  
    return entry;
  }

  private mapDataPerAgeV2(toMap: VaccDataEntry, toAdd: string) {
    //var toAdd="24";
    var entry = {
      groupM: Number(toMap['Gruppe' + toAdd + '_M_1']),
      groupW: Number(toMap['Gruppe' + toAdd + '_W_1']),
      groupD: Number(toMap['Gruppe' + toAdd + '_D_1']),
      groupM2: Number(toMap['Gruppe' + toAdd + '_M_2']),
      groupW2: Number(toMap['Gruppe' + toAdd + '_W_2']),
      groupD2: Number(toMap['Gruppe' + toAdd + '_D_1']),
      groupAll: Number(toMap['Gruppe' + toAdd + '_M_1']) + Number(toMap['Gruppe' + toAdd + '_W_1']) + Number(toMap['Gruppe' + toAdd + '_D_1']) + Number(toMap['Gruppe' + toAdd + '_M_2']) + Number(toMap['Gruppe' + toAdd + '_W_2']) + Number(toMap['Gruppe' + toAdd + '_D_2']),
      groupAll1: Number(toMap['Gruppe' + toAdd + '_M_1']) + Number(toMap['Gruppe' + toAdd + '_W_1']) + Number(toMap['Gruppe' + toAdd + '_D_1']),
      groupAll2: Number(toMap['Gruppe' + toAdd + '_M_2']) + Number(toMap['Gruppe' + toAdd + '_W_2']) + Number(toMap['Gruppe' + toAdd + '_D_2'])
    }
    return entry;
  }

  private sortData(input: VaccDataEntry[]) {
    input.sort(function (a, b) {
      var dateA = new Date(a.Datum).getTime();
      var dateB = new Date(b.Datum).getTime();
      return dateB > dateA ? -1 : 1;
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

