import * as THREE from "three";

import { OrbitControls } from "three-orbitcontrols-ts";

import { World } from "./world";
import { PickHelper } from "./picker";

export class Scene {

    private camera: THREE.PerspectiveCamera;
    private scene: THREE.Scene;
    private mesh: THREE.Mesh;

    private renderer: THREE.WebGLRenderer;
    private controls: OrbitControls;

    public constructor() {
        let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
        let renderer = new THREE.WebGLRenderer({ antialias: true });

       // Handle window resize
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        window.addEventListener("resize", onWindowResize, false);

        // Make something visible
        let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        let material = new THREE.MeshNormalMaterial();
        this.mesh = new THREE.Mesh(geometry, material);


        this.scene = new THREE.Scene();

        let world = new World();
        this.scene.add(world);

        this.camera = camera;
        this.renderer = renderer;

        this.controls = new OrbitControls(camera);

    }

    picker = new PickHelper();
    
    public onMouseDown(event: MouseEvent) {
        let obj = this.picker.pick(event, this.camera, this.scene.getObjectByName("world").children);
        if (obj != null) {
            let mesh = obj as THREE.Mesh;
            let cl = new THREE.Color();
            cl.setHex(Math.random() * 0xffffff);
            (mesh.material as THREE.MeshBasicMaterial).color = cl;
            console.log(" -> " + obj.name);
        }
    }


    public initialize(): void {
        this.camera.position.z = 2;

        this.scene.add(this.mesh);

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        let self = this;     
        document.onmousedown = function(event) {
            self.onMouseDown(event);
        };
    }

    public animate(): void {
        requestAnimationFrame(() => this.animate());

        //this.mesh.rotation.x += 0.01;
        //this.mesh.rotation.y += 0.01;

        //this.m.rotation.x += 0.01;
        //this.m.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);
    }

}
