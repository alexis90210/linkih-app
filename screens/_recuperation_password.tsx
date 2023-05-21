import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { CustomFont, couleurs } from "../components/color";
import storage from "../components/api/localstorage";
import ApiService from "../components/api/service";
import axios from "axios";
import translations from "../translations/translations";
import CloseIcon from "../components/close";

// RecuperationPassword
export default function RecuperationPassword({
  navigation,
}: {
  navigation: any;
}) {
  /////////////////////////////////// LANGUAGE HANDLER //////////////////////////////////
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

  const [isProccessing, setProcessing] = useState(false);
  const [codeVal, setCodeVal] = useState("");
  const [InputedcodeVal, setInputedCodeVal] = useState("");
  const [Login, setLogin] = useState("");
  const [Password, setPassword] = useState("");
  const [isVisibleCodeValModal, setVisibleCodeValModal] = useState(false);
  const [isVisiblePasswordValModal, setVisiblePasswordValModal] =
    useState(false);

  const onSubmitGenerateCodeValidation = () => {
    setProcessing(true);
    axios({
      method: "PUT",
      url: ApiService.API_URL_EDIT_UTILISATEUR,
      data: JSON.stringify({
        login: Login,
        recup: 1,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response: { data: any }) => {
        var api = response.data;
        console.log(api);
        setProcessing(false);

        if (api.code == "success") {
          // Alert.alert('SUCCES', t('mot_de_passe_change', preferredLangage), [
          //   {text: t('se_connecter', preferredLangage), onPress: () => navigation.goBack()},
          // ]);
          setCodeVal(api.validation);
          setVisibleCodeValModal(true);
        }
        if (api.code == "error") {
        }
      })
      .catch((error: any) => {
        setProcessing(false);
        console.log(error);
      });
  };

  // change password
  const onSubmitResetPassword = () => {
    setVisibleCodeValModal(false);
    setProcessing(true);
    axios({
      method: "PUT",
      url: ApiService.API_URL_EDIT_UTILISATEUR,
      data: JSON.stringify({
        login: Login,
        recup: 2,
        password: Password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response: { data: any }) => {
        var api = response.data;
        console.log(api);
        setProcessing(false);

        if (api.code == "success") {
          Alert.alert("SUCCES", t("mot_de_passe_change", preferredLangage), [
            {
              text: t("se_connecter", preferredLangage),
              onPress: () => navigation.goBack(),
            },
          ]);
        }
        if (api.code == "error") {
        }
      })
      .catch((error: any) => {
        setProcessing(false);
        console.log(error);
      });
  };

  // Val account
  const checkCode = () => {
    if (InputedcodeVal == codeVal) {
      setVisiblePasswordValModal(true);
      setVisibleCodeValModal(false);
      setCodeVal("");
    } else {
      Alert.alert("", t("code_valide_invalid", preferredLangage));
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#f6f6f6f6",
        }}
      >
        {/* LOADING MODAL */}

        <Modal
          transparent={true}
          visible={isProccessing}
          style={{ backgroundColor: "rgba(100,100,100,.3)" }}
        >
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

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: "#f6f6f6f6",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontFamily: CustomFont.Poppins,
                fontSize: 13,
                marginVertical: 10,
                paddingHorizontal: 15,
              }}
            >
              {t("nouveau_temp_pass_code", preferredLangage)}
            </Text>
            <View
              style={{
                marginVertical: 10,
                backgroundColor: "#fff",
                borderRadius: 11,
                padding: 20,
                width: "90%",
                marginTop: 20,
              }}
            >
              <View
                style={{
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: couleurs.dark,
                    fontSize: 13,
                    height: 30,
                    opacity: 0.85,
                    fontFamily: CustomFont.Poppins,
                  }}
                >
                  {t("login", preferredLangage)}
                </Text>
                <TextInput
                  defaultValue={Login}
                  onChangeText={(input) => {
                    setLogin(input);
                  }}
                  placeholder={t("entrez_votre_identifiant", preferredLangage)}
                  style={{
                    backgroundColor: "transparent",
                    borderBottomWidth: 1,
                    borderBottomColor: couleurs.primary,
                    color: couleurs.primary,
                    width: "100%",
                    fontFamily: CustomFont.Poppins,
                    fontSize: 15,
                  }}
                ></TextInput>
              </View>

              <View
                style={{
                  alignItems: "center",
                  backgroundColor: couleurs.primary,
                  borderRadius: 30,
                  marginBottom: 20,
                  marginTop: 30,
                }}
              >
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 10,
                    width: "70%",
                  }}
                  onPress={() => onSubmitGenerateCodeValidation()}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      padding: 10,
                      paddingHorizontal: 20,
                      fontSize: 13,
                      fontFamily: CustomFont.Poppins,
                      color: couleurs.secondary,
                    }}
                  >
                    {t("Demandez", preferredLangage)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                alignItems: "center",
                backgroundColor: "transparent",
                borderRadius: 30,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 70,
              }}
            >
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                }}
                onPress={() => null}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 13,
                    fontFamily: CustomFont.Poppins,
                    color: couleurs.primary,
                  }}
                >
                  {t("besoin_d_aide", preferredLangage)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* MODAL CODE VALIDATION */}
          <Modal transparent={true} visible={isVisibleCodeValModal}>
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
              <View
                style={{
                  marginVertical: 10,
                  backgroundColor: "#fff",
                  borderRadius: 11,
                  padding: 20,
                  width: "90%",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setVisibleCodeValModal(false);
                  }}
                  style={{ alignSelf: "flex-end" }}
                >
                  <CloseIcon color={couleurs.primary} />
                </TouchableOpacity>

                <View
                  style={{
                    marginTop: 20,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: couleurs.dark,
                      fontSize: 13,
                      height: 30,
                      opacity: 0.85,
                      fontFamily: CustomFont.Poppins,
                    }}
                  >
                    {t("validation_code", preferredLangage)}
                  </Text>
                  <TextInput
                    defaultValue={InputedcodeVal}
                    onChangeText={(input) => {
                      setInputedCodeVal(input);
                    }}
                    placeholder={t("entrez_validation_code", preferredLangage)}
                    style={{
                      backgroundColor: "transparent",
                      borderBottomWidth: 1,
                      borderBottomColor: couleurs.primary,
                      color: couleurs.primary,
                      width: "100%",
                      fontFamily: CustomFont.Poppins,
                      fontSize: 15,
                    }}
                  ></TextInput>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: couleurs.primary,
                    borderRadius: 30,
                    marginBottom: 20,
                    marginTop: 30,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 10,
                      width: "70%",
                    }}
                    onPress={() => checkCode()}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        padding: 10,
                        paddingHorizontal: 20,
                        fontSize: 13,
                        fontFamily: CustomFont.Poppins,
                        color: couleurs.secondary,
                      }}
                    >
                      {t("Valider", preferredLangage)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* MODAL PASSWORD */}
          <Modal transparent={true} visible={isVisiblePasswordValModal}>
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
              <View
                style={{
                  marginVertical: 10,
                  backgroundColor: couleurs.white,
                  borderRadius: 11,
                  padding: 20,
                  width: "90%",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setVisiblePasswordValModal(false);
                  }}
                  style={{ alignSelf: "flex-end" }}
                >
                  <CloseIcon color={couleurs.primary} />
                </TouchableOpacity>

                <View
                  style={{
                    marginTop: 20,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: couleurs.dark,
                      fontSize: 13,
                      height: 30,
                      opacity: 0.85,
                      fontFamily: CustomFont.Poppins,
                    }}
                  >
                    {t("mot_de_passe", preferredLangage)}
                  </Text>
                  <TextInput
                    defaultValue={Password}
                    onChangeText={(input) => {
                      setPassword(input);
                    }}
                    placeholder={t("mot_de_passe", preferredLangage)}
                    style={{
                      backgroundColor: "#ddd",
                      borderBottomWidth: 1,
                      borderBottomColor: couleurs.white,
                      color: couleurs.dark,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      width: "100%",
                      fontFamily: CustomFont.Poppins,
                      fontSize: 13,
                    }}
                  ></TextInput>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: "rgba(30,200,20,.6)",
                    borderRadius: 30,
                    marginBottom: 20,
                    marginTop: 30,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 10,
                      width: "70%",
                    }}
                    onPress={() => onSubmitResetPassword()}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        padding: 10,
                        paddingHorizontal: 20,
                        fontSize: 13,
                        fontFamily: CustomFont.Poppins,
                        color: couleurs.white,
                      }}
                    >
                      {t("Valider", preferredLangage)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
