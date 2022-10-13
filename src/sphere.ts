import * as THREE from "three";
import * as H3 from "h3-js";
import { CellGeometry } from "./cell";

export class Sphere extends THREE.Object3D {

    static texture = new THREE.TextureLoader().load('earth.png');
    static radius = 1;

    constructor() {
        super();
        super.name = "sphere";
        Sphere.texture.wrapS = THREE.RepeatWrapping;
        Sphere.texture.wrapT = THREE.RepeatWrapping;
        // Sphere.texture.repeat.set( 4, 4 );

        let cl = new THREE.Color();
        cl.setHex(0xffffff);
        let material = new THREE.MeshPhongMaterial({color: cl, map: Sphere.texture, wireframe: false});

        let indexes = H3.getRes0Indexes();
        for (let index of indexes) {
            // see https://h3geo.org/docs/core-library/restable/
            let children = H3.h3ToChildren(index, 0);
            for (let child of children) {
                //let h3bounds = H3.h3ToGeoBoundary(child);
                let mesh = new THREE.Mesh(
                    new CellGeometry(Sphere.radius, child),
                    material
                );
                mesh.name = "cell#" + child;
                super.add(mesh);
            }
        }
    }
}