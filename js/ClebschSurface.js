if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, scene, mesh, renderer;
var element;

init();
render();

function init() {
  scene = new THREE.Scene();

  element = document.getElementById("clebsch")
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio( 16/9 );
  renderer.setSize( element.clientWidth, 9/16*element.clientWidth );
  renderer.setClearColor(0xffffff, 1.0);
  element.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 5;

  var geometry = marchingCubes(100, -2, 2, 0.01, function(x, y, z){
    return x*x*x + y*y*y + z*z*z + 1 - Math.pow(x + y + z + 1, 3);
  });

  var material = new THREE.MeshStandardMaterial( { color: 0x1d382a, roughness: 0.75, metalness:1, side: THREE.DoubleSide } );

  var ambientLight = new THREE.AmbientLight( 0x555555 );
  mesh = new THREE.Mesh( geometry, material );

  var lights = [];
	lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
	lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
	lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );
	lights[ 0 ].position.set( 0, 200, 0 );
	lights[ 1 ].position.set( 100, 200, 100 );
	lights[ 2 ].position.set( - 100, - 200, - 100 );

  scene.add( mesh );
  scene.add(camera);

  scene.add(lights[ 0 ] );
  scene.add(lights[ 1 ] );
  scene.add(lights[ 2 ] );
  scene.add(ambientLight);

  window.addEventListener( 'resize', onWindowResize, false );

}


function render() {

  requestAnimationFrame( render );
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render( scene, camera );
}

function onWindowResize() {
  camera.aspect = 16/9;
  camera.updateProjectionMatrix();
  renderer.setSize( element.clientWidth, 9/16*element.clientWidth );
}
