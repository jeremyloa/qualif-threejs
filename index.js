import * as THREE from './three.js/build/three.module.js'
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'
import { ColladaLoader } from './three.js/examples/jsm/loaders/ColladaLoader.js'
import { FontLoader } from './three.js/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from './three.js/examples/jsm/geometries/TextGeometry.js'

var scene = new THREE.Scene()

var renderer = new THREE.WebGLRenderer({
    antialias: true,
})
renderer.setSize(innerWidth, innerHeight)
renderer.setClearColor(0x404040)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

var render = () => {
    requestAnimationFrame(render)
    ball.rotation.x+=0.05
    ball.rotation.y+=0.05
    control.update()
    renderer.render(scene, curr_cam)
}

// GEOMETRY
var soccerfield = new THREE.Mesh(
                    new THREE.PlaneGeometry(10,7,32,32), 
                    new THREE.MeshStandardMaterial({
                        // MATERIAL
                        color: 0x40583F, 
                        metalness: 0,
                        roughness: 5,
                        map: new THREE.TextureLoader().load('./assets/soccerfield.jpg'),    
                        side: THREE.DoubleSide}))
soccerfield.receiveShadow = true
soccerfield.rotation.x = -1 * (Math.PI/2)
scene.add(soccerfield)

var ball = new THREE.Mesh(
                new THREE.SphereGeometry(0.1), 
                new THREE.MeshStandardMaterial({
                    // MATERIAL
                    color: 0x505050,
                    metalness: 0,
                    roughness: 1,
                    map: new THREE.TextureLoader().load('./assets/ball.png')
                }))
ball.castShadow = true
ball.position.y+=0.1
ball.layers.enable(1)
scene.add(ball)

var create_pole = () => {
    var pole = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.02,0.02,3,64),
                    new THREE.MeshStandardMaterial({
                        // MATERIAL
                        color: 0xffffff,
                        metalness: 1,
                        roughness: 0
                    })
    )
    pole.castShadow = true
    pole.position.y=1.5
    return pole
}
var pole1 = create_pole()
pole1.position.z=3.45
pole1.position.x=5
scene.add(pole1)
var pole2 = create_pole()
pole2.position.z=3.45
pole2.position.x=-5
scene.add(pole2)
var pole3 = create_pole()
pole3.position.z=-3.45
pole3.position.x=5
scene.add(pole3)
var pole4 = create_pole()
pole4.position.z=-3.45
pole4.position.x=-5
scene.add(pole4)

var create_cone = () => {
    var cone = new THREE.Mesh(
                    new THREE.ConeGeometry(0.05,0.2,64),
                    new THREE.MeshBasicMaterial({
                        // MATERIAL
                        color: 0xff5000
                    })
    )
    cone.position.y=0.1
    cone.castShadow = true
    return cone
}
var cone1 = create_cone()
cone1.position.x=0.5
cone1.position.z=0.3
scene.add(cone1)
var cone2 = create_cone()
cone2.position.x=1
cone2.position.z=-0.3
scene.add(cone2)
var cone3 = create_cone()
cone3.position.x=1.5
cone3.position.z=0.3
scene.add(cone3)
var cone4 = create_cone()
cone4.position.x=2
cone4.position.z=-0.3
scene.add(cone4)

var create_box = () => {
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(0.2,0.2,0.2),
            new THREE.MeshBasicMaterial({
                // MATERIAL
                color: 0xff6445
            })
    )
    box.castShadow = true
    box.position.y = 0.1
    return box
}

var box1 = create_box()
box1.position.x=-0.5
box1.position.z=-0.3
scene.add(box1)
var box2 = create_box()
box2.position.x=-1
box2.position.z=0.3
scene.add(box2)
var box3 = create_box()
box3.position.x=-1.5
box3.position.z=-0.3
scene.add(box3)
var box4 = create_box()
box4.position.x=-2
box4.position.z=0.3
scene.add(box4)

