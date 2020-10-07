import Annotation from './Annotation';
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useFrame } from 'react-three-fiber';
import { annotationService } from '../../Services/AnnotationService';
import { useTimeStore } from '../../Store';
import * as THREE from 'three';
const AnnotationRenderer = (props) => {
  let startTime = useTimeStore((state) => state.startTime);
  let endTime = useTimeStore((state) => state.endTime);
  let annotations = annotationService.getAnnotationsOnlyInTimeframe(
    startTime,
    endTime
  );
  return (
    <>
      {annotations.map((ann) => (
        <Annotation ann={ann} startTime={startTime} endTime={endTime} />
      ))}
    </>
  );
};

export default AnnotationRenderer;
