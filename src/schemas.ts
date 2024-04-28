export interface cityData{
    "cityName":string,
    "country":string,
    "emoji":string,
    "date":Date,
    "notes":string,
    "position":{
      "lat":number,
      "lng":number
    },
    "id":string,
  }

  export interface position{
    lat:number,
    lng:number
  }
  
  export interface city {
    cityName: string;
    country: string;
    emoji: string;
    date: Date;
    notes: string;
    position: {
      lat: number;
      lng: number;
    };
    // id: number;
  }