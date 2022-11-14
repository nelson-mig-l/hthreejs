import * as H3 from "h3-js";
import * as THREE from "three";

export class Hthree {

    private static DEFAULT_RADIUS = 1;

    private _radius: number;

    public constructor(radius: number = Hthree.DEFAULT_RADIUS) {
        this._radius = radius;
    }

    public geoBoundaryOf(h3index: H3.H3Index) : THREE.BufferGeometry {
        let h3bounds = H3.cellToBoundary(h3index);
        
        let points = new Array();
        for (let b of h3bounds) {
            let v = this.toCartesian(b);
            points.push(v);
        }

        let faces = new Array();
        for (let i = 0; i < h3bounds.length - 2; i++) {
            faces.push(0);
            faces.push(i+1);
            faces.push(i+2);
        }

        let uvs = new Array();
        for (let b of h3bounds) {
            let u = (b[1] + 180.0) / 360.0; 
            let v = (b[0] +  90.0) / 180.0;
           if (u > 1.0 ||  u < 0) console.log("FAIL u " + u);
           if (v > 1.0 ||  v < 0) console.log("FAIL v " + u);
           console.log(b + " -> " + u + " " + v);
            uvs.push(u, v);
        }

        const geometry: THREE.BufferGeometry = new THREE.BufferGeometry();
        geometry.setFromPoints(points);
        geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(faces), 1));
        geometry.computeVertexNormals();
        geometry.setAttribute(
            'uv',
            new THREE.BufferAttribute(new Float32Array(uvs), 2));
        return geometry;
    }

    public geoOf(h3index: H3.H3Index) : THREE.Vector3 {
        let center = H3.cellToLatLng(h3index);
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