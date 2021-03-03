import * as H3 from "h3-js";
import * as THREE from "three";

export class Hthree {

    private static RADIUS = 0.5;

    public static h3ToGeometry(h3index: H3.H3Index) : THREE.BufferGeometry {

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
        geometry.setIndex(new THREE.BufferAttribute(
            new Uint16Array(faces), 1));
        
        return geometry;
    }

    private static toRadians(degrees: number) : number {
        return degrees * Math.PI / 180.0;
    }

    private static toCartesian(polar: number[]) : THREE.Vector3 {
        const phi = this.toRadians(90 - polar[0]);
        const theta = this.toRadians(90 - polar[1]);
        return new THREE.Vector3(
            this.RADIUS * Math.sin(phi) * Math.cos(theta), // x
            this.RADIUS * Math.cos(phi), // y
            this.RADIUS * Math.sin(phi) * Math.sin(theta) // z            
        );
    }

}