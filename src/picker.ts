import * as THREE from "three";

export class PickHelper {
    
    private raycaster: THREE.Raycaster;
    
    constructor() {
        this.raycaster = new THREE.Raycaster();
    }

    pick(event: MouseEvent, camera: THREE.Camera, children: THREE.Object3D[]) : THREE.Object3D {
        let x = ( event.clientX / window.innerWidth ) * 2 - 1;
        let y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        this.raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

        const intersects = this.raycaster.intersectObjects(children);
        return intersects.length ? intersects[0].object : null;
    }
}