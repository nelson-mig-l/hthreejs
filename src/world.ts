import * as THREE from "three";
import * as H3 from "h3-js";

import * as HTHREE from "./hthreejs";

/**
 * An example using HThree.
 */
export class World extends THREE.Object3D {

    public constructor(hthree: HTHREE.Hthree) {
        super();
        super.name = "world";

        let indexes = H3.getRes0Indexes();
        for (let index of indexes) {
            let cl = new THREE.Color();
            cl.setHex(Math.random() * 0xffffff);
            let mesh = new THREE.Mesh(hthree.geoBoundaryOf(index),
                new THREE.MeshBasicMaterial({color: cl, wireframe: false})
            );
            mesh.name = index;
            super.add(mesh);
        }      
    }
}