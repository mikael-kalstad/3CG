import React, { useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { dataService } from '../../../Services/DataService';

const channelNames = dataService.getChannelNamesArray();


const TimeGrid = (props) => {

  let color = new THREE.Color('red');
  let size1 = 10;
  let size2 = 50;

  let distance = 3000;

  const geometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1);

  const material = new THREE.ShaderMaterial({

    side: THREE.DoubleSide,

    uniforms: {
      uSize1: {
        value: size1
      },
      uSize2: {
        value: size2
      },
      uColor: {
        value: color
      },
      uDistance: {
        value: distance
      }
    },
    transparent: true,
    vertexShader: `
           
           varying vec3 worldPosition;
		   
           uniform float uDistance;
           
           void main() {
           
                vec3 pos = position.xzy * uDistance;
                pos.xz += cameraPosition.xz;
                
                worldPosition = pos;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
           
           }
           `,


    fragmentShader: `
           
           varying vec3 worldPosition;
           
           uniform float uSize1;
           uniform float uSize2;
           uniform vec3 uColor;
           uniform float uDistance;
            
            
            
            float getGrid(float size) {
            
                vec2 r = worldPosition.xz / size;
                
                
                vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
                float line = min(grid.x, grid.y);
                
            
                return 1.0 - min(line, 1.0);
            }
            
           void main() {
           
                
                  float d = 1.0 - min(distance(cameraPosition.xz, worldPosition.xz) / uDistance, 1.0);
                
                  float g1 = getGrid(uSize1);
                  float g2 = getGrid(uSize2);
                  
                  
                  gl_FragColor = vec4(uColor.rgb, mix(g2, g1, g1) * pow(d, 3.0));
                  gl_FragColor.a = mix(0.5 * gl_FragColor.a, gl_FragColor.a, g2);
                
                  if ( gl_FragColor.a <= 0.0 ) discard;
                
           
           }
           
           `,

    extensions: {
      derivatives: true
    }

  });

  const timeGrid = new THREE.Mesh(geometry, material);


  const material2 = new THREE.LineBasicMaterial({
    color: 0xff0000
  });

  const n = 50

  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(n, 0, 0));
  points.push(new THREE.Vector3(n, n, 0));
  points.push(new THREE.Vector3(0, n, 0));
  points.push(new THREE.Vector3(0, 0, 0));

  const geometry2 = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry2, material2);

  const gridHelper = new THREE.GridHelper(110, 11);

  return (
    /*
    <mesh
      visible
      position={10, 10, 10}
      geometry={geometry}
      material={material}
    />
    */
    // Infinite Grid here:
    /*
     <primitive
       object={timeGrid}
       rotation={[1.57, 0, 0]}
       position={[0, 0, -56]}
       scale={[0.8, 1, 1]}
     />
     */
    /*
    <primitive
      object={line}
      //rotation={[1.57, 0, 0]}
      position={[40, 0, -56]}
      scale={[0.8, 1, 1]}
    />
    */
    /*
     <primitive
       object={gridHelper}
       //rotation={[1.57, 0, 0]}
       position={[44, 0, 0]}
       scale={[0.8, 1, 1]}
     />
     */
    <></>

  );
};

export default TimeGrid;
