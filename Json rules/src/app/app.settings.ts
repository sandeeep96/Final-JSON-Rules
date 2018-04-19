export class AppSettings {

    public static AppEnvironment: string = 'dev';
    public static isDebugMode = false;
    public static isOktaPreview = false;

    public static AppName: string = 'puma';
    public static AppVersion: string = '0.1';
    public static AppIdentifier: string = AppSettings.AppEnvironment + AppSettings.AppName + AppSettings.AppVersion;

    public static AppUrl = {
        bas: AppSettings.AppEnvironment + AppSettings.AppName,
        api: 'localhost:20201/',
        okta: AppSettings.isOktaPreview ? 'https://dev-844689.oktapreview.com' : 'https://iff.oktapreview.com',
        sap: './sap-api/',
        rule: 'http://localhost:3000/' 
    };

}
