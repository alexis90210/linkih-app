export default class ApiService {
  // BASE API URL
  // static API_URL = 'http://192.168.1.89:8000/api/v1/'; 
  // static API_URL = 'http://192.168.1.93:8000/api/v1/';
  static API_URL = 'http://192.168.48.179:8000/api/v1/';
  

  // OTHER CONFIG
  static GEOCODE_KEY = ""; 
  static MAPBOX_GL_TOKEN= 'pk.eyJ1IjoiaGxjb25jZXB0aW9uIiwiYSI6ImNsY3lrM285YjA5angzbm5vZDE5NDhjNGMifQ.j6TPH1G7fM9IMI2SAtKswA';

  // CREATION
  static API_URL_CREATE_UTILISATEUR = this.API_URL + 'add/utilisateur';

  // GET
  static API_URL_GET_VENDEURS = this.API_URL + 'vendeurs';
  static API_URL_LOGIN = this.API_URL + 'login';
  static API_URL_USER_DATA = this.API_URL + 'utilisateur/data';
}
