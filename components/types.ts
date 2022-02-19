export interface Location {
  locationX: number;
  locationY: number;
  zoomLevel: number;
  absX: number;
  absY: number;
}

export interface PlanMarkerData {
  id: number;
  markerX: number;
  markerY: number;
}

export interface ZoomableExtents {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  scale: number;
}
