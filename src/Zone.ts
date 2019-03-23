// Packages
import * as turfHelpers from '@turf/helpers';
import * as turfInvariant from '@turf/invariant';

// Internal.
import * as Types from './types';

// Code.
export class Zone {
  readonly id: string;
  readonly area: string;
  readonly bbox: turfHelpers.BBox;
  readonly zone?: turfHelpers.Feature<
    turfHelpers.Polygon | turfHelpers.MultiPolygon
  >;

  static create(input: unknown): Zone | Error {
    if (isZone(input)) {
      return new Zone(input);
    }

    const errMsg = isSafeZone(input).errMsg;
    return new Error(`ValidationError: ${errMsg}`);
  }

  private constructor(input: CreateZoneInput) {
    this.id = input.id;
    this.area = input.area;
    this.bbox = input.bbox;
    this.zone = input.zone;
  }
}

// Validation.

export const ZONE_PROPS = ['id', 'area', 'bbox', 'zone'];

export const isZone = (input: unknown): input is CreateZoneInput => {
  return isSafeZone(input).isSafe;
};

export const isSafeZone = (input: unknown): Types.IsSafe => {
  if (typeof input !== 'object') {
    return {
      isSafe: false,
      errMsg: `Expected type of input to be object, got ${typeof input}.`,
    };
  }

  if (input === null) {
    return {
      isSafe: false,
      errMsg: `Expected input not to be null.`,
    };
  }

  for (const key of ZONE_PROPS) {
    if (!input.hasOwnProperty(key)) {
      return {
        isSafe: false,
        errMsg: `Expected all input properties to be set, missing ${key}.`,
      };
    }
  }

  const { id, area, bbox, zone } = input as {
    id: unknown;
    area: unknown;
    bbox: unknown;
    zone: unknown;
  };

  const strings = { id, area };

  // Strings

  for (const [key, value] of Object.entries(strings)) {
    if (typeof value !== 'string') {
      return {
        isSafe: false,
        errMsg: `Expected type of input.${key} to be string, got ${typeof value}.`,
      };
    }
  }

  // bbox

  if (!Array.isArray(bbox) || bbox.length !== 4) {
    return {
      isSafe: false,
      errMsg: `Expected type of input.bbox to be turf.helpers.BBox, got ${typeof bbox}.`,
    };
  }

  for (const item of bbox) {
    if (typeof item !== 'number') {
      return {
        isSafe: false,
        errMsg: `Expected type of input.bbox elements to be number, got ${typeof item} for one of them.`,
      };
    }
  }

  // zone?

  if (zone !== undefined) {
    try {
      turfInvariant.featureOf(
        zone as turfHelpers.Feature<any>,
        'Polygon',
        'isSafeZone'
      );
    } catch (err) {
      try {
        turfInvariant.featureOf(
          zone as turfHelpers.Feature<any>,
          'MultiPolygon',
          'isSafeZone'
        );
      } catch (err) {
        return {
          isSafe: false,
          errMsg: `Expected type of input.zone to be Feature<Polygon | MultiPolygon>. Turf.js threw ${
            err.name
          }: ${err.message}`,
        };
      }
    }
  }

  return {
    isSafe: true,
    errMsg: '',
  };
};

// Interface

export interface CreateZoneInput {
  readonly id: string;
  readonly area: string;
  readonly bbox: turfHelpers.BBox;
  readonly zone?: turfHelpers.Feature<
    turfHelpers.Polygon | turfHelpers.MultiPolygon
  >;
}
