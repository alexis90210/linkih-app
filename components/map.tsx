import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const MapIcon = ({color = '#E2C6BB'}: {color: any}) => (
  <Svg width={24} height={24}>
    <Path
      d="M20.3814 21.13C20.1814 21.13 19.9914 21.05 19.8514 20.91L13.4714 14.53C13.1814 14.24 13.1814 13.76 13.4714 13.47L21.2014 5.74001C21.3914 5.55001 21.6814 5.48001 21.9414 5.55001C22.2014 5.63001 22.4014 5.84001 22.4614 6.10001C22.6514 6.95001 22.7514 7.90001 22.7514 9.00001V15C22.7514 17.77 22.1714 19.64 20.9114 20.91C20.7714 21.05 20.5614 21.08 20.3814 21.13ZM15.0614 14L20.3214 19.26C20.9514 18.29 21.2514 16.91 21.2514 15V9.00001C21.2514 8.59001 21.2414 8.21001 21.2114 7.85001L15.0614 14Z"
      fill={color}
    />
    <Path
      d="M6.26999 22.48C6.20999 22.48 6.16001 22.47 6.10001 22.46C2.79001 21.7 1.25 19.33 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C19.33 1.25 21.7 2.79001 22.46 6.10001C22.52 6.35001 22.44 6.62 22.26 6.8L6.79999 22.26C6.65999 22.4 6.46999 22.48 6.26999 22.48ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 18.47 3.71001 20.21 6.04001 20.9L20.89 6.05C20.21 3.72 18.46 2.75999 14.99 2.75999H9V2.75Z"
      fill={color}
    />
    <Path
      d="M15.0004 22.7514H9.00037C7.90037 22.7514 6.96038 22.6614 6.10038 22.4614C5.83038 22.4014 5.62036 22.2014 5.55036 21.9414C5.47036 21.6814 5.55036 21.4014 5.74036 21.2014L13.4704 13.4714C13.7604 13.1814 14.2404 13.1814 14.5304 13.4714L20.9104 19.8514C21.0504 19.9914 21.1304 20.1814 21.1304 20.3814C21.1304 20.5814 21.0504 20.7714 20.9104 20.9114C19.6404 22.1714 17.7704 22.7514 15.0004 22.7514ZM7.85038 21.2114C8.21038 21.2414 8.59037 21.2514 9.00037 21.2514H15.0004C16.9204 21.2514 18.2904 20.9514 19.2604 20.3214L14.0004 15.0614L7.85038 21.2114Z"
      fill={color}
    />
    <Path
      d="M9.11896 13.3091C8.48896 13.3091 7.85895 13.0791 7.35895 12.6091C5.76895 11.0991 5.12898 9.43908 5.50898 7.81908C5.88898 6.15908 7.33896 5.03906 9.11896 5.03906C10.899 5.03906 12.349 6.15908 12.729 7.81908C13.099 9.44908 12.459 11.0991 10.869 12.6091C10.379 13.0691 9.74896 13.3091 9.11896 13.3091ZM6.96897 8.14906C6.64897 9.50906 7.56896 10.7291 8.39896 11.5191C8.80896 11.9091 9.43897 11.9091 9.83897 11.5191C10.659 10.7391 11.579 9.51906 11.269 8.14906C10.999 6.95906 9.93896 6.52907 9.11896 6.52907C8.29896 6.52907 7.24897 6.95906 6.96897 8.14906Z"
      fill={color}
    />
    <Path
      d="M9.14844 9.48828C8.59844 9.48828 8.14844 9.03828 8.14844 8.48828C8.14844 7.93828 8.58844 7.48828 9.14844 7.48828H9.15845C9.70845 7.48828 10.1584 7.93828 10.1584 8.48828C10.1584 9.03828 9.69844 9.48828 9.14844 9.48828Z"
      fill={color}
    />
  </Svg>
);

export default MapIcon;
