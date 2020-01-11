

export interface ISystems {
  items: Array<ISystem>;
}

export interface IRegion {
  region_id: number;
  name: string;
  constellations?: (number)[] | null;

}

export interface ISystemShort{
  regionid: string;
  systemid: string;
  regionName: string;
  systemName: string;
  stationName: string;
};

export const ISystemShortDescriptor = {
  regionid: String,
  systemid: String,
  region: String,
  system: String
};

export interface ISystem {
  volume_str: string;
  buy: boolean;
  issued: string;
  price: number;
  volumeEntered: number;
  minVolume: number;
  volume: number;
  range: string;
  href: string;
  duration_str: string;
  location: {
    id_str: string;
    href: string;
    id: number;
    name: string;
  };
  duration: number;
  minVolume_str: string;
  volumeEntered_str: string;
  type: {
    id_str: string;
    href: string;
    id: number;
    name: string;
  };
  id: number;
  id_str: string;
};

export const ISystemDescriptor = {
  volume_str: String,
  buy: Boolean,
  issued: String,
  price: Number,
  volumeEntered: Number,
  minVolume: Number,
  volume: Number,
  range: String,
  href: String,
  duration_str: String,
  location: {
    id_str: String,
    href: String,
    id: Number,
    name: String,
  },
  duration: Number,
  minVolume_str: String,
  volumeEntered_str: String,
  type: {
    id_str: String,
    href: String,
    id: Number,
    name: String,
  },
  id: Number,
  id_str: String,
};
