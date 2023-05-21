import React, { useRef, useState, useEffect } from "react";

import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { CustomFont, couleurs } from "../components/color";
import ImagePicker from "react-native-image-crop-picker";
import ApiService from "../components/api/service";
import axios from "axios";
import ArrowLeftIcon from "../components/ArrowLeft";
import RNFS from "react-native-fs";
import storage from "../components/api/localstorage";
import translations from "../translations/translations";
import secureStorage from "../components/api/secureStorage";

// InscriptionProprietaire3
export default function InscriptionProprietaire3({
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

  var proprietaire = route.params;

  storage
    .load({
      key: "typeuser", // Note: Do not use underscore("_") in key!
      id: "typeuser", // Note: Do not use underscore("_") in id!
    })
    .then((data) => {
      proprietaire.type = data.type;
    })
    .catch((error) => {
      console.log(error);
    });

  const [photoCover, setPhotoCover] = useState("");
  const [photOnBase64, setphotOnBase64] = useState("");
  const [isLoading, setLoading] = useState(false);

  // open picker
  const openImagePickerWithCrop = () => {
    ImagePicker.openPicker({
      width: 800,
      height: 500,
      cropping: true,
      mediaType: "photo",
    })
      .then((image) => {
        console.log(image);
        setPhotoCover(image.path);
        return RNFS.readFile(image.path, "base64");
      })
      .then((imageBase64) => {
        // Send the image to the server using axios
        setphotOnBase64(imageBase64);
      });
  };

  // S'ABONNER
  const sabonnerMaintenant = (abonnement: any, userSignIn: any) => {
    console.log({
      vendeur_id: userSignIn.vendeur_id,
      abonnement_id: abonnement.id,
    });

    abonnement.id
      ? axios({
          method: "POST",
          url: ApiService.API_URL_ADD_ABONNEMENT_VENDEUR,
          data: JSON.stringify({
            vendeur_id: userSignIn.vendeur_id,
            abonnement_id: abonnement.id,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((response: { data: any }) => {
            var api = response.data;
            console.log(api);
            navigation.navigate("inscription_proprietaire_4", {
              api: userSignIn,
            });
          })
          .catch((error: any) => {
            console.log(error);
          })
      : navigation.navigate("inscription_proprietaire_4", { api: userSignIn });
  };

  // Submit proprietaire
  const submitSaveProprietaire = () => {
    setLoading(true);

    var json = JSON.stringify({
      photo: photOnBase64,
      ...proprietaire,
    });

    console.log("payloads ::: ", json);

    axios({
      method: "POST",
      url: ApiService.API_URL_CREATE_UTILISATEUR,
      data: json,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response: { data: any }) => {
        console.log(response.data);

        var api = response.data;

        console.log(api);

        setLoading(false);

        if (api.code == "success") {
          sabonnerMaintenant(route.params.abonnementSelected, api);
        }
        if (api.code == "error") {
          Alert.alert(t("erreur_survenue", preferredLangage), api.message, [
            { text: "OK", onPress: () => null },
          ]);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("payload error :: ", error);

        Alert.alert(
          // t('erreur_survenue', preferredLangage),
          "",
          t(
            "Erreur_survenue_il_se_pourrait_que_les_informations_fournis",
            preferredLangage
          ),
          [{ text: "OK", onPress: () => null }]
        );
      });
  };

  const nextPage = () => {
    submitSaveProprietaire();
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon color={couleurs.white} />
          </TouchableOpacity>
          <Text
            style={{
              color: couleurs.white,
              fontSize: 16,
              fontFamily: CustomFont.Poppins,
            }}
          >
            {t("Image_de_couverture", preferredLangage)}
          </Text>
        </View>

        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text
              style={{
                color: couleurs.dark,
                fontFamily: CustomFont.Poppins,
                marginVertical: 40,
                paddingHorizontal: 30,
                textAlign: "center",
                fontSize: 12,
              }}
            >
              {t("select_photo", preferredLangage)}
            </Text>

            <TouchableOpacity
              onPress={() => openImagePickerWithCrop()}
              style={{ width: "100%" }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderStyle: "dashed",

                  alignSelf: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "rgba(200,200, 200, .3)",
                  borderColor: couleurs.primary,
                  height: 130,
                  width: 130,
                  borderRadius: 200,
                }}
              >
                {photoCover && (
                  <Image
                    source={{ uri: photoCover }}
                    style={{
                      height: 130,
                      width: 130,
                      borderRadius: 200,
                    }}
                  />
                )}
                {!photoCover && (
                  <Text
                    style={{
                      color: couleurs.dark,
                      textAlign: "center",
                      flexWrap: "wrap",
                      alignSelf: "center",
                      paddingHorizontal: 30,
                      fontSize: 12,
                    }}
                  >
                    {" "}
                    {t("Tapez_pour_prendre_une_photo", preferredLangage)}
                  </Text>
                )}
              </View>

              <Text
                style={{
                  marginVertical: 50,
                  textAlign: "center",
                  fontFamily: CustomFont.Poppins,
                  color: couleurs.dark,
                  paddingHorizontal: 20,
                  fontSize: 12,
                }}
              >
                {t("En_cliquant_sur", preferredLangage)}{" "}
                <Text style={{ color: couleurs.primary }}>
                  {t("je_valide_maintenant", preferredLangage)}
                </Text>
                {t("vous_acceptez", preferredLangage)}{" "}
                <Text style={{ color: couleurs.primary }}>Linkih</Text> .
              </Text>
            </TouchableOpacity>

            <View
              style={{
                marginVertical: 20,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: couleurs.primary,
                borderRadius: 30,
              }}
            >
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  width: "80%",
                }}
                onPress={() => nextPage()}
              >
                <Text
                  style={{
                    textAlign: "center",
                    alignSelf: "center",
                    fontWeight: "500",
                    color: couleurs.secondary,
                    padding: 10,
                    paddingHorizontal: 20,
                    fontSize: 13,
                  }}
                >
                  {t("Je_valide_maintenant", preferredLangage)}
                </Text>
              </TouchableOpacity>
            </View>

            {/* LOADING MODAL */}

            <Modal transparent={true} visible={isLoading}>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
