import * as THREE from "three";
import { Mesh, MeshBasicMaterial, Object3D } from "three";

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
        /*
        for ( let i = 0; i < intersects.length; i ++ ) {

            const mesh = (intersects[i].object as Mesh);
            (mesh.material as MeshBasicMaterial).color.set( 0xff0000 );
            console.log(i + " -> " + intersects[ i ].object.name);
            //alert(intersects[ i ].object.name);
        }
        */
       return intersects.length ? intersects[0].object : null;
    }
}