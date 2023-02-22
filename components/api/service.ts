import axios from 'axios';

class ApiService {

  static API_URL = 'http://192.168.1.89:8000/api/v1/';
  static API_URL_LOGIN = this.API_URL + 'login';
  static API_URL_GET_VENDEURS = this.API_URL + 'vendeurs';
  static GEOCODE_KEY = ""

}

export default
 ApiService