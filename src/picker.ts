import * as THREE from "three";
import * as H3 from "h3-js";

export class PickHelper {
    
    private raycaster: THREE.Raycaster;
    
    constructor() {
        this.raycaster = new THREE.Raycaster();
    }

    pick(event: MouseEvent, camera: THREE.Camera, children: THREE.Object3D[]) : String {
        let x = ( event.clientX / window.innerWidth ) * 2 - 1;
        let y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        this.raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

        const intersects = this.raycaster.intersectObjects(children);
        const intersection = intersects[0];
        console.log();
        let uv = intersection.uv;
        console.log(intersection.point)
        let u = uv.x * 360;
        let v = uv.y * 180 - 90;
        console.log(u +","+ v)
        console.log(H3.latLngToCell(u, v, 1));

        //return intersects.length ? intersection.object : null;
        return intersects.length ? H3.latLngToCell(u, v, 1) : null;
    }
}