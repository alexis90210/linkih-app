import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const MinusIcon = ({color}: {color: any}) => (
  <Svg width={24} height={24}>
    <Path
      d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
      fill={color}
    />
  </Svg>
);

export default MinusIcon;
