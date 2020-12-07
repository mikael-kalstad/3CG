import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useFrame, useLoader, useThree } from 'react-three-fiber';
import * as THREE from 'three';

const Text = (props) => {
  const [maxRepeats, setMaxRepeats] = useState(1);
  const firstRenderRef = useRef(true);
  const font = useLoader(
    THREE.FontLoader,
    process.env.PUBLIC_URL + '/helvetiker_regular.typeface.json'
  );

  const config = useMemo(
    () => ({
      font,
      size: props.textSize,
      height: props.depth ? props.depth : 0,
    }),
    [font, props.depth, props.textSize]
  );
  const { camera } = useThree();
  const textMesh = useRef();
  const planeMesh = useRef();
  const group = useRef();

  let initialBackgroundColor = props.backgroundColor;

  useEffect(() => {
    const onMount = () => {
      // Position text in middle of background
      textMesh.current.geometry.computeBoundingBox();
      let boundingBox = textMesh.current.geometry.boundingBox.max;
      textMesh.current.geometry.translate(
        -boundingBox.x / 2,
        -boundingBox.y / 2,
        -boundingBox.z / 2
      );

      textMesh.current.geometry.computeBoundingBox();

      if (props.background) {
        // Configure background of text
        planeMesh.current.material.opacity = props.backgroundOpacity;
        planeMesh.current.material.color.setHex(props.backgroundColor);
        let bound = [
          textMesh.current.geometry.boundingBox.max.x,
          textMesh.current.geometry.boundingBox.max.y,
          0,
        ];
        // Scale background from props
        let scale = props.backgroundScaleByText + 1;
        if (props.backgroundSize) {
          planeMesh.current.scale.set(
            props.backgroundSize[0],
            props.backgroundSize[1],
            0.1
          );
        } else {
          planeMesh.current.scale.set(
            Math.max(bound[0] * scale, 1.5 * props.textSize),
            bound[1] * scale,
            0.1
          );
        }

        planeMesh.current.translateZ(
          props.depth ? -props.depth / 2 - 0.01 : -0.1
        );
        textMesh.current.geometry.computeBoundingBox();
        // Calculate repeats from size of text and background
        if (props.repeatText) {
          setMaxRepeats(
            Number.parseInt(
              Math.max(
                0,
                Math.floor(
                  planeMesh.current.scale.x /
                    (textMesh.current.geometry.boundingBox.max.x * 2.5)
                )
              )
            )
          );
        }
      }
      // Rotate group from prop if rotateToCamera is not set
      if (props.rotateToCamera === undefined && props.rotation) {
        group.current.setRotationFromEuler(
          new THREE.Euler(
            props.rotation[0],
            props.rotation[1],
            props.rotation[2]
          )
        );
      }
    };
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      onMount();
    }
  }, [
    props.background,
    props.backgroundColor,
    props.backgroundOpacity,
    props.backgroundScaleByText,
    props.backgroundSize,
    props.depth,
    props.rotateToCamera,
    props.rotation,
    props.textSize,
  ]);

  // Set new text to repeated text
  useEffect(() => {
    let geometry = new THREE.TextBufferGeometry(
      new Array(maxRepeats).fill(props.children).join(' - '),
      config
    );
    textMesh.current.geometry = geometry;
    textMesh.current.geometry.computeBoundingBox();
    let boundingBox = textMesh.current.geometry.boundingBox.max;
    // Position text in middle of background
    textMesh.current.geometry.translate(
      -boundingBox.x / 2,
      -boundingBox.y / 2,
      -boundingBox.z / 2
    );
  }, [maxRepeats, props.children]);

  // Apply clickevent and hovereffect if available
  const handlePointerOver = (e) => {
    e.stopPropagation();
    if (props.onClick) document.body.style.cursor = 'pointer';
    if (props.hoverEffect)
      planeMesh.current.material.color.setHex(props.hoverBackgroundColor);
  };

  // Revert when mouse exits
  const handlePointerOut = () => {
    if (props.onClick) document.body.style.cursor = 'default';
    if (props.hoverEffect)
      planeMesh.current.material.color.setHex(initialBackgroundColor);
  };

  // Ensures mouse is pointer if it exits one object behind one that is currently hovered
  const handlePointerMove = (e) => {
    e.stopPropagation();
    if (props.onClick) document.body.style.cursor = 'pointer';
  };

  useFrame(() => {
    if (props.rotateToCamera) {
      group.current.setRotationFromEuler(camera.rotation); // Rotate to camera
    }
  });

  return (
    <group
      ref={group}
      position={props.position}
      onClick={props.onClick ? props.onClick : null}
      onPointerOver={props.hoverEffect ? handlePointerOver : null}
      onPointerOut={props.hoverEffect ? handlePointerOut : null}
      onPointerMove={handlePointerMove}
    >
      <mesh ref={textMesh}>
        <textBufferGeometry
          attach='geometry'
          args={[props.children + (props.repeatText ? ' -' : ''), config]}
        />
        <meshPhongMaterial
          attach='material'
          clippingPlanes={props.clippingPlanes ? props.clippingPlanes : null}
        />
      </mesh>
      {props.background && (
        <mesh ref={planeMesh}>
          <planeBufferGeometry attach='geometry' />
          <meshPhongMaterial
            attach='material'
            transparent={true}
            clippingPlanes={props.clippingPlanes ? props.clippingPlanes : null}
          />
        </mesh>
      )}
    </group>
  );
};

export default Text;
