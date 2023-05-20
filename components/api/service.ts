const ApiService =  {
  // INTERNA TO APP
  ADMIN_LINKIH_TEL : '', // admin phone number here

  // BASE API URL
  API_BASE_URL_HTTPS : 'https://linkih.hlconception.com/',
  API_BASE_URL : 'http://linkih.hlconception.com/', 
  API_URL : this.API_BASE_URL + 'api/v1/',

  // EXTERNAL API KEYS
  MAPBOX_GL_TOKEN :
    'pk.eyJ1IjoiaGxjb25jZXB0aW9uIiwiYSI6ImNsY3lrM285YjA5angzbm5vZDE5NDhjNGMifQ.j6TPH1G7fM9IMI2SAtKswA',
  YANDEX_API_KEY :
    'trnsl.1.1.20200111T205255Z.688491bbea68797d.001dd6b498ea98d36f6c9f27ca84e9a8084c1f1d',
  STRIPE_API_KEY :
    'pk_live_51Lba4wDhG7cSefHLfJBm8jzRBSfEWvlvj47ykhmVhVpddF00op4lK1UvIVhdLkXJ820Ys8ywCISQhtfp1tEikq1T00iDvxTD1j',
  STRIPE_SECRETE_KEY :
    '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',

  // CREATE USING POST
  API_CREATE_NOTE_VENDEUR : this.API_URL + 'create/vendeur/note',
  API_URL_CREATE_UTILISATEUR : this.API_URL + 'add/utilisateur',
  API_URL_ADD_VENDEUR_PRESTATION : this.API_URL + 'add/vendeur/prestation',
  API_URL_SAVE_RDV : this.API_URL + 'add/rendez-vous',
  API_URL_ADD_PHOTO_GALLERIE : this.API_URL + 'add/vendeur/photo',
  API_URL_ADD_ABONNEMENT_VENDEUR : this.API_URL + 'add/abonnement/vendeur',

  // FETCH USING GET
  API_URL_STRIPE_PAIEMENT_PORTAIL : this.API_BASE_URL + 'stripe',
  API_URL_LISTE_ABONNEMENTS : this.API_URL + 'liste/abonnements',
  API_URL_GET_VENDEURS : this.API_URL + 'vendeurs',
  API_URL_GET_CATEGORIES : this.API_URL + 'sous-categories',
  API_URL_GET_RENDEZ_VOUS : this.API_URL + 'rendez-vous',
  API_URL_GET_VENDEURS_PRESTATIONS : this.API_URL + 'vendeur/prestation',
  API_URL_GET_VENDEURS_HORAIRES : this.API_URL + 'horaire/ouverture',
  API_URL_GET_VENDEURS_SOUS_PRESTATIONS : this.API_URL + 'sous/prestation',
  API_URL_GET_GALLERIE : this.API_URL + 'get/vendeur/gallerie',
  API_URL_GET_PRODUIT : this.API_URL + 'get/vendeur/prestation',
  API_URL_GET_ABONNEMENT : this.API_URL + 'abonnement/vendeur',
  API_URL_STRIPE_GENERATE_LINK : this.API_URL + 'stripe/vendeur/generate-url',  
  API_URL_LOGIN : this.API_URL + 'login',
  API_URL_USER_DATA : this.API_URL + 'utilisateur/data',
  API_SEND_MAIL_CONFIRMATION : this.API_URL + 'send/mail/vendeur',
  API_SEND_MAIL_CONFIRMATION_CLIENT : this.API_URL + 'send/mail/client',
  API_SEND_COMPTE_VERIFICATION : this.API_URL + 'confirme/compte/vendeur',
  API_SEND_COMPTE_VERIFICATION_CLIENT : this.API_URL + 'confirme/compte/client',

  // EDIT USING PUT
  API_URL_CONFIRM_RDV : this.API_URL + 'edit/rendez-vous',
  API_URL_EDIT_HORAIRE : this.API_URL + 'edit/vendeur/horaire',
  API_URL_EDIT_UTILISATEUR : this.API_URL + 'edit/utilisateur',
  API_URL_EDIT_VENDEUR : this.API_URL + 'edit/vendeur',

  // DELETE USING DELETE  
  API_URL_DELETE_PHOTO_GALLERIE : this.API_URL + 'delete/vendeur/photo',
  
}

export default ApiService;

