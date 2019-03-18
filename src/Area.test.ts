// Internal.
import { Area, AREA_PROPS, isArea } from './Area';
import * as Mocks from './mocks';

// Code.
describe('Area', () => {
  describe('Class', () => {
    it('should be defined', () => {
      expect(Area).toBeDefined();
    });

    describe('create', () => {
      it('should fail to create a new instance - invalid input', () => {
        expect(Area.create(null)).toMatchSnapshot();
      });
      it('should create a new instance', () => {
        expect(Area.create(Mocks.createMockAreaInput())).toMatchSnapshot();
      });
    });
  });

  describe('Validation', () => {
    it('should be defined', () => {
      expect(AREA_PROPS).toBeDefined();
    });
    it('should match the expected value', () => {
      expect(AREA_PROPS).toMatchSnapshot();
    });
    it('should be up to date', () => {
      expect(AREA_PROPS).toEqual(
        Object.keys(Area.create(Mocks.createMockAreaInput()))
      );
    });
  });

  describe('isArea', () => {
    it('should be defined', () => {
      expect(isArea).toBeDefined();
    });
    it('should handle an invalid input - wrong type', () => {
      expect(isArea('__FAIL__')).toBe(false);
    });
    it('should handle an invalid input - null type', () => {
      expect(isArea(null)).toBe(false);
    });
    it('should handle an invalid input - missing props', () => {
      expect(isArea({})).toBe(false);
    });
    it('should handle an invalid input - numbers', () => {
      expect(
        isArea({
          ...Mocks.createMockAreaInput(),
          refreshRate: '__FAIL__',
        })
      ).toBe(false);
    });
    it('should handle an invalid input - strings', () => {
      expect(
        isArea({
          ...Mocks.createMockAreaInput(),
          id: false,
        })
      ).toBe(false);
    });
    it('should handle an invalid input - booleans', () => {
      expect(
        isArea({
          ...Mocks.createMockAreaInput(),
          enabled: '__FAIL__',
        })
      ).toBe(false);
    });
  });
});
