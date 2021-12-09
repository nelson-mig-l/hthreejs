import * as THREE from "three";
import * as H3 from "h3-js";
import { CellGeometry } from "./cell";

export class Sphere extends THREE.Object3D {

    static texture = new THREE.TextureLoader().load('earth.png');
    static radius = 1;

    constructor() {
        super();
        super.name = "sphere";

        let cl = new THREE.Color();
        cl.setHex(0xffffff);
        let material = new THREE.MeshPhongMaterial({color: cl, map: Sphere.texture, wireframe: false});

        let indexes = H3.getRes0Indexes();
        for (let index of indexes) {
            let h3bounds = H3.h3ToGeoBoundary(index);
            let mesh = new THREE.Mesh(
                new CellGeometry(Sphere.radius, h3bounds),
                material
            );
            mesh.name = index;
            super.add(mesh);
        }
    }
}