import * as THREE from "three";
import * as H3 from "h3-js";
import { CellGeometry } from "./cell";

import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export class Sphere extends THREE.Object3D {

    static texture = new THREE.TextureLoader().load('earth.png');
    static radius = 1;
    static resolution = 1; // [0..]

    constructor() {
        super();
        super.name = "sphere";

        let cl = new THREE.Color();
        cl.setHex(0xffffff);
        let material = new THREE.MeshPhongMaterial({color: cl, map: Sphere.texture, wireframe: false});

        let indexes = H3.getRes0Indexes();
        let geos = [];
        let i = 0;
        for (let index of indexes) {
            // see https://h3geo.org/docs/core-library/restable/
            let children = H3.h3ToChildren(index, Sphere.resolution);
            for (let child of children) {
                let g = new CellGeometry(Sphere.radius, child);
                geos.push(g);
            }
        }
        let geo = BufferGeometryUtils.mergeBufferGeometries(geos)
        super.add(new THREE.Mesh(geo, material));
    }
}