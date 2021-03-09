import * as THREE from "three";
import * as H3 from "h3-js";

import * as HTHREE from "./hthreejs";

/**
 * An example using HThree.
 */
export class World extends THREE.Object3D {

    public constructor() {
        super();
        this.name = "world";

        let hthree = new HTHREE.Hthree();

        let indexes = H3.getRes0Indexes();
        for (let index of indexes) {
            let cl = new THREE.Color();
            cl.setHex(Math.random() * 0xffffff);
            let mesh = new THREE.Mesh(hthree.h3ToGeometry(index),
                new THREE.MeshBasicMaterial({color: cl, wireframe: false})
            );
            mesh.name = index;
            this.add(mesh);
        }      
    }
}