import * as THREE from "three";
import * as H3 from "h3-js";

import { OrbitControls } from "three-orbitcontrols-ts";

import { Hthree } from "./hthreejs";

export class Scene {

    private camera: THREE.PerspectiveCamera;
    private scene: THREE.Scene;
    private mesh: THREE.Mesh;
    private m : THREE.Mesh;
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

        let h3index = H3.geoToH3(37.3615593, -122.0553238, 0);
        //let h3index = H3.geoToH3(1, 1, 0);
        this.m = new THREE.Mesh(Hthree.h3ToGeometry(h3index), //Hthree.boundary(), 
            new THREE.MeshBasicMaterial({color: 0xFF0000})
        );
        this.scene.add(this.m);
        let ns = H3.kRing(h3index, 4);
        for (let n of ns) {
            let cl = new THREE.Color();
            cl.setHex(Math.random() * 0xffffff);
            let mesh = new THREE.Mesh(Hthree.h3ToGeometry(n), //Hthree.boundary(), 
                new THREE.MeshBasicMaterial({color: cl, wireframe: false})
            );
            this.scene.add(mesh);
        }

        this.camera = camera;
        this.renderer = renderer;
        //this.scene = new THREE.Scene();
        this.controls = new OrbitControls(camera);
    }

    public initialize(): void {
        this.camera.position.z = 2;

        this.scene.add(this.mesh);



        {
            const color = 0xFFFFFF;
            const intensity = 1;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(-1, 2, 4);
            this.scene.add(light);
          }

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
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
