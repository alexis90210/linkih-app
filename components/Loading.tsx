import * as React from "react"
import {View, ActivityIndicator , Modal} from 'react-native';
const LoadingModal = ({loading}:{loading:boolean}) => (
 <Modal visible={loading}>
  
    <ActivityIndicator size={'large'}/>
 
 </Modal>
)

export default LoadingModal
