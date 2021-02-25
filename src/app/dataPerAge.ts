export interface DataPerAge {
    group1: DataPerAgeData;
    group2: DataPerAgeData;
    group3: DataPerAgeData;
    group4: DataPerAgeData;
    group5: DataPerAgeData;
    group6: DataPerAgeData;
    group7: DataPerAgeData;
    group8: DataPerAgeData;
    graph: GraphData[];
    graph2: GraphData[];
}

export interface DataPerAgeData {
    groupM: number,
    groupW: number,
    groupD: number,
    groupM2: number,
    groupW2: number,
    groupD2: number,
    groupAll: number,
    groupAll1: number,
    groupAll2: number
}

export interface GraphData {
    name: string;
    value: Number;
}
