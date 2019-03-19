// Internal.
import { Zone } from './Zone';
import * as Types from './types';

// Code.
export class Job {
  readonly page: number;
  readonly zone: Zone;

  static create(input: unknown): Job | Error {
    if (isJob(input)) {
      const { page, zone } = input;
      const maybeZone = Zone.create(zone);

      if (maybeZone instanceof Error) {
        return new Error(`[Zone Validation] ${maybeZone.message}`);
      }

      return new Job({ page, zone: maybeZone });
    }

    const errMsg = isSafeJob(input).errMsg;
    return new Error(`ValidationError: ${errMsg}`);
  }

  private constructor(input: CreateJobInput) {
    this.page = input.page;
    this.zone = input.zone;
  }
}

// Validation.

export const JOB_PROPS = ['page', 'zone'];

export const isJob = (input: unknown): input is CreateJobInput => {
  return isSafeJob(input).isSafe;
};

export const isSafeJob = (input: unknown): Types.IsSafe => {
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

  for (const key of JOB_PROPS) {
    if (!input.hasOwnProperty(key)) {
      return {
        isSafe: false,
        errMsg: `Expected all input properties to be set, missing ${key}.`,
      };
    }
  }

  const { page } = input as {
    page: unknown;
  };

  const numbers = { page };

  // Numbers

  for (const [key, value] of Object.entries(numbers)) {
    if (typeof value !== 'number') {
      return {
        isSafe: false,
        errMsg: `Expected type of input.${key} to be number, got ${typeof value}.`,
      };
    }
  }

  return {
    isSafe: true,
    errMsg: '',
  };
};

// Interface

export interface CreateJobInput {
  readonly zone: Zone;
  readonly page: number;
}
