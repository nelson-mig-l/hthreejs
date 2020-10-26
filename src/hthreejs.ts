import * as H3 from "h3-js";
import * as THREE from "three";



export class Hthree {

    private static RADIUS = 0.2;

    public static h3ToGeometry(h3index: H3.H3Index) : THREE.Geometry {
        //let h3center = H3.h3ToGeo(h3index);
        let h3bounds = H3.h3ToGeoBoundary(h3index);
        const geometry = new THREE.Geometry();

        //let centerLng = h3center[1];
        for (let b of h3bounds) {
            //const edgeLng = b[0];
            //if (Math.abs(centerLng - edgeLng) > 170) {
            //    // normalize large lng distances
            //    b[0] += (centerLng > edgeLng ? 360 : -360);
            //}
            geometry.vertices.push(this.toCartesian(b))
        }
        
        for (let i = 0; i < h3bounds.length - 2; i++) {
            geometry.faces.push(new THREE.Face3(0, i+1, i+2));
        }
        
        return geometry;
    }

    private static toRadians(degrees: number) : number {
        return degrees * Math.PI / 180.0;
    }

    private static toCartesian(polar) : THREE.Vector3 {
        const phi = this.toRadians(90 - polar[0]);
        const theta = this.toRadians(90 - polar[1]);
        return new THREE.Vector3(
            this.RADIUS * Math.sin(phi) * Math.cos(theta), // x
            this.RADIUS * Math.cos(phi), // y
            this.RADIUS * Math.sin(phi) * Math.sin(theta) // z            
        );
    }

}