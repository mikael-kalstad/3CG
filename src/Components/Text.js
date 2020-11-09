import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useLoader, useThree } from 'react-three-fiber';
import * as THREE from 'three';

const Text = (props) => {
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
      textMesh.current.geometry.computeBoundingBox();
      let boundingBox = textMesh.current.geometry.boundingBox.max;
      textMesh.current.geometry.translate(
        -boundingBox.x / 2,
        -boundingBox.y / 2,
        -boundingBox.z / 2
      );

      textMesh.current.geometry.computeBoundingBox();

      if (props.background) {
        planeMesh.current.material.opacity = props.backgroundOpacity;
        planeMesh.current.material.color.setHex(props.backgroundColor);
        let bound = [
          textMesh.current.geometry.boundingBox.max.x,
          textMesh.current.geometry.boundingBox.max.y,
          0,
        ];
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
        planeMesh.current.geometry.computeBoundingBox();

        planeMesh.current.translateZ(
          props.depth ? -props.depth / 2 - 0.01 : -0.1
        );
      }
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

  const handlePointerOver = (e) => {
    e.stopPropagation();
    if (props.onClick) document.body.style.cursor = 'pointer';
    if (props.hoverEffect)
      planeMesh.current.material.color.setHex(props.hoverBackgroundColor);
  };

  const handlePointerOut = () => {
    if (props.onClick) document.body.style.cursor = 'default';
    if (props.hoverEffect)
      planeMesh.current.material.color.setHex(initialBackgroundColor);
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    if (props.onClick) document.body.style.cursor = 'pointer';
  };

  useFrame(() => {
    if (props.rotateToCamera) {
      group.current.setRotationFromEuler(camera.rotation);
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
          args={[props.children.repeat(1), config]}
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
