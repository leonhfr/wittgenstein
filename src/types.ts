// Packages.
import * as turfHelpers from '@turf/helpers';

// Definition.
export type IsSafe = {
  isSafe: boolean;
  errMsg: string;
};

export type BoundingBox = turfHelpers.BBox;

export type MultiPolygon = turfHelpers.Feature<
  turfHelpers.Polygon | turfHelpers.MultiPolygon
>;
