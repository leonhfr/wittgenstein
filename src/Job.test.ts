// Internal.
import { Job, JOB_PROPS, isJob } from './Job';
import * as Mocks from './mocks';

// Code.
describe('Job', () => {
  describe('Class', () => {
    it('should be defined', () => {
      expect(Job).toBeDefined();
    });

    describe('create', () => {
      it('should fail to create a new instance - invalid input', () => {
        expect(Job.create(null)).toMatchSnapshot();
      });
      it('should create a new instance', () => {
        expect(Job.create(Mocks.createMockJobInput())).toMatchSnapshot();
      });
      it('should handle an invalid input - zone', () => {
        expect(
          Job.create({ ...Mocks.createMockJobInput(), zone: false })
        ).toMatchSnapshot();
      });
    });
  });

  describe('Validation', () => {
    it('should be defined', () => {
      expect(JOB_PROPS).toBeDefined();
    });
    it('should match the expected value', () => {
      expect(JOB_PROPS).toMatchSnapshot();
    });
    it('should be up to date', () => {
      expect(JOB_PROPS).toEqual(
        Object.keys(Job.create(Mocks.createMockJobInput()))
      );
    });
  });

  describe('isJob', () => {
    it('should be defined', () => {
      expect(isJob).toBeDefined();
    });
    it('should handle an invalid input - wrong type', () => {
      expect(isJob('__FAIL__')).toBe(false);
    });
    it('should handle an invalid input - null type', () => {
      expect(isJob(null)).toBe(false);
    });
    it('should handle an invalid input - missing props', () => {
      expect(isJob({})).toBe(false);
    });
    it('should handle an invalid input - numbers', () => {
      expect(
        isJob({
          ...Mocks.createMockJobInput(),
          page: false,
        })
      ).toBe(false);
    });
  });
});
