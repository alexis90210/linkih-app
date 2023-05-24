import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  Alert,
} from "react-native";

import ShopIcon from "../components/shop";
import LogoutIcon from "../components/logout";
import AccountIcon from "../components/account";
import ArrowRightIcon from "../components/ArrowRight";
import BillIcon from "../components/bill";
import LawIcon from "../components/Law";
import Law2Icon from "../components/Law2";
import Law3Icon from "../components/Law3";
import CallIcon from "../components/call";
import { CustomFont, couleurs } from "../components/color";
import storage from "../components/api/localstorage";
import axios from "axios";
import ApiService from "../components/api/service";
import translations from "../translations/translations";
import secureStorage from "../components/api/secureStorage";
import { CommonActions } from "@react-navigation/native";

function MenuScreen({ navigation }: { navigation: any }) {
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

  //////////////////////////////////////////////////////////////////////////////////////

  const [isVendeur, SetVendeur] = useState(false);
  const [isClient, SetClient] = useState(false);
  const [vendeur, SetVendeurData] = useState<any>({});
  const [userConnectedRole, SetUserRole] = useState("");

  // GET USER CONNECTED
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
          SetVendeurData(response.data.message.etablissement);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      let role = await secureStorage.getKey("role");
      if (role) {
        SetUserRole(role);

        if (role == "ROLE_VENDEUR") {
          SetVendeur(true);
          loadUserData();
        } else if (role == "ROLE_CLIENT") {
          SetClient(true);
        } else {
          navigation.navigate("identification");
        }
      }
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  // FILL VENDEUR STRIKE
  const [isGettingPath, SetGotPath] = useState(false);

  const fillInformation = () => {
    axios({
      method: "POST",
      url: ApiService.API_URL_STRIPE_GENERATE_LINK,
      data: JSON.stringify({
        stripe_id: vendeur[0].stripe_account_id,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response: { data: any }) => {
        console.log("==>", response.data.message);
        SetGotPath(true);
        var api = response.data;
        if (api.code == "success") {
          navigation.navigate("paiement_screen", {
            route: response.data.message,
          });
        }

        if (api.code == "error") {
          Alert.alert("", api.message);
        }
      })
      .catch((error: any) => {
        console.log(error);
        Alert.alert("", error);
      });
  };


  // logout
  const logoutUser = async () => {

    await secureStorage.removeKey("utilisateur");

    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: isVendeur
        ? "identification_proprietaire"
        : "identification_client" , params:  {  }}],                
    });
    navigation.dispatch(resetAction);
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: couleurs.white,
        flex: 1,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 30,
          paddingVertical: 15,
          paddingHorizontal: 10,
          backgroundColor: couleurs.primary,
        }}
      >
        <Text
          style={{
            color: couleurs.white,
            fontSize: 17,
            fontFamily: CustomFont.Poppins,
          }}
        >
          {t("Parametres_du_compte", preferredLangage)}
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowRightIcon color={couleurs.white} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            {/* Mon compte */}

            {!isVendeur && (
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: "#9c702b20",
                  borderStyle: "solid",
                  justifyContent: "flex-start",
                  gap: 10,
                  backgroundColor: "#fff",
                  paddingHorizontal: 10,
                  alignItems: "center",
                  marginTop: 0,
                }}
                onPress={() => {
                  navigation.navigate("compte");
                }}
              >
                <AccountIcon color={couleurs.primary} />
                <Text
                  style={{
                    fontSize: 16,
                    marginVertical: 10,
                    color: couleurs.dark,
                    fontFamily: CustomFont.Poppins,
                  }}
                >
                  {t("Mon_compte", preferredLangage)}
                </Text>
              </TouchableOpacity>
            )}

            {/*  Mon etablissement */}

            {isVendeur && (
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderTopWidth: 1,
                  borderColor: "#9c702b20",
                  borderStyle: "solid",
                  justifyContent: "flex-start",
                  gap: 10,
                  alignItems: "center",
                  backgroundColor: "#fff",
                  paddingHorizontal: 10,
                }}
                onPress={() => {
                  navigation.navigate("mes_prestations");
                }}
              >
                <BillIcon color={couleurs.primary} />
                <Text
                  style={{
                    fontSize: 16,
                    marginVertical: 10,
                    color: couleurs.dark,
                    fontFamily: CustomFont.Poppins,
                  }}
                >
                  {t("Mes_Prestations", preferredLangage)}
                </Text>
              </TouchableOpacity>
            )}

            {isVendeur && (
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderTopWidth: 1,
                  borderColor: "#9c702b20",
                  borderStyle: "solid",
                  justifyContent: "flex-start",
                  gap: 10,
                  alignItems: "center",
                  backgroundColor: "#fff",
                  paddingHorizontal: 10,
                }}
                onPress={() => {
                  navigation.navigate("mes_horaires");
                }}
              >
                <BillIcon color={couleurs.primary} />
                <Text
                  style={{
                    fontSize: 16,
                    marginVertical: 10,
                    color: couleurs.dark,
                    fontFamily: CustomFont.Poppins,
                  }}
                >
                  {t("Mes_Horaires", preferredLangage)}
                </Text>
              </TouchableOpacity>
            )}

            {isVendeur && (
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderTopWidth: 1,
                  borderColor: "#9c702b20",
                  borderStyle: "solid",
                  justifyContent: "flex-start",
                  gap: 10,
                  alignItems: "center",
                  backgroundColor: "#fff",
                  paddingHorizontal: 10,
                }}
                onPress={() => {
                  navigation.navigate("ma_gallerie", {
                    vendeur_id: vendeur[0].id,
                  });
                }}
              >
                <BillIcon color={couleurs.primary} />
                <Text
                  style={{
                    fontSize: 16,
                    marginVertical: 10,
                    color: couleurs.dark,
                    fontFamily: CustomFont.Poppins,
                  }}
                >
                  {t("Ma_Gallerie", preferredLangage)}
                </Text>
              </TouchableOpacity>
            )}

            {isVendeur && (
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderTopWidth: 1,
                  borderColor: "#9c702b20",
                  borderStyle: "solid",
                  justifyContent: "flex-start",
                  gap: 10,
                  alignItems: "center",
                  backgroundColor: "#fff",
                  paddingHorizontal: 10,
                }}
                onPress={() => {
                  fillInformation();
                }}
              >
                <BillIcon color={couleurs.primary} />
                <Text
                  style={{
                    fontSize: 16,
                    marginVertical: 10,
                    color: couleurs.dark,
                    fontFamily: CustomFont.Poppins,
                  }}
                >
                  {t("Configuration_de_paiement", preferredLangage)}
                </Text>
              </TouchableOpacity>
            )}

            {isVendeur && (
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderTopWidth: 1,
                  borderColor: "#9c702b20",
                  borderStyle: "solid",
                  justifyContent: "flex-start",
                  gap: 10,
                  alignItems: "center",
                  backgroundColor: "#fff",
                  paddingHorizontal: 10,
                }}
                onPress={() => {
                  navigation.navigate("reabonnement");
                }}
              >
                <BillIcon color={couleurs.primary} />
                <Text
                  style={{
                    fontSize: 16,
                    marginVertical: 10,
                    color: couleurs.dark,
                    fontFamily: CustomFont.Poppins,
                  }}
                >
                  {t("Reabonnement", preferredLangage)}
                </Text>
              </TouchableOpacity>
            )}
            {isVendeur && (
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderTopWidth: 1,
                  borderColor: "#9c702b20",
                  borderStyle: "solid",
                  justifyContent: "flex-start",
                  gap: 10,
                  alignItems: "center",
                  backgroundColor: "#fff",
                  paddingHorizontal: 10,
                }}
                onPress={() => {
                  navigation.navigate("MonEtablissement");
                }}
              >
                <ShopIcon color={couleurs.primary} />
                <Text
                  style={{
                    fontSize: 16,
                    marginVertical: 10,
                    color: couleurs.dark,
                    fontFamily: CustomFont.Poppins,
                  }}
                >
                  {t("mon_etablissement", preferredLangage)}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                borderTopWidth: 1,
                borderColor: "#9c702b20",
                borderStyle: "solid",
                justifyContent: "flex-start",
                gap: 10,
                alignItems: "center",
                backgroundColor: "#fff",
                paddingHorizontal: 10,
              }}
              onPress={() =>
                Linking.openURL(`tel:${ApiService.ADMIN_LINKIH_TEL}`)
              }
            >
              <CallIcon color={couleurs.primary} />
              <Text
                style={{
                  fontSize: 16,
                  marginVertical: 10,
                  color: couleurs.dark,
                  fontFamily: CustomFont.Poppins,
                }}
              >
                {t("Contactez_nous", preferredLangage)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                borderTopWidth: 1,
                borderColor: "#9c702b20",
                borderStyle: "solid",
                justifyContent: "flex-start",
                gap: 10,
                alignItems: "center",
                backgroundColor: "#fff",
                paddingHorizontal: 10,
              }}
              onPress={() => {
                null;
              }}
            >
              <Law3Icon color={couleurs.primary} />
              <Text
                style={{
                  fontSize: 16,
                  marginVertical: 10,
                  color: couleurs.dark,
                  fontFamily: CustomFont.Poppins,
                }}
              >
                {t("Condition_generale_d_utilisation", preferredLangage)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                borderTopWidth: 1,
                borderColor: "#9c702b20",
                borderStyle: "solid",
                justifyContent: "flex-start",
                gap: 10,
                alignItems: "center",
                backgroundColor: "#fff",
                paddingHorizontal: 10,
              }}
              onPress={() => {
                null;
              }}
            >
              <LawIcon color={couleurs.primary} />
              <Text
                style={{
                  fontSize: 16,
                  marginVertical: 10,
                  color: couleurs.dark,
                  fontFamily: CustomFont.Poppins,
                }}
              >
                {t("Politique_de_confidentialite", preferredLangage)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                borderTopWidth: 1,
                borderColor: "#9c702b20",
                borderStyle: "solid",
                justifyContent: "flex-start",
                gap: 10,
                alignItems: "center",
                backgroundColor: "#fff",
                paddingHorizontal: 10,
              }}
              onPress={() => {
                null;
              }}
            >
              <Law2Icon color={couleurs.primary} />
              <Text
                style={{
                  fontSize: 16,
                  marginVertical: 10,
                  color: couleurs.dark,
                  fontFamily: CustomFont.Poppins,
                }}
              >
                {t("Mentions_legales", preferredLangage)}
              </Text>
            </TouchableOpacity>

            {/*  Session de connexion */}

            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                borderTopWidth: 1,
                borderColor: "#9c702b20",
                borderStyle: "solid",
                justifyContent: "flex-start",
                gap: 10,
                alignItems: "center",
                backgroundColor: "#fff",
                paddingHorizontal: 10,
              }}
              onPress={() =>{
                logoutUser()
                
                }
              }
            >
              <LogoutIcon color={couleurs.primary} />
              <Text
                style={{
                  fontSize: 16,
                  marginVertical: 10,
                  color: couleurs.dark,
                  fontFamily: CustomFont.Poppins,
                }}
              >
                {t("Deconnexion", preferredLangage)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MenuScreen;
