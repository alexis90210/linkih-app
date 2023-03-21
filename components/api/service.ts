export default class ApiService {
  // BASE API URL
  static API_BASE_URL = 'http://192.168.1.90:8000/';
  static API_URL = this.API_BASE_URL + 'api/v1/'; // IP HOME
  static MAPBOX_GL_TOKEN =
    'pk.eyJ1IjoiaGxjb25jZXB0aW9uIiwiYSI6ImNsY3lrM285YjA5angzbm5vZDE5NDhjNGMifQ.j6TPH1G7fM9IMI2SAtKswA';
  static STRIPE_API_KEY =
    'pk_live_51Lba4wDhG7cSefHLfJBm8jzRBSfEWvlvj47ykhmVhVpddF00op4lK1UvIVhdLkXJ820Ys8ywCISQhtfp1tEikq1T00iDvxTD1j';
  static STRIPE_SECRETE_KEY =
    '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';
  static API_URL_STRIPE_PAIEMENT_PORTAIL = this.API_BASE_URL + 'stripe';
  static API_URL_CREATE_UTILISATEUR = this.API_URL + 'add/utilisateur';
  static API_URL_ADD_VENDEUR_PRESTATION =
    this.API_URL + 'add/vendeur/prestation';
  static API_URL_EDIT_UTILISATEUR = this.API_URL + 'edit/utilisateur';
  static API_URL_STRIPE_GENERATE_LINK =
    this.API_URL + 'stripe/vendeur/generate-url';
  static API_URL_LISTE_ABONNEMENTS = this.API_URL + 'liste/abonnements';
  static API_URL_GET_VENDEURS = this.API_URL + 'vendeurs';
  static API_URL_GET_CATEGORIES = this.API_URL + 'sous-categories';
  static API_URL_LOGIN = this.API_URL + 'login';
  static API_URL_USER_DATA = this.API_URL + 'utilisateur/data';
  static API_SEND_MAIL_CONFIRMATION = this.API_URL + 'send/mail';
  static API_SEND_COMPTE_VERIFICATION = this.API_URL + 'confirme/compte';
  static API_URL_GET_RENDEZ_VOUS = this.API_URL + 'rendez-vous';
  static API_URL_GET_VENDEURS_PRESTATIONS = this.API_URL + 'vendeur/prestation';
  static API_URL_GET_VENDEURS_HORAIRES = this.API_URL + 'horaire/ouverture';
  static API_URL_GET_VENDEURS_SOUS_PRESTATIONS =
    this.API_URL + 'sous/prestation';
  static API_URL_SAVE_RDV = this.API_URL + 'add/rendez-vous';
  static API_URL_GET_ABONNEMENT = this.API_URL + 'abonnement/vendeur';
  static API_URL_ADD_ABONNEMENT_VENDEUR =
    this.API_URL + 'add/abonnement/vendeur';
  static API_URL_CONFIRM_RDV = this.API_URL + 'edit/rendez-vous';
  static API_URL_GET_PRODUIT = this.API_URL + 'get/vendeur/prestation';
  static API_URL_EDIT_HORAIRE = this.API_URL + 'edit/vendeur/horaire';
  static API_URL_GET_GALLERIE = this.API_URL + 'get/vendeur/gallerie';
  static API_URL_ADD_PHOTO_GALLERIE = this.API_URL + 'add/vendeur/photo';
  static API_URL_DELETE_PHOTO_GALLERIE = this.API_URL + 'delete/vendeur/photo';
  static API_URL_EDIT_VENDEUR = this.API_URL + 'edit/vendeur';
}
