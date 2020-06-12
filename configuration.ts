const config = require('./config.json');

interface IWalmartEndpoints {
    productLookup: string;
    recommendations: string;
    reviews: string;
    search: string;
    trends: string;
}

interface IMongoDBs {
    reviews: string;
    products: string;
    shoppingCart: string;
}
export interface IConfig {
    connectionString: string;
    mongoDBs: IMongoDBs;
    port: number;
    walmartApiKey: string;
    walmartAPIVersion: string;
    walmartBasePath: string;
    walmartBaseEndpoints: IWalmartEndpoints;
}

class Configuration {
    public connectionString: string;
    public port: number;
    public walmartApiKey: string;
    public walmartBasePath: string;
    public walmartAPIVersion: string;
    public walmartEndpoints: IWalmartEndpoints;
    public mongoDBs: IMongoDBs;

    constructor() {
        const { connectionString, mongoDBs, port, walmartApiKey, walmartAPIVersion, walmartBasePath, walmartEndpoints } = config;
        this.connectionString = connectionString;
        this.port = port;
        this.walmartApiKey = walmartApiKey;
        this.walmartAPIVersion = walmartAPIVersion;
        this.walmartBasePath = walmartBasePath;
        this.walmartEndpoints = walmartEndpoints as IWalmartEndpoints;
        this.mongoDBs = mongoDBs as IMongoDBs;
    }
}

export const configuration = new Configuration();
