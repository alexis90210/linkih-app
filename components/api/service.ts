import axios from 'axios';
import secureStorage from './secureStorage';


class ApiService {
  // INTERNA TO APP
  static ADMIN_LINKIH_TEL = ''; // admin phone number her;

  // BASE API URL
  static API_BASE_URL_HTTPS = 'https://linkih.hlconception.com/';
  static API_BASE_URL = 'https://linkih.hlconception.com/';
  static API_URL = this.API_BASE_URL + 'api/v1/';

  // EXTERNAL API KEYS
  static MAPBOX_GL_TOKEN :
    'pk.eyJ1IjoiaGxjb25jZXB0aW9uIiwiYSI6ImNsY3lrM285YjA5angzbm5vZDE5NDhjNGMifQ.j6TPH1G7fM9IMI2SAtKswA';
  static YANDEX_API_KEY :
    'trnsl.1.1.20200111T205255Z.688491bbea68797d.001dd6b498ea98d36f6c9f27ca84e9a8084c1f1d';
  static STRIPE_API_KEY :
    'pk_live_51Lba4wDhG7cSefHLfJBm8jzRBSfEWvlvj47ykhmVhVpddF00op4lK1UvIVhdLkXJ820Ys8ywCISQhtfp1tEikq1T00iDvxTD1j';
  static STRIPE_SECRETE_KEY :
    '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';

  // CREATE USING POST
  static API_CREATE_NOTE_VENDEUR = this.API_URL + 'create/vendeur/note';
  static API_URL_CREATE_UTILISATEUR = this.API_URL + 'add/utilisateur';
  static API_URL_ADD_VENDEUR_PRESTATION = this.API_URL + 'add/vendeur/prestation';
  static API_URL_SAVE_RDV = this.API_URL + 'add/rendez-vous';
  static API_URL_ADD_PHOTO_GALLERIE = this.API_URL + 'add/vendeur/photo';
  static API_URL_ADD_ABONNEMENT_VENDEUR = this.API_URL + 'add/abonnement/vendeur';

  // FETCH USING GET
  static API_URL_STRIPE_PAIEMENT_PORTAIL = this.API_BASE_URL + 'stripe';
  static API_URL_LOGGED_USER_DATA = this.API_BASE_URL + 'logged/user-data';
  static API_URL_LISTE_ABONNEMENTS = this.API_URL + 'liste/abonnements';
  static API_URL_GET_VENDEURS = this.API_URL + 'vendeurs';
  static API_URL_GET_CATEGORIES = this.API_URL + 'sous-categories';
  static API_URL_GET_RENDEZ_VOUS = this.API_URL + 'rendez-vous';
  static API_URL_GET_VENDEURS_PRESTATIONS = this.API_URL + 'vendeur/prestation';
  static API_URL_GET_VENDEURS_HORAIRES = this.API_URL + 'horaire/ouverture';
  static API_URL_GET_VENDEURS_SOUS_PRESTATIONS = this.API_URL + 'sous/prestation';
  static API_URL_GET_GALLERIE = this.API_URL + 'get/vendeur/gallerie';
  static API_URL_GET_PRODUIT = this.API_URL + 'get/vendeur/prestation';
  static API_URL_GET_ABONNEMENT = this.API_URL + 'abonnement/vendeur';
  static API_URL_STRIPE_GENERATE_LINK = this.API_URL + 'stripe/vendeur/generate-url' ;
  static API_URL_LOGIN = this.API_URL + 'login';
  static API_URL_USER_DATA = this.API_URL + 'utilisateur/data';
  static API_SEND_MAIL_CONFIRMATION = this.API_URL + 'send/mail/vendeur';
  static API_SEND_MAIL_CONFIRMATION_CLIENT = this.API_URL + 'send/mail/client';
  static API_SEND_COMPTE_VERIFICATION = this.API_URL + 'confirme/compte/vendeur';
  static API_SEND_COMPTE_VERIFICATION_CLIENT = this.API_URL + 'confirme/compte/client';

  // EDIT USING PUT
  static API_URL_CONFIRM_RDV = this.API_URL + 'edit/rendez-vous';
  static API_URL_EDIT_HORAIRE = this.API_URL + 'edit/vendeur/horaire';
  static API_URL_EDIT_UTILISATEUR = this.API_URL + 'edit/utilisateur';
  static API_URL_EDIT_VENDEUR = this.API_URL + 'edit/vendeur';

  // DELETE USING DELETE  
  static API_URL_DELETE_PHOTO_GALLERIE = this.API_URL + 'delete/vendeur/photo';
  
}

/**
 * Configure Jwt authorization using Global axios defaults.
 */
export async function setupAxiosAuth(jwtToken: string|null|undefined = null) {
  try {

    let token = jwtToken;
    if (!token) {
      const tokenExists = await secureStorage.keyExists("token");
      if (tokenExists) {
        token = await secureStorage.getKey("token");
      }
    }

    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  } catch (error) {
    delete axios.defaults.headers.common['Authorization'];
    throw error;
  }
}


export default ApiService;

