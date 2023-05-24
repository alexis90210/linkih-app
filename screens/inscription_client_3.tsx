import React, { useRef, useState, useEffect } from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  PixelRatio,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { couleurs } from "../components/color";
import axios from "axios";
import ApiService from "../components/api/service";
import translations from "../translations/translations";
import storage from "../components/api/localstorage";
import secureStorage from "../components/api/secureStorage";
import { StackActions } from "@react-navigation/native";

// InscriptionClient3
export default function InscriptionClient3({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  /////////////////////////////////// LANGUAGE HANDLER ///////////////////////////////////////

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

  const loginNow = () => {
    console.log(route.params.api);

    navigation.dispatch(StackActions.push("identification_client", {
      login: route.params.api.login,
      api: route.params.api,
    }));
  };

  return (
    <>
      <SafeAreaView
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
        }}
      >
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20%",
            }}
          >
            <Image
              source={require("../assets/images/success.png")}
              style={{ height: 150, resizeMode: "contain", width: "100%" }}
            />
            <Text
              style={{
                textAlign: "center",
                color: couleurs.primary,
                fontWeight: "600",
                textTransform: "uppercase",
                fontSize: 14,
                width: "60%",
                marginTop: 20,
              }}
            >
              {t("Felicitations_votre_compte", preferredLangage)}
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "#00000090",
                fontSize: 13,
                marginVertical: 13,
                width: "60%",
              }}
            >
              {t(
                "Veuillez_completer_vos_Informations_dans_votre_profile",
                preferredLangage
              )}
            </Text>
            <View
              style={{
                marginVertical: 70,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: couleurs.primary,
                borderRadius: 30,
              }}
            >
              <Pressable
                android_ripple={{ color: "7B4C7A" }}
                style={{
                  paddingHorizontal: 10,
                }}
                onPress={() => loginNow()}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: couleurs.secondary,
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: 13,
                    width: 250,
                  }}
                >
                  {t("se_connecter", preferredLangage)}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
