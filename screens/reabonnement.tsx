import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";

import { CustomFont, couleurs } from "../components/color";
import axios from "axios";
import ApiService from "../components/api/service";
import storage from "../components/api/localstorage";
import translations from "../translations/translations";
import secureStorage from "../components/api/secureStorage";

export default function Reabonnement({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  /////////////////////////////////// LANGUAGE HANDLER ///////////////////////////////////

  const [preferredLangage, setPreferredLangage] = useState("fr");

  const t = (key: any, langage: any) => {
    return translations[langage][key] || key;
  };

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      let lang = await secureStorage.getKey("defaultlang");
      if (lang) {
        setPreferredLangage(lang);
      }
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const [userConnectedId, SetUserConnectedId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let _userConnectedId = await secureStorage.getKey("utilisateur");
      if (_userConnectedId) SetUserConnectedId(_userConnectedId);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  });

  //////////////////////////////////////////////////////////////////////////////////////

  // GET USER CONNECTED
  const [userConnected, SetUserConnected] = useState<any>({});
  const [isProccessing, setIsProccessing] = useState(false);

  const loadUserData = () => {
    axios({
      method: "POST",
      url: ApiService.API_URL_USER_DATA,
      data: JSON.stringify({
        id: userConnectedId,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (response: { data: any }) => {
        console.log(response);
        if (response.data.code == "success") {
          SetUserConnected(response.data.message.etablissement[0]);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadUserData();
  });

  // S'ABONNER
  const sabonnerMaintenant = (abonnement: any) => {
    setIsProccessing(true);
    console.log({
      vendeur_id: userConnectedId,
      abonnement_id: abonnement.id,
    });

    axios({
      method: "POST",
      url: ApiService.API_URL_ADD_ABONNEMENT_VENDEUR,
      data: JSON.stringify({
        vendeur_id: userConnectedId,
        abonnement_id: abonnement.id,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response: { data: any }) => {
        setIsProccessing(false);
        var api = response.data;

        console.log(api);

        if (api.code == "success") {
          navigation.navigate("paiement_screen", {
            route:
              ApiService.API_BASE_URL_HTTPS +
              `stripe/${abonnement.montant}/${abonnement.devise}`,
          });
          // Alert.alert('Nouvel Abonnement', api.message);
          loadMonAbonnement();
        }
      })
      .catch((error: any) => {
        console.log(error);
        setIsProccessing(false);
        // Alert.alert('Nouvel Abonnement', 'Erreur Network');
      });
  };

  const [abonnements, setAbonnements] = useState<any>([]);
  const [isLoadingAbonnement, setIsLoadingAbonnement] = useState(false);

  const [mon_abonnement, setMonAbonnement] = useState<{
    expiration?: any;
    activation?: any;
    nom?: any;
    en_nom?: any;
    code?: any;
  }>({});

  const loadMonAbonnement = () => {
    axios({
      method: "GET",
      url: ApiService.API_URL_GET_ABONNEMENT,
      data: JSON.stringify({
        vendeur_id: userConnectedId,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response: { data: any }) => {
        var api = response.data;

        if (api.code == "success") {
          setMonAbonnement(api.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
        // Alert.alert('Mon Abonnement', 'Erreur Network');
      });
  };

  const loadAbonnementList = () => {
    axios({
      method: "GET",
      url: ApiService.API_URL_LISTE_ABONNEMENTS,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response: { data: any }) => {
        var api = response.data;
        setIsLoadingAbonnement(true);

        if (api.code == "success") {
          setAbonnements(api.message);
          loadMonAbonnement();
        }
        if (api.code == "error") {
          // Alert.alert('Liste des Abonnements',api.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setIsLoadingAbonnement(true);
        // Alert.alert('Liste des Abonnements', 'Erreur Network');
      });
  };

  if (userConnected) {
    if (!isLoadingAbonnement) loadAbonnementList();
  }

  return (
    <View>
      <SafeAreaView
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#f6f6f6",
        }}
      >
        {/* LOADING MODAL */}

        <Modal transparent={true} visible={isProccessing}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              flexDirection: "column",
              backgroundColor: "rgba(200,200,200,.5)",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <ActivityIndicator
              color={couleurs.primary}
              style={{ alignSelf: "center" }}
              size={"large"}
            ></ActivityIndicator>
          </View>
        </Modal>

        {/* END LOADING */}
        <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20 }}>
          <ScrollView>
            {mon_abonnement.nom && (
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor: "#fff",
                  padding: 20,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: CustomFont.Poppins,
                      fontSize: 13,
                      color: couleurs.primary,
                      borderBottomWidth: 1,
                      borderStyle: "solid",
                      borderColor: "#ddd",
                    }}
                    numberOfLines={1}
                  >
                    {t("Detail_de_l_abonnement", preferredLangage)}
                  </Text>

                  <View
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: CustomFont.Poppins,
                        fontSize: 13,
                        color: couleurs.dark,
                      }}
                    >
                      {t("Abonnement", preferredLangage)}
                    </Text>

                    <Text
                      style={{
                        fontFamily: CustomFont.Poppins,
                        fontSize: 13,
                        color: couleurs.primary,
                      }}
                    >
                      {preferredLangage == "fr"
                        ? mon_abonnement.nom
                        : mon_abonnement.en_nom}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: CustomFont.Poppins,
                        fontSize: 13,
                        color: couleurs.dark,
                      }}
                    >
                      {t("Type_Abonnement", preferredLangage)}
                    </Text>

                    <Text
                      style={{
                        fontFamily: CustomFont.Poppins,
                        fontSize: 13,
                        color: couleurs.primary,
                      }}
                    >
                      {mon_abonnement.code}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: CustomFont.Poppins,
                        fontSize: 13,
                        color: couleurs.dark,
                      }}
                    >
                      {t("Debut_d_activation", preferredLangage)}
                    </Text>

                    <Text
                      style={{
                        fontFamily: CustomFont.Poppins,
                        fontSize: 13,
                        color: couleurs.dark,
                        opacity: 0.6,
                      }}
                    >
                      {mon_abonnement.activation}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: CustomFont.Poppins,
                        fontSize: 13,
                        color: couleurs.dark,
                      }}
                    >
                      {t("Date_d_expiration", preferredLangage)}
                    </Text>

                    <Text
                      style={{
                        fontFamily: CustomFont.Poppins,
                        fontSize: 13,
                        color: couleurs.dark,
                        opacity: 0.6,
                      }}
                    >
                      {mon_abonnement.expiration}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {!mon_abonnement.nom && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: couleurs.primaryLight,
                  borderRadius: 10,
                  paddingVertical: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 13,
                    padding: 10,
                  }}
                >
                  {t("Vous_n_avez_aucun_abonnement_actif", preferredLangage)}
                </Text>
              </View>
            )}

            <Text
              style={{
                fontFamily: CustomFont.Poppins,
                fontSize: 13,
                color: couleurs.dark,
                marginVertical: 20,
                paddingHorizontal: 15,
              }}
            >
              {t("Tous_les_abonnements", preferredLangage)}
            </Text>

            {abonnements.map((row: any, key: any) => (
              <View
                key={key}
                style={{
                  borderWidth: 1,
                  borderColor: couleurs.primary,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: couleurs.primary,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    paddingVertical: 10,
                  }}
                >
                  <Text style={{ color: couleurs.white, alignSelf: "center" }}>
                    {preferredLangage == "fr" ? row.nom : row.en_nom}
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      color: couleurs.primary,
                      fontSize: 13,
                    }}
                  >
                    {row.code}
                  </Text>
                  <View>
                    <Text
                      style={{
                        color: couleurs.primary,
                        fontSize: 16,
                      }}
                    >
                      {row.devise} {row.montant}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginBottom: 20,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    backgroundColor: couleurs.primary,
                    borderRadius: 30,
                    marginHorizontal: 40,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 10,
                      width: "80%",
                    }}
                    onPress={() => sabonnerMaintenant(row)}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        alignSelf: "center",
                        color: couleurs.white,
                        padding: 10,
                        paddingHorizontal: 20,
                        fontSize: 13,
                      }}
                    >
                      {t("S_abonner_maintenant", preferredLangage)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
