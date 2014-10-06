var camera, scene, renderer;
var mesh;

init();

function init() {

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(500, 600);
    window.document.getElementById('speedometer').appendChild(renderer.domElement);

    //

    camera = new THREE.PerspectiveCamera(45, 500 /600, 1, 1000);
    camera.position.z = 500;

    scene = new THREE.Scene();

    // cube
    var cube = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), new THREE.MeshNormalMaterial());
    cube.overdraw = false;
    mesh=cube;
    scene.add(mesh);

    //

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}


