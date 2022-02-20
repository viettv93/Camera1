import React, { useRef, useState } from "react"
import { Text, TouchableOpacity, View, StyleSheet, Modal, Image } from "react-native"
import { RNCamera } from 'react-native-camera';

const CameraView = (props) => {
  const [visible, setVisible] = useState(false);
  const [uri, setUri] = useState(null)
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back)
  const camera = useRef(null);

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.current.takePictureAsync(options);
      setUri(data.uri);
      console.log(data.uri);
    }

    setVisible(false)
  };

  const setUpCameraType = () => {
    if(cameraType == RNCamera.Constants.Type.back)
      setCameraType(RNCamera.Constants.Type.front)
    else
    setCameraType(RNCamera.Constants.Type.back)
  }

  return (
    <View style={styles.container}>
      {visible && (
        <RNCamera
          ref={camera}
          style={styles.preview}
          type={cameraType}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
      )}

      {!visible && (
        <Image
          style={{ width: '100%', height: 500 }}
          source={{uri: uri}}
        />
      )}
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        {visible && (
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        )}

        {visible && (
          <TouchableOpacity onPress={setUpCameraType} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Change camera type </Text>
          </TouchableOpacity>
        )}

        {!visible && (
          <TouchableOpacity onPress={() => setVisible(true)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Take a picture </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'green',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
export default CameraView