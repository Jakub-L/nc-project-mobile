import React from "react";
import { Platform } from "react-native";
import { AR, Asset, Constants, Location, Permissions } from "expo";
// Let's alias ExpoTHREE.AR as ThreeAR so it doesn't collide with Expo.AR.
import ExpoTHREE, { AR as ThreeAR, THREE } from "expo-three";
// Let's also import `expo-graphics`
// expo-graphics manages the setup/teardown of the gl context/ar session, creates a frame-loop, and observes size/orientation changes.
// it also provides debug information with `isArCameraStateEnabled`
import { View as GraphicsView } from "expo-graphics";
import TouchableView from '../components/TouchableView';
let objects=[];

export default class BasicARScene extends React.Component {
  touch = new THREE.Vector2();
  raycaster = new THREE.Raycaster();
  state = {
    location: null,
    heading: null,
    errorMessage: null,
    pins: [
    ]
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access loxcation was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    let heading = await Location.getHeadingAsync({});
    this.setState({ heading });
  };

  degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  distanceInKmBetweenEarthCoordinates() {
    let lat1 = this.state.location.latitude;
    let lon1 = this.state.location.longitude;
    let lat2 = this.state.pins[0].latitude;
    let lon2 = this.state.pins[0].longitude;

    const earthRadiusKm = 6371;

    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    console.log(earthRadiusKm * c, "<--- distance from phone to photo");
    return earthRadiusKm * c;
  }

  render() {
    if (!this.state.location === null)
      this.distanceInKmBetweenEarthCoordinates();

    console.log(this.state.location);
    console.log(this.state.heading);
    return (
      <TouchableView
      style={{ flex: 1 }}
      shouldCancelWhenOutside={false}
      onTouchesBegan={this.onTouchesBegan}>
      <GraphicsView
        style={{ flex: 1 }}
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
        onResize={this.onResize}
        isArEnabled
        isArRunningStateEnabled
        isArCameraStateEnabled
        arTrackingConfiguration={AR.TrackingConfiguration.World}
      />
            </TouchableView>
    );
  }

  componentDidMount() {
    // Turn off extra warnings

    THREE.suppressExpoWarnings(true);
    ThreeAR.suppressWarnings();
  }

  // When our context is built we can start coding 3D things.
  onContextCreate = async ({ gl, scale: pixelRatio, width, height }) => {
    // This will allow ARKit to collect Horizontal surfaces
    AR.setPlaneDetection({ Horizontal: "horizontal" });

    // Create a 3D renderer
    this.renderer = new ExpoTHREE.Renderer({
      gl,
      pixelRatio,
      width,
      height
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
      color: 0xff0800
    });

    // Combine our geometry and material
    this.cylinder = new THREE.Mesh(geometry, material);
    // Place the box 0.4 meters in front of us.
    this.cylinder.position.x = 0;
    this.cylinder.position.y = 0;
    this.cylinder.position.z = -1;

    // Add the cube to the scene
    this.scene.add(this.cylinder);
    objects.push(this.cylinder)

    // Setup a light so we can see the cube color
    // AmbientLight colors all things in the scene equally.
    this.scene.add(new THREE.AmbientLight(0xffffff));

  };

  // When the phone rotates, or the view changes size, this method will be called.
  onResize = ({ x, y, scale, width, height }) => {
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

this.touch.x=x/size.width-0.3
this.touch.y=y/ size.height
this.touch.z=1000000000

this.runHitTest()

  };

  runHitTest = () => {
    this.raycaster.setFromCamera(this.touch, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    
    console.log(intersects.length)
    for (const intersect of intersects) {
      const { distance, face, faceIndex, object, point, uv } = intersect;
      
    }
  };
}
