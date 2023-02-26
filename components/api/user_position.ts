import Geolocation from '@react-native-community/geolocation';

type UserPosition = any
var UserPosition: UserPosition = {}
 
 Geolocation.getCurrentPosition(
  info => {
    UserPosition = info.coords
  }
  );

export default UserPosition;
