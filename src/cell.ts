import * as THREE from "three";
import * as H3 from "h3-js";

export class CellGeometry extends THREE.BufferGeometry {

    private _radius: number;
    private _h3index: string;

    constructor(radius: number, index: string) {
        super();
        this._radius = radius;
        this._h3index = index;
        let h3bounds = H3.cellToBoundary(index);
        let h3center = H3.cellToLatLng(index);
        console.log(h3center);
        console.log(this._h3index);

        let points = new Array();
        for (let p of h3bounds) {
            let v = this.toCartesian(p);
            points.push(v);
        }

        let faces = new Array();
        for (let i = 0; i < h3bounds.length - 2; i++) {
            faces.push(0);
            faces.push(i+1);
            faces.push(i+2);
        }

        let uc = (h3center[1] + 180.0) / 360.0;
        let vc = (h3center[0] +  90.0) / 180.0;
        //console.log(uc + " " + vc);

        let uvs = new Array();
        for (let b of h3bounds) {
            let u = (b[1] + 180.0) / 360.0; 
            let v = (b[0] +  90.0) / 180.0;
            if (Math.abs(uc - u) > 0.5) {
                //console.log("Fail U("+u+") for " + index);
                u = 1-u;
            }
            if (Math.abs(vc - v) > 0.5) {
                //console.log("Fail V("+v+") for " + index);
                v = 1-v;
            }
            //console.log(b + " -> " + u + " " + v);
            uvs.push(u, v);
            //console.log("   " + u + " " + v);
        }

        super.setFromPoints(points);
        super.setIndex(new THREE.BufferAttribute(new Uint16Array(faces), 1));
        super.computeVertexNormals();
        super.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
    }

    public get h3index() {
        return this._h3index;
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