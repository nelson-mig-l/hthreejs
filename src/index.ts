import { Scene } from "./scene";

class App {
    public static start() {
        let scene = new Scene();
        scene.initialize();
        scene.animate();
    }
}

App.start();