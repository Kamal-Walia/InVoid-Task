import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Svg, Defs, Rect, Mask, Circle} from 'react-native-svg';

const content = ['Hello', 'world', 'Hello', 'world', 'Hello', 'world'];

const SvgCircle = (props) => {
  return (
    <Svg height="100%" width="100%">
      <Defs>
        <Mask id="mask" x="0" y="0" height="100%" width="100%">
          <Rect height="100%" width="100%" fill="#fff" />
          <Circle r="30%" cx="50%" cy="35%" fill="black" />
        </Mask>
      </Defs>
      <Rect
        height="100%"
        width="100%"
        fill="rgba(0, 0, 0, 0.8)"
        mask="url(#mask)"
        fill-opacity="0"
      />
    </Svg>
  );
};

const App: () => React$Node = () => {
  let camera = useRef(null);

  const [showContent, handleShowContent] = useState(false);

  const takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          captureAudio={false}>
          <SvgCircle />
        </RNCamera>
        <View style={{alignSelf: 'center', backgroundColor:'rgba(0, 0, 0, 0.8)', width:'100%'}}>
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Image
              source={require('./capture.png')}
              style={{height: 50, width: 50}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={{width: '100%', padding: 10}}
            onPress={() => handleShowContent(!showContent)}>
            <View style={styles.slide} />
          </TouchableOpacity>
          <View style={styles.bottomSubContainer}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              Instructions for Selfie
            </Text>
            <Text style={{fontSize: 16, color: 'grey', marginTop: 20}}>
              We will verify you using this selfie
            </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 20}}>
              Tips
            </Text>
            {showContent &&
              content.map((item) => (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('./tick.png')}
                    style={{height: 25, width: 25}}
                  />
                  <Text style={{color: 'grey', padding: 10}}>{item}</Text>
                </View>
              ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  capture: {
    flex: 0,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  bottomContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  slide: {
    backgroundColor: 'grey',
    paddingHorizontal: 25,
    paddingVertical: 2,
    alignSelf: 'center',
    borderRadius: 2,
  },
  bottomSubContainer: {
    padding: 10,
    marginTop: 20,
  },
});

export default App;
