import * as THREE from "three";
import * as HTHREE from "./hthreejs";

import { OrbitControls } from "three-orbitcontrols-ts";

import { PickHelper } from "./picker";
import { Sphere } from "./sphere";

export class Scene {

    private camera: THREE.PerspectiveCamera;
    private scene: THREE.Scene;
    private object: THREE.Object3D;

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
        //let geometry = new THREE.BoxGeometry(1, 1, 1);
        //let material = new THREE.MeshNormalMaterial();
        //this.mesh = new THREE.Mesh(geometry, material);


        let sphere = new Sphere();
        this.object = sphere;

        this.scene = new THREE.Scene();

        this.scene.add(sphere);
        
        {
            const color = 0xFFFFFF;
            const intensity = 1;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(-5, 5, 40);
            this.scene.add(light);

            const l2 = new THREE.AmbientLight( 0xa0a0a0 ); // soft white light
            this.scene.add( l2 );
        }

        this.camera = camera;
        this.renderer = renderer;

        this.controls = new OrbitControls(camera);

    }

    picker = new PickHelper();
    
    public onMouseDown(event: MouseEvent) {
        let obj = this.picker.pick(event, this.camera, this.scene.getObjectByName("sphere").children);
        if (obj != null) {
            let mesh = obj as THREE.Mesh;
            let cl = new THREE.Color();
            cl.setHex(Math.random() * 0xffffff);
            (mesh.material as THREE.MeshPhongMaterial).color = cl;
            console.log(" -> " + obj.name);
        }
    }


    public initialize(): void {
        this.camera.position.z = 2;

        //this.scene.add(this.mesh);

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        let self = this;     
        document.onmousedown = function(event) {
            self.onMouseDown(event);
        };
    }

    public animate(): void {
        requestAnimationFrame(() => this.animate());

        this.object.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);
    }

}
