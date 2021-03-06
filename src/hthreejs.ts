import * as H3 from "h3-js";
import * as THREE from "three";

export class Hthree {

    private static DEFAULT_RADIUS = 1;

    private _radius: number;

    public constructor(radius: number = Hthree.DEFAULT_RADIUS) {
        this._radius = radius;
    }

    public geoBoundaryOf(h3index: H3.H3Index) : THREE.BufferGeometry {
        let h3bounds = H3.h3ToGeoBoundary(h3index);
        
        let points = new Array();
        for (let b of h3bounds) {
            let v = this.toCartesian(b);
            points.push(v);
        }

        let faces = new Array();
        for (let i = 0; i < h3bounds.length - 1; i++) {
            faces.push(0);
            faces.push(i+1);
            faces.push(i+2);
        }

        const geometry: THREE.BufferGeometry = new THREE.BufferGeometry();
        geometry.setFromPoints(points);
        geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(faces), 1));
        return geometry;
    }

    public geoOf(h3index: H3.H3Index) : THREE.Vector3 {
        let center = H3.h3ToGeo(h3index);
        return this.toCartesian(center);
    }

    private toCartesian(polar: number[]) : THREE.Vector3 {
        const phi = H3.degsToRads(90 - polar[0]);
        const theta = H3.degsToRads(90 - polar[1]);
        return new THREE.Vector3(
            this._radius * Math.sin(phi) * Math.cos(theta), // x
            this._radius * Math.cos(phi), // y
            this._radius * Math.sin(phi) * Math.sin(theta) // z            
        );
    }

}