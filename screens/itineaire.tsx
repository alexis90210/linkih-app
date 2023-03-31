import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import ApiService from '../components/api/service';



MapboxGL.setAccessToken(ApiService.MAPBOX_GL_TOKEN);

export default function DrawItineaire({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  return (
    <Text>Mode</Text>
  );
}
