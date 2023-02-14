import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';

import ArrowLeftIcon from '../components/ArrowLeft';

export default function Rdv({navigation}: {navigation: any}) {
  return (
    <View>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: 30,
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </Pressable>
          <Text style={{color: '#000', fontSize: 18, fontWeight: '700'}}>
            Mes rendez-vous
          </Text>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            backgroundColor: '#f6f6f6f6',
          }}>
        
          <View style={{marginHorizontal: 12, marginBottom: 60}}>
            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%',
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,
                  fontWeight: '600',
                  opacity: 0.8,
                }}>
                Le grand Salon sud
              </Text>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontWeight: '800',
                  }}>
                  Lundi .
                </Text>
                <Text
                  style={{
                    color: '#841584',
                    paddingVertical: 3,
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                  15:30:50
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontWeight: '600',
                  }}>
                  Maquillage
                </Text>

                <Pressable onPress={() => null}>
                  <Text
                    style={{
                      color: '#841584',
                      paddingVertical: 3,
                      fontSize: 15,
                      fontWeight: '600',
                    }}>
                    Annuler
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={{height:1, overflow:'hidden', paddingHorizontal:10}}>
              <View style={{height:1,  borderWidth:1, borderColor:'#84158490', borderStyle:'dashed'}}></View>
            </View>

            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%'
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,
                  fontWeight: '600',
                  opacity: 0.8,
                }}>
                Le grand Salon Nord
              </Text>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontWeight: '800',
                  }}>
                  Jeudi .
                </Text>
                <Text
                  style={{
                    color: '#841584',
                    paddingVertical: 3,
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                  15:30:50
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontWeight: '600',
                  }}>
                  Soin ongle
                </Text>

                <Pressable onPress={() => null}>
                  <Text
                    style={{
                      color: '#841584',
                      paddingVertical: 3,
                      fontSize: 15,
                      fontWeight: '600',
                    }}>
                    Annuler
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={{height:1, overflow:'hidden', paddingHorizontal:10}}>
              <View style={{height:1,  borderWidth:1, borderColor:'#84158490', borderStyle:'dashed'}}></View>
            </View>

            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%'
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,
                  fontWeight: '600',
                  opacity: 0.8,
                }}>
                Le grand Salon Nord
              </Text>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontWeight: '800',
                  }}>
                  Jeudi .
                </Text>
                <Text
                  style={{
                    color: '#841584',
                    paddingVertical: 3,
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                  15:30:50
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontWeight: '600',
                  }}>
                  Soin ongle
                </Text>

                <Pressable onPress={() => null}>
                  <Text
                    style={{
                      color: '#841584',
                      paddingVertical: 3,
                      fontSize: 15,
                      fontWeight: '600',
                    }}>
                    Annuler
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={{height:1, overflow:'hidden', paddingHorizontal:10}}>
              <View style={{height:1,  borderWidth:1, borderColor:'#84158490', borderStyle:'dashed'}}></View>
            </View>

            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%'
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,
                  fontWeight: '600',
                  opacity: 0.8,
                }}>
                Le grand Salon Nord
              </Text>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontWeight: '800',
                  }}>
                  Jeudi .
                </Text>
                <Text
                  style={{
                    color: '#841584',
                    paddingVertical: 3,
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                  15:30:50
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontWeight: '600',
                  }}>
                  Soin ongle
                </Text>

                <Pressable onPress={() => null}>
                  <Text
                    style={{
                      color: '#841584',
                      paddingVertical: 3,
                      fontSize: 15,
                      fontWeight: '600',
                    }}>
                    Annuler
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={{height:1, overflow:'hidden', paddingHorizontal:10}}>
              <View style={{height:1,  borderWidth:1, borderColor:'#84158490', borderStyle:'dashed'}}></View>
            </View>

            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%'
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,
                  fontWeight: '600',
                  opacity: 0.8,
                }}>
                Le grand Salon Nord
              </Text>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontWeight: '800',
                  }}>
                  Jeudi .
                </Text>
                <Text
                  style={{
                    color: '#841584',
                    paddingVertical: 3,
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                  15:30:50
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontWeight: '600',
                  }}>
                  Soin ongle
                </Text>

                <Pressable onPress={() => null}>
                  <Text
                    style={{
                      color: '#841584',
                      paddingVertical: 3,
                      fontSize: 15,
                      fontWeight: '600',
                    }}>
                    Annuler
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={{height:1, overflow:'hidden', paddingHorizontal:10}}>
              <View style={{height:1,  borderWidth:1, borderColor:'#84158490', borderStyle:'dashed'}}></View>
            </View>

            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                padding: 14,
                width: '100%'
              }}>
              <Text
                style={{
                  color: '#000',
                  paddingVertical: 3,
                  fontSize: 16,
                  fontWeight: '600',
                  opacity: 0.8,
                }}>
                Le grand Salon Nord
              </Text>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontWeight: '800',
                  }}>
                  Jeudi .
                </Text>
                <Text
                  style={{
                    color: '#841584',
                    paddingVertical: 3,
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                  15:30:50
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    paddingVertical: 3,
                    fontSize: 15,
                    fontWeight: '600',
                  }}>
                  Soin ongle
                </Text>

                <Pressable onPress={() => null}>
                  <Text
                    style={{
                      color: '#841584',
                      paddingVertical: 3,
                      fontSize: 15,
                      fontWeight: '600',
                    }}>
                    Annuler
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Welcome text */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
