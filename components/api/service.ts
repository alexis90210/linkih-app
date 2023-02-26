export default class ApiService {
  // BASE API URL
  static API_URL = 'http://192.168.1.89:8000/api/v1/';

  // OTHER CONFIG
  static GEOCODE_KEY = ""; 

  // CREATION
  static API_URL_CREATE_UTILISATEUR = this.API_URL + 'add/utilisateur';

  // GET
  static API_URL_GET_VENDEURS = this.API_URL + 'vendeurs';
  static API_URL_LOGIN = this.API_URL + 'login';
}