// 3D MODEL
var loader = new ColladaLoader()
loader.load('assets/goal.dae', 
    (obj) => {
    var model = obj.scene
    model.castShadow = true
    model.scale.set(0.01, 0.01, 0.01)
    model.position.x = 3.6
    model.position.z = -1.5
    model.position.y = 0
    model.rotation.z = 4.7
    scene.add(model)})

loader.load('assets/goal.dae', 
    (obj) => {
    var model = obj.scene
    model.castShadow = true
    model.scale.set(0.01, 0.01, 0.01)
    model.position.x = -3.6
    model.position.z = 1.5
    model.position.y = 0
    model.rotation.z = -4.7
    scene.add(model)})

// SKYBOX
var sky = new THREE.Mesh(
    new THREE.BoxGeometry(100,100,100,100), [
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('./assets/rt.png'),
        side: THREE.BackSide
    }),   
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('./assets/lf.png'),
        side: THREE.BackSide
    }), 
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('./assets/up.png'),
        side: THREE.BackSide
    }), 
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('./assets/dn.png'),
        side: THREE.BackSide
    }), 
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('./assets/ft.png'),
        side: THREE.BackSide
    }), 
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('./assets/bk.png'),
        side: THREE.BackSide
    })      
    ])
scene.add(sky)

// LIGHTS
var ambi = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambi)

var plight = new THREE.PointLight(0xffffff,2,1000)
plight.position.x+=0.5
plight.position.y+=1
plight.castShadow = true
plight.shadow.mapSize.width = 300
plight.shadow.mapSize.height = 300
plight.shadow.camera.near = 0.3
plight.shadow.camera.far = 200
scene.add(plight)

// CAMERA
const fov = 50, aspect = innerWidth/innerHeight, near = 0.1, far = 100

var main_cam = new THREE.PerspectiveCamera(fov, aspect, near, far)
main_cam.position.z = 10
main_cam.lookAt(0,0,0)

var sec_cam = new THREE.PerspectiveCamera(fov, aspect, near, far)
sec_cam.position.z = 15
sec_cam.lookAt(0,0,0)

var curr_cam = main_cam

    //CHANGE CAMERA
var control = new OrbitControls(curr_cam, renderer.domElement)
var space = (press) => {
    switch (press.keyCode) {
        case 32:
            if (curr_cam==main_cam) curr_cam = sec_cam
            else curr_cam = main_cam
            break;
        default:
            break;
    }
}
window.addEventListener('keydown', space)

// RAYCAST
//if ball is clicked, text "This is Soccer!" will be shown/hidden (toggle)
var ray = new THREE.Raycaster()
ray.layers.set(1)
var mousemove = (move) => {
    var mouse = {}
    mouse.x = (move.clientX/window.innerWidth)  *2-1
    mouse.y = -(move.clientY/window.innerHeight)*2+1
    ray.setFromCamera(mouse, curr_cam)
}
var mouseclick = (click) => {
    var intersect = ray.intersectObject(scene)
    // console.log(intersect)
    console.log(scene.children)
    if (intersect.length>0) {
        if (!scene.getObjectByName('title')) {
            var fontloader = new FontLoader()
            fontloader.load('./three.js/examples/fonts/gentilis_regular.typeface.json', (font)=>{
                var title = new THREE.Mesh(
                    new TextGeometry("This is Soccer!", {
                        font: font,
                        size: 0.5,
                        height: 0.1}), 
                    new THREE.MeshPhysicalMaterial({
                        // MATERIAL
                        color: 0XFFFFFF,
                        reflectivity: 1,
                        metalness: 0.5
                    })
                )
                title.position.z = -1
                title.name = 'title'
                scene.add(title)
            })
        } else scene.remove(scene.getObjectByName('title'))
    }
}
window.addEventListener('mousemove', mousemove)
window.addEventListener('pointerdown', mouseclick)
render()