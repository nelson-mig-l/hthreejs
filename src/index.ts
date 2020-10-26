import { Scene } from "./scene";
import { Hthree } from "./hthreejs"
import * as H3 from "h3-js";
import * as THREE from "three";

class App {
    public static Start() {
        // let h3index = H3.geoToH3(37.3615593, -122.0553238, 7);
        // let h3bounds = H3.h3ToGeoBoundary(h3index);
        // console.log(h3index);
        // console.log(h3bounds);

        // let s = new THREE.Vector3();
        // console.log(s);
        // s.setFromSphericalCoords(1, 37.341099093235684, -122.0415613516433);
        // console.log(s);

        //Hthree.boundary();
        
        let scene = new Scene();
        scene.initialize();
        scene.animate();
    }
}

App.Start();