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

export default function MaCategorie({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  // LOADER
  const [isLoading, setLoading] = useState(false);

  // GET USER CONNECTED
  const [userConnected, SetUserConnected] = useState<any>({});

  const [userConnectedId, SetUserConnectedId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let _userConnectedId = await secureStorage.getKey("utilisateur");
      if (_userConnectedId) SetUserConnected(_userConnectedId);
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
          SetUserConnected(response.data.message.etablissement[0]);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadUserData();
  });

  //   GET GALLERIE
  const [CategorieVendeur, setCategorieVendeur] = useState([]);
  const [isLoadedCategorieVendeur, setLoadedCategorieVendeur] = useState(false);

  const loadCategorieVendeur = () => {
    axios({
      method: "POST",
      url: "", //ApiService.,
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
          setLoadedCategorieVendeur(true);
          setCategorieVendeur(api.message);
        }
        if (api.code == "error") {
          Alert.alert("", "Erreur survenue");
        }
      })
      .catch((error: any) => {
        console.log(error);
        Alert.alert("", "Erreur Network");
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
            Mes Categories
          </Text>
        </View>

        {/* main */}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: "#f6f6f6f6",
          }}
        >
          <View style={{ marginHorizontal: 12, marginVertical: 10 }}>
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
