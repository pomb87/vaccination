export interface DataPerArea {
    areaId: Number;
    name: String;
    currentData: DataPerAreaData;
    data: DataPerAreaData[];
    graphdata:GraphData[];
}

export interface DataPerAreaData {
    date: Date;
    dateString: String,
    amountPeople: String;
    registeredVaccinations: String;
    registeredVaccinationsPer100: String;
    partlyVaccined: String;
    partlyVaccinedPer100: String;
    fullyVaccined: Number;
    fullyVaccinedPer100: String;
}


export interface GraphData {
    name: string;
    value: Number;
}
