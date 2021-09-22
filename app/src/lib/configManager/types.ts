export interface AppInsight {
  cloudRole: string;
  key: string;
}

export interface MongoDB {
  collection: string;
  connectionString: string;
}

export interface APIS {
  cms: {
    cdn: string;
    fetchImageURL: string;
  };
}

export interface Cache {
  connectionString: string;
  expiryTime: number;
}

export interface Host {
  port: number;
}

export interface ConfigSettings {
  appInsight: AppInsight;
  // apis: APIS;
  cache: Cache;
  database: MongoDB;
  environment: string;
  secretString: string;
  host: Host;
  //   serviceName: string;
}
