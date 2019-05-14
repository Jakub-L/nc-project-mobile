import React from 'react';
import {
  Platform, View, Text, TouchableOpacity,
} from 'react-native';
import {
  AR, Constants, Location, Permissions,
} from 'expo';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import { View as GraphicsView } from 'expo-graphics';
import relativePhotoDirectionsFromPhone from './utils/RelativePhotoLocation';
import TouchableView from './TouchableView';
import arupStyles from '../styles/arupStyles';

export default class BasicARScene extends React.Component {
  static navigationOptions = {
    title: 'AR Viewer',
  };

  touch = new THREE.Vector2();

  raycaster = new THREE.Raycaster();

  state = {
    location: undefined,
    heading: undefined,
    arAvailable: false,
  };

  async componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({ arAvailable: false });
    } else {
      await Permissions.askAsync(Permissions.LOCATION);
      this.getLocationAsync();
    }
  }

  componentDidMount() {
    THREE.suppressExpoWarnings(true);
    ThreeAR.suppressWarnings();
  }

  getLocationAsync = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const heading = await Location.getHeadingAsync({});
    this.setState({ heading, location });
  };

  onContextCreate = async ({
    gl, scale: pixelRatio, width, height,
  }, relativeDirections) => {
    AR.setPlaneDetection({ Horizontal: 'horizontal' });
    this.renderer = new ExpoTHREE.Renderer({
      gl,
      pixelRatio,
      width,
      height,
    });
    this.scene = new THREE.Scene();
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);
    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);
    const geometry = new THREE.CylinderGeometry(0.2, 0.2, 100, 12);
    const material = new THREE.MeshPhongMaterial({
      color: 0xff0800,
    });

    relativeDirections.forEach((relativeDirection) => {
      this.cylinder = new THREE.Mesh(geometry, material);
      this.cylinder.position.x = relativeDirection.right;
      this.cylinder.position.y = 0;
      this.cylinder.position.z = relativeDirection.forward;
      this.cylinder.type = relativeDirection.pin_id;
      this.scene.add(this.cylinder);
    });

    this.scene.add(new THREE.AmbientLight(0xffffff));
  };

  onResize = ({
    x, y, scale, width, height,
  }) => {
    if (!this.renderer) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  onRender = () => {
    this.renderer.render(this.scene, this.camera);
  };

  onTouchesBegan = async ({ locationX: x, locationY: y }) => {
    if (!this.renderer) return;

    const size = this.renderer.getSize();
    this.touch.x = x / size.width - 0.3;
    this.touch.y = y / size.height;
    this.touch.z = 100;
    this.runHitTest();
  };

  runHitTest = () => {
    const { navigation } = this.props;
    this.raycaster.setFromCamera(this.touch, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    if (intersects.length) {
      navigation.getParam('findSelectedPin')(intersects[0].object.type);
    }
  };

  render() {
    const { navigation } = this.props;
    const { location, heading, arAvailable } = this.state;
    if (location === undefined || heading === undefined) {
      return <View />;
    }
    const relativeDirections = relativePhotoDirectionsFromPhone(
      location.coords.latitude,
      location.coords.longitude,
      navigation.getParam('pins'),
      heading.trueHeading,
    );

    return arAvailable ? (
      <>
        <TouchableView
          style={{ flex: 9 }}
          shouldCancelWhenOutside={false}
          onTouchesBegan={this.onTouchesBegan}
        >
          <GraphicsView
            style={{ flex: 9 }}
            onContextCreate={options => this.onContextCreate(options, relativeDirections)}
            onRender={this.onRender}
            onResize={this.onResize}
            isArEnabled
            isArRunningStateEnabled
            isArCameraStateEnabled
            arTrackingConfiguration={AR.TrackingConfiguration.World}
          />
        </TouchableView>
        <TouchableOpacity
          style={arupStyles.blueButton}
          onPress={() => navigation.navigate('AddPin')}
        >
          <Text style={arupStyles.blueButtonText}>Add Pin</Text>
        </TouchableOpacity>
      </>
    ) : (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#157eaa', fontSize: 26 }}>Sorry!</Text>
        <Text
          style={{
            color: '#157eaa',
            fontSize: 20,
            marginLeft: 100,
            marginRight: 100,
            textAlign: 'center',
          }}
        >
          AR functionality is currently unavailable on Android
        </Text>
        <TouchableOpacity />
      </View>
    );
  }
}
