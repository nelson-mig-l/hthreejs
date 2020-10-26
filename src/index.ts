import { Scene } from "./scene";

class App {
    public static Start() {
        let scene = new Scene();
        scene.initialize();
        scene.animate();
    }
}

App.Start();