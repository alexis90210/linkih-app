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
} from "react-native";

import ArrowLeftIcon from "../components/ArrowLeft";
import { CustomFont, couleurs } from "../components/color";
import ApiService from "../components/api/service";
import axios from "axios";
import storage from "../components/api/localstorage";
import { Picker } from "@react-native-picker/picker";
import translations from "../translations/translations";
import secureStorage from "../components/api/secureStorage";

export default function MesHoraires({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
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

  // LOADER
  const [isLoading, setLoading] = useState(false);
  const [isLoadingHoraire, setLoadingHoraire] = useState(false);

  // GET USER CONNECTED
  const [userConnected, SetUserConnected] = useState<any>({});

  // GET HORAIRES
  const [Horaires, SetHoraires] = useState<any>({});

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
          SetHoraires(response.data.message.horaire_ouverture);

          SetUserConnected(response.data.message.etablissement[0]);

          if (!isLoadingHoraire) {
            response.data.message.horaire_ouverture.map(
              (row: any, index: any) => {
                if (row.jour == "Lundi") {
                  setSelectedHoraireOuvertureLundi(row.heure_ouverture);
                  setSelectedHoraireFermetureLundi(row.heure_fermeture);
                }
                if (row.jour == "Mardi") {
                  setSelectedHoraireOuvertureMardi(row.heure_ouverture);
                  setSelectedHoraireFermetureMardi(row.heure_fermeture);
                }

                if (row.jour == "Mercredi") {
                  setSelectedHoraireOuvertureMercredi(row.heure_ouverture);
                  setSelectedHoraireFermetureMercredi(row.heure_fermeture);
                }

                if (row.jour == "Jeudi") {
                  setSelectedHoraireOuvertureJeudi(row.heure_ouverture);
                  setSelectedHoraireFermetureJeudi(row.heure_fermeture);
                }

                if (row.jour == "Vendredi") {
                  setSelectedHoraireOuvertureVendredi(row.heure_ouverture);
                  setSelectedHoraireFermetureVendredi(row.heure_fermeture);
                }

                if (row.jour == "Samedi") {
                  setSelectedHoraireOuvertureSamedi(row.heure_ouverture);
                  setSelectedHoraireFermetureSamedi(row.heure_fermeture);
                }
              }
            );

            setLoadingHoraire(true);
          }
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadUserData();
  });

  var hours_matin = [
    {
      hour: "07:00",
    },
    {
      hour: "07:15",
    },
    {
      hour: "07:30",
    },
    {
      hour: "07:45",
    },
    {
      hour: "08:00",
    },
    {
      hour: "08:15",
    },
    {
      hour: "08:30",
    },
    {
      hour: "08:45",
    },
    {
      hour: "09:00",
    },
    {
      hour: "09:15",
    },
    {
      hour: "09:30",
    },
    {
      hour: "09:45",
    },
    {
      hour: "10:00",
    },
    {
      hour: "10:15",
    },
    {
      hour: "10:30",
    },
    {
      hour: "10:45",
    },
    {
      hour: "11:00",
    },
    {
      hour: "11:15",
    },
    {
      hour: "11:30",
    },
    {
      hour: "11:45",
    },
  ];

  var hours_apresmidi = [
    {
      hour: "12:00",
    },
    {
      hour: "12:15",
    },
    {
      hour: "12:30",
    },
    {
      hour: "12:45",
    },
    {
      hour: "13:00",
    },
    {
      hour: "13:15",
    },
    {
      hour: "13:30",
    },
    {
      hour: "13:45",
    },
    {
      hour: "15:00",
    },
    {
      hour: "15:15",
    },
    {
      hour: "15:30",
    },
    {
      hour: "15:45",
    },
    {
      hour: "16:00",
    },
    {
      hour: "16:15",
    },
    {
      hour: "16:30",
    },
    {
      hour: "16:45",
    },
    {
      hour: "17:00",
    },
    {
      hour: "17:15",
    },
    {
      hour: "17:30",
    },
    {
      hour: "17:45",
    },
  ];

  // Horaire debut
  const [selectedHoraireOuvertureLundi, setSelectedHoraireOuvertureLundi] =
    useState<any>(null);
  const [selectedHoraireOuvertureMardi, setSelectedHoraireOuvertureMardi] =
    useState<any>(null);
  const [
    selectedHoraireOuvertureMercredi,
    setSelectedHoraireOuvertureMercredi,
  ] = useState<any>(null);
  const [selectedHoraireOuvertureJeudi, setSelectedHoraireOuvertureJeudi] =
    useState<any>(null);
  const [
    selectedHoraireOuvertureVendredi,
    setSelectedHoraireOuvertureVendredi,
  ] = useState<any>(null);
  const [selectedHoraireOuvertureSamedi, setSelectedHoraireOuvertureSamedi] =
    useState<any>(null);

  // Horaire fin
  const [selectedHoraireFermetureLundi, setSelectedHoraireFermetureLundi] =
    useState<any>(null);
  const [selectedHoraireFermetureMardi, setSelectedHoraireFermetureMardi] =
    useState<any>(null);
  const [
    selectedHoraireFermetureMercredi,
    setSelectedHoraireFermetureMercredi,
  ] = useState<any>(null);
  const [selectedHoraireFermetureJeudi, setSelectedHoraireFermetureJeudi] =
    useState<any>(null);
  const [
    selectedHoraireFermetureVendredi,
    setSelectedHoraireFermetureVendredi,
  ] = useState<any>(null);
  const [selectedHoraireFermetureSamedi, setSelectedHoraireFermetureSamedi] =
    useState<any>(null);

  // HANDLE TIME

  const handleTimeLundiOuverture = (time: any) => {
    setSelectedHoraireOuvertureLundi(time);
  };

  const handleTimeMardiOuverture = (time: any) => {
    setSelectedHoraireOuvertureMardi(time);
  };

  const handleTimeMercrediOuverture = (time: any) => {
    setSelectedHoraireOuvertureMercredi(time);
  };

  const handleTimeJeudiOuverture = (time: any) => {
    setSelectedHoraireOuvertureJeudi(time);
  };

  const handleTimeVendrediOuverture = (time: any) => {
    setSelectedHoraireOuvertureVendredi(time);
  };

  const handleTimeSamediOuverture = (time: any) => {
    setSelectedHoraireOuvertureSamedi(time);
  };

  // FERMETURE

  const handleTimeLundiFermeture = (time: any) => {
    setSelectedHoraireFermetureLundi(time);
  };

  const handleTimeMardiFermeture = (time: any) => {
    setSelectedHoraireFermetureMardi(time);
  };

  const handleTimeMercrediFermeture = (time: any) => {
    setSelectedHoraireFermetureMercredi(time);
  };

  const handleTimeJeudiFermeture = (time: any) => {
    setSelectedHoraireFermetureJeudi(time);
  };

  const handleTimeVendrediFermeture = (time: any) => {
    setSelectedHoraireFermetureVendredi(time);
  };

  const handleTimeSamediFermeture = (time: any) => {
    setSelectedHoraireFermetureSamedi(time);
  };

  // VISIBLE
  const [visibleLundi, setVisibleLundi] = useState(false);

  const onDismissLundi = () => {
    setVisibleLundi(false);
  };

  // SAVE HORAIRE

  // console.log('........./////////', Horaires);

  const saveHoraire = () => {
    var final: {
      id: any;
      jour: any;
      heure_fermeture: any;
      heure_ouverture: any;
    }[] = [];
    Horaires.map((row: any, key: any) => {
      if (row.jour == "Lundi") {
        let jour = {
          id: row.id,
          jour: row.jour,
          heure_fermeture: selectedHoraireFermetureLundi,
          heure_ouverture: selectedHoraireOuvertureLundi,
        };

        final.push(jour);
      }

      if (row.jour == "Mardi") {
        let jour = {
          id: row.id,
          jour: row.jour,
          heure_fermeture: selectedHoraireFermetureMardi,
          heure_ouverture: selectedHoraireOuvertureMardi,
        };

        final.push(jour);
      }

      if (row.jour == "Mercredi") {
        let jour = {
          id: row.id,
          jour: row.jour,
          heure_fermeture: selectedHoraireFermetureMercredi,
          heure_ouverture: selectedHoraireOuvertureMercredi,
        };

        final.push(jour);
      }

      if (row.jour == "Jeudi") {
        let jour = {
          id: row.id,
          jour: row.jour,
          heure_fermeture: selectedHoraireFermetureJeudi,
          heure_ouverture: selectedHoraireOuvertureJeudi,
        };

        final.push(jour);
      }

      if (row.jour == "Vendredi") {
        let jour = {
          id: row.id,
          jour: row.jour,
          heure_fermeture: selectedHoraireFermetureVendredi,
          heure_ouverture: selectedHoraireOuvertureVendredi,
        };

        final.push(jour);
      }

      if (row.jour == "Samedi") {
        let jour = {
          id: row.id,
          jour: row.jour,
          heure_fermeture: selectedHoraireFermetureSamedi,
          heure_ouverture: selectedHoraireOuvertureSamedi,
        };

        final.push(jour);
      }
    });

    // SEND TO SERVER
    axios({
      method: "PUT",
      url: ApiService.API_URL_EDIT_HORAIRE,
      data: JSON.stringify({
        vendeur_id: userConnectedId,
        horaire: final,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response: { data: any }) => {
        var api = response.data;

        console.log(api);

        if (api.code == "success") {
          setLoading(false);
          Alert.alert("Succes!!", t("Operation_reussie", preferredLangage));
        }
      })
      .catch((error: any) => {
        console.log(error);

        Alert.alert("", t("erreur_survenue", preferredLangage));
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
            {t("Mes_Horaires", preferredLangage)}
          </Text>
        </View>

        {/* main */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: "#f6f6f6f6",
          }}
        >
          <View style={{ paddingHorizontal: 12, marginVertical: 10 }}>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 5,
                flexDirection: "column",
              }}
            >
              {/* LUNDI */}
              <View
                style={{
                  borderBottomColor: couleurs.primary,
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  padding: 20,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 15,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 12,
                    color: couleurs.dark,
                    alignSelf: "center",
                  }}
                >
                  {t("Lundi", preferredLangage)}
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      borderStyle: "solid",
                      borderColor: couleurs.primary,
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <Picker
                      style={{
                        width: 200,
                        height: 30,
                        alignSelf: "center",
                        position: "relative",
                        bottom: 10,
                        color: couleurs.dark,
                      }}
                      dropdownIconColor={couleurs.primary}
                      selectedValue={selectedHoraireOuvertureLundi}
                      onValueChange={(itemValue: any, itemIndex: any) =>
                        setSelectedHoraireOuvertureLundi(itemValue)
                      }
                    >
                      <Picker.Item
                        label={t("Selectionner_une_heure", preferredLangage)}
                        value={""}
                        enabled={false}
                        style={{ fontSize: 11 }}
                      />
                      <Picker.Item
                        label={t("MATIN", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_matin.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}

                      <Picker.Item
                        label={t("SOIR", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_apresmidi.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}
                    </Picker>
                  </View>

                  <View
                    style={{
                      borderStyle: "solid",
                      borderColor: couleurs.primary,
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <Picker
                      style={{
                        width: 200,
                        height: 30,
                        alignSelf: "center",
                        position: "relative",
                        bottom: 10,
                        color: couleurs.dark,
                      }}
                      dropdownIconColor={couleurs.primary}
                      selectedValue={selectedHoraireFermetureLundi}
                      onValueChange={(itemValue: any, itemIndex: any) =>
                        setSelectedHoraireFermetureLundi(itemValue)
                      }
                    >
                      <Picker.Item
                        label={t("Selectionner_une_heure", preferredLangage)}
                        value={""}
                        enabled={false}
                        style={{ fontSize: 11 }}
                      />
                      <Picker.Item
                        label={t("MATIN", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_matin.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}

                      <Picker.Item
                        label={t("SOIR", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_apresmidi.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>

              {/* MARDI */}

              <View
                style={{
                  borderBottomColor: couleurs.primary,
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  padding: 20,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 15,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 12,
                    color: couleurs.dark,
                    alignSelf: "center",
                  }}
                >
                  {t("Mardi", preferredLangage)}
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      borderStyle: "solid",
                      borderColor: couleurs.primary,
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <Picker
                      style={{
                        width: 200,
                        height: 30,
                        alignSelf: "center",
                        position: "relative",
                        bottom: 10,
                        color: couleurs.dark,
                      }}
                      dropdownIconColor={couleurs.primary}
                      selectedValue={selectedHoraireOuvertureMardi}
                      onValueChange={(itemValue: any, itemIndex: any) =>
                        setSelectedHoraireOuvertureMardi(itemValue)
                      }
                    >
                      <Picker.Item
                        label={t("Selectionner_une_heure", preferredLangage)}
                        value={""}
                        enabled={false}
                        style={{ fontSize: 11 }}
                      />
                      <Picker.Item
                        label={t("MATIN", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_matin.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}

                      <Picker.Item
                        label={t("SOIR", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_apresmidi.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}
                    </Picker>
                  </View>

                  <View
                    style={{
                      borderStyle: "solid",
                      borderColor: couleurs.primary,
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <Picker
                      style={{
                        width: 200,
                        height: 30,
                        alignSelf: "center",
                        position: "relative",
                        bottom: 10,
                        color: couleurs.dark,
                      }}
                      dropdownIconColor={couleurs.primary}
                      selectedValue={selectedHoraireFermetureMardi}
                      onValueChange={(itemValue: any, itemIndex: any) =>
                        setSelectedHoraireFermetureMardi(itemValue)
                      }
                    >
                      <Picker.Item
                        label={t("Selectionner_une_heure", preferredLangage)}
                        value={""}
                        enabled={false}
                        style={{ fontSize: 11 }}
                      />
                      <Picker.Item
                        label={t("MATIN", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_matin.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}

                      <Picker.Item
                        label={t("SOIR", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_apresmidi.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>

              {/* MERCREDI */}
              <View
                style={{
                  borderBottomColor: couleurs.primary,
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  padding: 20,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 15,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 12,
                    color: couleurs.dark,
                    alignSelf: "center",
                  }}
                >
                  {t("Mercredi", preferredLangage)}
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      borderStyle: "solid",
                      borderColor: couleurs.primary,
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <Picker
                      style={{
                        width: 200,
                        height: 30,
                        alignSelf: "center",
                        position: "relative",
                        bottom: 10,
                        color: couleurs.dark,
                      }}
                      dropdownIconColor={couleurs.primary}
                      selectedValue={selectedHoraireOuvertureMercredi}
                      onValueChange={(itemValue: any, itemIndex: any) =>
                        setSelectedHoraireOuvertureMercredi(itemValue)
                      }
                    >
                      <Picker.Item
                        label={t("Selectionner_une_heure", preferredLangage)}
                        value={""}
                        enabled={false}
                        style={{ fontSize: 11 }}
                      />
                      <Picker.Item
                        label={t("MATIN", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_matin.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}

                      <Picker.Item
                        label={t("SOIR", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_apresmidi.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}
                    </Picker>
                  </View>

                  <View
                    style={{
                      borderStyle: "solid",
                      borderColor: couleurs.primary,
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <Picker
                      style={{
                        width: 200,
                        height: 30,
                        alignSelf: "center",
                        position: "relative",
                        bottom: 10,
                        color: couleurs.dark,
                      }}
                      dropdownIconColor={couleurs.primary}
                      selectedValue={selectedHoraireFermetureMercredi}
                      onValueChange={(itemValue: any, itemIndex: any) =>
                        setSelectedHoraireFermetureMercredi(itemValue)
                      }
                    >
                      <Picker.Item
                        label={t("Selectionner_une_heure", preferredLangage)}
                        value={""}
                        enabled={false}
                        style={{ fontSize: 11 }}
                      />
                      <Picker.Item
                        label={t("MATIN", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_matin.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}

                      <Picker.Item
                        label={t("SOIR", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_apresmidi.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>

              {/* JEUDDI */}
              <View
                style={{
                  borderBottomColor: couleurs.primary,
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  padding: 20,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 15,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 12,
                    color: couleurs.dark,
                    alignSelf: "center",
                  }}
                >
                  {t("Jeudi", preferredLangage)}
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      borderStyle: "solid",
                      borderColor: couleurs.primary,
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <Picker
                      style={{
                        width: 200,
                        height: 30,
                        alignSelf: "center",
                        position: "relative",
                        bottom: 10,
                        color: couleurs.dark,
                      }}
                      dropdownIconColor={couleurs.primary}
                      selectedValue={selectedHoraireOuvertureJeudi}
                      onValueChange={(itemValue: any, itemIndex: any) =>
                        setSelectedHoraireOuvertureJeudi(itemValue)
                      }
                    >
                      <Picker.Item
                        label={t("Selectionner_une_heure", preferredLangage)}
                        value={""}
                        enabled={false}
                        style={{ fontSize: 11 }}
                      />
                      <Picker.Item
                        label={t("MATIN", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_matin.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}

                      <Picker.Item
                        label={t("SOIR", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_apresmidi.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}
                    </Picker>
                  </View>

                  <View
                    style={{
                      borderStyle: "solid",
                      borderColor: couleurs.primary,
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <Picker
                      style={{
                        width: 200,
                        height: 30,
                        alignSelf: "center",
                        position: "relative",
                        bottom: 10,
                        color: couleurs.dark,
                      }}
                      dropdownIconColor={couleurs.primary}
                      selectedValue={selectedHoraireFermetureJeudi}
                      onValueChange={(itemValue: any, itemIndex: any) =>
                        setSelectedHoraireFermetureJeudi(itemValue)
                      }
                    >
                      <Picker.Item
                        label={t("Selectionner_une_heure", preferredLangage)}
                        value={""}
                        enabled={false}
                        style={{ fontSize: 11 }}
                      />
                      <Picker.Item
                        label={t("MATIN", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_matin.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}

                      <Picker.Item
                        label={t("SOIR", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_apresmidi.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>

              {/* VENDREDI */}
              <View
                style={{
                  borderBottomColor: couleurs.primary,
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  padding: 20,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 15,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 12,
                    color: couleurs.dark,
                    alignSelf: "center",
                  }}
                >
                  {t("Vendredi", preferredLangage)}
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      borderStyle: "solid",
                      borderColor: couleurs.primary,
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <Picker
                      style={{
                        width: 200,
                        height: 30,
                        alignSelf: "center",
                        position: "relative",
                        bottom: 10,
                        color: couleurs.dark,
                      }}
                      dropdownIconColor={couleurs.primary}
                      selectedValue={selectedHoraireOuvertureVendredi}
                      onValueChange={(itemValue: any, itemIndex: any) =>
                        setSelectedHoraireOuvertureVendredi(itemValue)
                      }
                    >
                      <Picker.Item
                        label={t("Selectionner_une_heure", preferredLangage)}
                        value={""}
                        enabled={false}
                        style={{ fontSize: 11 }}
                      />
                      <Picker.Item
                        label={t("MATIN", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_matin.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}

                      <Picker.Item
                        label={t("SOIR", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_apresmidi.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}
                    </Picker>
                  </View>

                  <View
                    style={{
                      borderStyle: "solid",
                      borderColor: couleurs.primary,
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <Picker
                      style={{
                        width: 200,
                        height: 30,
                        alignSelf: "center",
                        position: "relative",
                        bottom: 10,
                        color: couleurs.dark,
                      }}
                      dropdownIconColor={couleurs.primary}
                      selectedValue={selectedHoraireFermetureVendredi}
                      onValueChange={(itemValue: any, itemIndex: any) =>
                        setSelectedHoraireFermetureVendredi(itemValue)
                      }
                    >
                      <Picker.Item
                        label={t("Selectionner_une_heure", preferredLangage)}
                        value={""}
                        enabled={false}
                        style={{ fontSize: 11 }}
                      />
                      <Picker.Item
                        label={t("MATIN", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_matin.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}

                      <Picker.Item
                        label={t("SOIR", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_apresmidi.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>

              {/* SAMEDI */}
              <View
                style={{
                  borderBottomColor: couleurs.primary,
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  padding: 20,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 15,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontFamily: CustomFont.Poppins,
                    fontSize: 12,
                    color: couleurs.dark,
                    alignSelf: "center",
                  }}
                >
                  {t("Samedi", preferredLangage)}
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      borderStyle: "solid",
                      borderColor: couleurs.primary,
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <Picker
                      style={{
                        width: 200,
                        height: 30,
                        alignSelf: "center",
                        position: "relative",
                        bottom: 10,
                        color: couleurs.dark,
                      }}
                      dropdownIconColor={couleurs.primary}
                      selectedValue={selectedHoraireOuvertureSamedi}
                      onValueChange={(itemValue: any, itemIndex: any) =>
                        setSelectedHoraireOuvertureSamedi(itemValue)
                      }
                    >
                      <Picker.Item
                        label={t("Selectionner_une_heure", preferredLangage)}
                        value={""}
                        enabled={false}
                        style={{ fontSize: 11 }}
                      />
                      <Picker.Item
                        label={t("MATIN", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_matin.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}

                      <Picker.Item
                        label={t("SOIR", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_apresmidi.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}
                    </Picker>
                  </View>

                  <View
                    style={{
                      borderStyle: "solid",
                      borderColor: couleurs.primary,
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <Picker
                      style={{
                        width: 200,
                        height: 30,
                        alignSelf: "center",
                        position: "relative",
                        bottom: 10,
                        color: couleurs.dark,
                      }}
                      dropdownIconColor={couleurs.primary}
                      selectedValue={selectedHoraireFermetureSamedi}
                      onValueChange={(itemValue: any, itemIndex: any) =>
                        setSelectedHoraireFermetureSamedi(itemValue)
                      }
                    >
                      <Picker.Item
                        label={t("Selectionner_une_heure", preferredLangage)}
                        value={""}
                        enabled={false}
                        style={{ fontSize: 11 }}
                      />
                      <Picker.Item
                        label={t("MATIN", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_matin.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}

                      <Picker.Item
                        label={t("SOIR", preferredLangage)}
                        value={"-1"}
                        enabled={false}
                      />
                      {hours_apresmidi.map((row, index) => (
                        <Picker.Item
                          key={index}
                          label={row.hour}
                          value={row.hour}
                          style={{ fontSize: 13 }}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={{ padding: 10 }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 15,
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              backgroundColor: couleurs.primary,
              borderRadius: 30,
              width: "100%",
            }}
            onPress={() => saveHoraire()}
          >
            <Text
              style={{
                textAlign: "center",
                padding: 10,
                paddingHorizontal: 20,
                fontSize: 13,
                fontWeight: "500",
                color: couleurs.secondary,
                fontFamily: CustomFont.Poppins,
              }}
            >
              {t("Enregistrer", preferredLangage)}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
