import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  Slider,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";

import ArrowLeftIcon from "../components/ArrowLeft";
import { CustomFont, couleurs } from "../components/color";
import ApiService from "../components/api/service";
import axios from "axios";
import storage from "../components/api/localstorage";
import translations from "../translations/translations";
import secureStorage from "../components/api/secureStorage";

export default function Rdv({
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
    const _fetchData = async () => {
      let _userConnectedId = await secureStorage.getKey("utilisateur");
      if (_userConnectedId) SetUserConnected(_userConnectedId);
    };

    // call the function
    _fetchData()
      // make sure to catch any error
      .catch(console.error);
  });

  //////////////////////////////////////////////////////////////////////////////////////

  // LOADER
  const [isLoading, setLoading] = useState(false);
  const [isLoadingEtab, setLoadingEtab] = useState(true);

  // CURRENT DATE
  const [date, setDate] = useState("");

  // SELECT DATE
  const _selectDate = (date: any) => {
    setDate(date);
    setLoading(true);
    loadRendezvous();
  };

  // GET USER CONNECTED
  const [userConnectedId, SetUserConnectedId] = useState("");

  useEffect(() => {
    // declare the data fetching function
    const ___fetchData = async () => {
      let _userConnectedId = await secureStorage.getKey("utilisateur");
      if (_userConnectedId) SetUserConnectedId(_userConnectedId);
    };

    // call the function
    ___fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const [userConnected, SetUserConnected] = useState<any>({});

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
          setLoadingEtab(false);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadUserData();
  });

  //   GET RENDEZ-VOUS
  const [rendezvous, setRendezvous] = useState([]);
  const [isLoadedRendezVous, setLoadedRendezVous] = useState(false);

  const loadRendezvous = () => {
    axios({
      method: "GET",
      url: ApiService.API_URL_GET_RENDEZ_VOUS,
      data: JSON.stringify({
        vendeur_id: userConnectedId,
        // date: date
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response: { data: any }) => {
        var api = response.data;

        if (api.code == "success") {
          setLoading(false);
          setLoadedRendezVous(true);
          setRendezvous(api.message.reverse());
        }
        if (api.code == "error") {
          //  Alert.alert('', 'Erreur survenue');
        }
      })
      .catch((error: any) => {
        console.log(error);
        //  Alert.alert('', 'Erreur Network');
      });
  };

  if (!isLoadedRendezVous) loadRendezvous();

  const confirmRdv = (id: any) => {
    axios({
      method: "PUT",
      url: ApiService.API_URL_CONFIRM_RDV,
      data: JSON.stringify({
        rendez_vous_id: id,
        statut: 1,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response: { data: any }) => {
        var api = response.data;

        if (api.code == "success") {
          setLoading(false);
          loadRendezvous();
        }
        if (api.code == "error") {
          // Alert.alert('', 'Erreur survenue');
        }
      })
      .catch((error: any) => {
        console.log(error);
        // Alert.alert('', 'Erreur Network');
      });
  };

  return (
    <View>
      <SafeAreaView
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 30,
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: couleurs.primary,
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeftIcon color={couleurs.white} />
          </Pressable>
          <Text
            style={{
              color: couleurs.white,
              fontSize: 16,
              fontFamily: CustomFont.Poppins,
            }}
          >
            {t("Mes_Rendez_vous", preferredLangage)}
          </Text>
        </View>

        {/* NAV */}
        {/* <View style={{paddingHorizontal:12}}>
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 10,
            height: 50,
            alignItems: 'center',
            marginTop: 10, borderRadius:10
          }}>
          <TouchableOpacity onPress={ () => {
            setDate(`<${new Date().getDay() -1}/${new Date().getMonth() +1}/${new Date().getFullYear()}`),
            setLoading(true),
            loadRendezvous()
          }}>
          <View>
            <Text>Passé</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={ () => {
            setDate(`<${new Date().getDay() -1}/${new Date().getMonth() +1}/${new Date().getFullYear()}`),
            setLoading(true),
            loadRendezvous()
          }}>
            <View>
            <Text>Hier</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={ () => {
            setDate(`${new Date().getDay()}/${new Date().getMonth() +1}/${new Date().getFullYear()}`),
            setLoading(true),
            loadRendezvous()
          }}>
            <View
            style={{
              backgroundColor: couleurs.primary,
              borderRadius: 20,
              padding: 10,
            }}>
            <Text style={{color: couleurs.white}}>Aujourd'hui</Text>
          </View>
          </TouchableOpacity>
          
        <TouchableOpacity  onPress={ () => {
            setDate(`${new Date().getDay() +1}/${new Date().getMonth() +1}/${new Date().getFullYear()}`),
            setLoading(true),
            loadRendezvous()
          }}>
         <View>
            <Text>Démain</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity  onPress={ () => {
            setDate(`> ${new Date().getDay() }/${new Date().getMonth() +1}/${new Date().getFullYear()}`)
            loadRendezvous()
          }}>
          <View>
            <Text>A vénir</Text>
          </View>
        </TouchableOpacity>
          
          
        </View>
        </View> */}

        {/* main */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: "#f6f6f6f6",
          }}
        >
          <View style={{ marginHorizontal: 12, marginVertical: 10 }}>
            {rendezvous.length > 0 &&
              !isLoading &&
              rendezvous.map((row: any, key: any) => (
                <View
                  key={key}
                  style={{
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      borderRadius: 15,
                      backgroundColor: "#fff",
                      padding: 14,
                      width: "100%",
                      borderWidth: 1,
                      borderColor: couleurs.primary,
                      borderStyle: "dashed",
                    }}
                  >
                    <Text
                      style={{
                        color: couleurs.dark,
                        paddingVertical: 3,
                        fontSize: 16,
                        fontFamily: CustomFont.Poppins,
                        opacity: 0.8,
                      }}
                    >
                      {row.client}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: couleurs.dark,
                          paddingVertical: 3,
                          fontSize: 13,
                          fontFamily: CustomFont.Poppins,
                        }}
                      >
                        {new Date(row.date).toLocaleDateString()} .
                      </Text>
                      <Text
                        style={{
                          color: couleurs.primary,
                          paddingVertical: 3,
                          fontSize: 13,
                          fontFamily: CustomFont.Poppins,
                        }}
                      >
                        {row.heure}
                      </Text>
                    </View>
                    {route.prix && (
                      <Text
                        style={{
                          color: couleurs.dark,
                          paddingVertical: 3,
                          fontSize: 13,
                          fontFamily: CustomFont.Poppins,
                        }}
                      >
                        {row.prix}
                      </Text>
                    )}

                    <View
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Pressable onPress={() => null}>
                        <Text
                          style={{
                            color: couleurs.primary,
                            paddingVertical: 3,
                            fontSize: 13,
                            fontFamily: CustomFont.Poppins,
                          }}
                        >
                          {row.statut == 0
                            ? t("Attente_de_confirmation", preferredLangage)
                            : t("Confirme", preferredLangage)}
                        </Text>
                      </Pressable>

                      {row.statut == 0 && (
                        <Pressable
                          style={{
                            paddingHorizontal: 10,
                            backgroundColor: couleurs.primary,
                            borderRadius: 30,
                          }}
                          onPress={() => confirmRdv(row.id)}
                        >
                          <View
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "row",
                              justifyContent: "flex-start",
                              gap: 5,
                            }}
                          >
                            <Text
                              style={{
                                textAlign: "center",
                                padding: 10,
                                paddingHorizontal: 10,
                                fontSize: 13,
                                fontWeight: "500",
                                color: "#fff",
                              }}
                            >
                              {t("Confirmer", preferredLangage)}
                            </Text>
                          </View>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </View>
              ))}

            {rendezvous.length == 0 && (
              <>
                <Image
                  source={require("../assets/images/vide.png")}
                  style={{
                    marginTop: 150,
                    width: 150,
                    height: 150,
                    alignSelf: "center",
                  }}
                />
                <Text
                  style={{
                    alignSelf: "center",
                    fontFamily: CustomFont.Poppins,
                    color: couleurs.dark,
                    fontSize: 13,
                  }}
                >
                  {t("aucun_rdv", preferredLangage)}
                </Text>
              </>
            )}

            {isLoading && (
              <View
                style={{
                  width: "100%",
                  height: 200,
                  marginTop: 100,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size={"large"}></ActivityIndicator>
              </View>
            )}
          </View>

          {/* Welcome text */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
