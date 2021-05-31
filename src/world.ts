import * as THREE from "three";
import * as H3 from "h3-js";

import * as HTHREE from "./hthreejs";

/**
 * An example using HThree.
 */
export class World extends THREE.Object3D {

    public constructor(hthree: HTHREE.Hthree) {
        super();
        this.name = "world";

        const loader = new THREE.TextureLoader();

        const material = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            map: loader.load('hex.png'),
        });

        // https://stackoverflow.com/questions/31942722/how-to-merge-three-js-meshes-into-one-mesh
        let indexes = H3.getRes0Indexes();
        for (let index of indexes) {
            //for (let child of H3.h3ToChildren(index, 0)) {
                //let mesh = new THREE.Mesh(hthree.geoBoundaryOf(child), material);
                let mesh = new THREE.Mesh(hthree.geoBoundaryOf(index), material);
                mesh.name = index;
                this.add(mesh);
            //}
        }      
    }
}