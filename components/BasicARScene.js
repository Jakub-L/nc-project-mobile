import React from 'react';
import {
  AppRegistry, Platform, View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import {
  AR, Asset, Constants, Location, Permissions,
} from 'expo';
// Let's alias ExpoTHREE.AR as ThreeAR so it doesn't collide with Expo.AR.
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
// Let's also import `expo-graphics`
// expo-graphics manages the setup/teardown of the gl context/ar session, creates a frame-loop, and observes size/orientation changes.
// it also provides debug information with `isArCameraStateEnabled`
import { View as GraphicsView } from 'expo-graphics';
import relativePhotoDirectionsFromPhone from './utils/RelativePhotoLocation';
import TouchableView from './TouchableView';
import arupStyles from '../styles/arupStyles';

export default class BasicARScene extends React.Component {
  touch = new THREE.Vector2();
  raycaster = new THREE.Raycaster();
  state = {
    location: undefined,
    heading: undefined,
    errorMessage: null,
    pins: [],
    relativeDirections: undefined,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    const heading = await Location.getHeadingAsync({});
    this.setState({ heading });
  };

  render() {
    const { navigation } = this.props;
    if (this.state.location === undefined || this.state.heading === undefined) {
      return <View />;
    }
    const relativeDirections = relativePhotoDirectionsFromPhone(
      this.state.location.coords.latitude,
      this.state.location.coords.longitude,
      this.props.navigation.getParam('pins'),
      this.state.heading.trueHeading,
    );

    return (
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
    );
  }

  componentDidMount() {
    // Turn off extra warnings

    THREE.suppressExpoWarnings(true);
    ThreeAR.suppressWarnings();
  }

  // When our context is built we can start coding 3D things.
  onContextCreate = async ({
    gl, scale: pixelRatio, width, height,
  }, relativeDirections) => {
    // This will allow ARKit to collect Horizontal surfaces
    AR.setPlaneDetection({ Horizontal: 'horizontal' });
    // Create a 3D renderer
    this.renderer = new ExpoTHREE.Renderer({
      gl,
      pixelRatio,
      width,
      height,
    });

    // We will add all of our meshes to this scene.
    this.scene = new THREE.Scene();
    // This will create a camera texture and use it as the background for our scene
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);
    // Now we make a camera that matches the device orientation.
    // Ex: When we look down this camera will rotate to look down too!
    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);

    // Make a cube - notice that each unit is 1 meter in real life, we will make our box 0.1 meters
    const geometry = new THREE.CylinderGeometry(0.2, 0.2, 100, 12);
    // Simple color material
    const material = new THREE.MeshPhongMaterial({
      color: 0xff0800,
    });

    console.log(relativeDirections.length, '<--length of array in basic AR scene');

    relativeDirections.forEach((relativeDirection) => {
      // Combine our geometry and material
      this.cylinder = new THREE.Mesh(geometry, material);
      this.cylinder.position.x = relativeDirection.right;
      this.cylinder.position.y = 0;
      this.cylinder.position.z = relativeDirection.forward;
      this.cylinder.type = relativeDirection.pin_id;
      this.scene.add(this.cylinder);
    });

    // Setup a light so we can see the cube color
    // AmbientLight colors all things in the scene equally.
    this.scene.add(new THREE.AmbientLight(0xffffff));
  };

  // When the phone rotates, or the view changes size, this method will be called.
  onResize = ({
    x, y, scale, width, height,
  }) => {
    // Let's stop the function if we haven't setup our scene yet
    if (!this.renderer) {
      return;
    }
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  // Called every frame.
  onRender = () => {
    // Finally render the scene with the AR Camera
    this.renderer.render(this.scene, this.camera);
  };

  onTouchesBegan = async ({ locationX: x, locationY: y }) => {
    if (!this.renderer) {
      return;
    }

    const size = this.renderer.getSize();
<<<<<<< HEAD

this.touch.x=x/size.width-0.3
this.touch.y=y/ size.height
this.touch.z=1000000000

this.runHitTest()

  };

  runHitTest = () => {
    this.raycaster.setFromCamera(this.touch, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    if (intersects.length) { 
    this.props.navigation.getParam("findSelectedPin")(intersects[0].object.type)
    }
=======
    console.log('touch', { x, y, ...size });

    // const position = ThreeAR.improviseHitTest({x, y}); <- Good for general purpose: "I want a point, I don't care how"
    // const { hitTest } = await AR.performHitTest(
    //   {
    //     x: x / size.width,
    //     y: y / size.height
    //   },
    //   AR.HitTestResultTypes.HorizontalPlane
    // );
>>>>>>> a2b846730204ccc2b03ea5c96cb1153739633794
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  countText: {
    color: '#FF00FF',
  },
});

AppRegistry.registerComponent('App', () => App);
