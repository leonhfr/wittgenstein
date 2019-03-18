// Internal.
import * as Types from './types';

// Code.
export class Area {
  readonly id: string;
  readonly name: string;
  readonly file: string;
  readonly lastScheduledAt: number;
  readonly refreshRate: number;
  readonly enabled: boolean;
  readonly zonesComputed: boolean;

  static create(input: unknown): Area | Error {
    if (isArea(input)) {
      return new Area(input);
    }
    const errMsg = isSafeArea(input).errMsg;
    return new Error(`ValidationError: ${errMsg}`);
  }

  private constructor(input: CreateAreaInput) {
    this.id = input.id;
    this.name = input.name;
    this.file = input.file;
    this.lastScheduledAt = input.lastScheduledAt;
    this.refreshRate = input.refreshRate;
    this.enabled = input.enabled;
    this.zonesComputed = input.zonesComputed;
  }
}

// Validation.

export const AREA_PROPS = [
  'id',
  'name',
  'file',
  'lastScheduledAt',
  'refreshRate',
  'enabled',
  'zonesComputed',
];

export const isArea = (input: unknown): input is CreateAreaInput => {
  return isSafeArea(input).isSafe;
};

export const isSafeArea = (input: unknown): Types.IsSafe => {
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

  for (const key of AREA_PROPS) {
    if (!input.hasOwnProperty(key)) {
      return {
        isSafe: false,
        errMsg: `Expected all input properties to be set, missing ${key}.`,
      };
    }
  }

  const {
    id,
    name,
    file,
    lastScheduledAt,
    refreshRate,
    enabled,
    zonesComputed,
  } = input as {
    id: unknown;
    name: unknown;
    file: unknown;
    lastScheduledAt: unknown;
    refreshRate: unknown;
    enabled: unknown;
    zonesComputed: unknown;
  };

  const numbers = { lastScheduledAt, refreshRate };

  const strings = { id, name, file };

  const booleans = { enabled, zonesComputed };

  // Numbers

  for (const [key, value] of Object.entries(numbers)) {
    if (typeof value !== 'number') {
      return {
        isSafe: false,
        errMsg: `Expected type of input.${key} to be number, got ${typeof value}.`,
      };
    }
  }

  // Strings

  for (const [key, value] of Object.entries(strings)) {
    if (typeof value !== 'string') {
      return {
        isSafe: false,
        errMsg: `Expected type of input.${key} to be string, got ${typeof value}.`,
      };
    }
  }

  // Booleans

  for (const [key, value] of Object.entries(booleans)) {
    if (typeof value !== 'boolean') {
      return {
        isSafe: false,
        errMsg: `Expected type of input.${key} to be boolean, got ${typeof value}.`,
      };
    }
  }

  return {
    isSafe: true,
    errMsg: '',
  };
};

// Interface

export interface CreateAreaInput {
  readonly id: string;
  readonly name: string;
  readonly file: string;
  readonly lastScheduledAt: number;
  readonly refreshRate: number;
  readonly enabled: boolean;
  readonly zonesComputed: boolean;
}
