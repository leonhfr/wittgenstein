// Internal.
import { Photo, PHOTO_PROPS, isPhoto } from './Photo';
import * as Mocks from './mocks';

// Code.
describe('Photo', () => {
  describe('Class', () => {
    it('should be defined', () => {
      expect(Photo).toBeDefined();
    });

    describe('create', () => {
      it('should fail to create a new instance - invalid input', () => {
        expect(Photo.create(null)).toMatchSnapshot();
      });
      it('should create a new instance', () => {
        expect(Photo.create(Mocks.createMockPhotoInput())).toMatchSnapshot();
      });
    });
  });

  describe('Validation', () => {
    it('should be defined', () => {
      expect(PHOTO_PROPS).toBeDefined();
    });
    it('should match the expected value', () => {
      expect(PHOTO_PROPS).toMatchSnapshot();
    });
    it('should be up to date', () => {
      expect(PHOTO_PROPS).toEqual(
        Object.keys(Photo.create(Mocks.createMockPhotoInput()))
      );
    });
  });

  describe('isPhoto', () => {
    it('should be defined', () => {
      expect(isPhoto).toBeDefined();
    });
    it('should handle an invalid input - wrong type', () => {
      expect(isPhoto('__FAIL__')).toBe(false);
    });
    it('should handle an invalid input - null type', () => {
      expect(isPhoto(null)).toBe(false);
    });
    it('should handle an invalid input - missing props', () => {
      expect(isPhoto({})).toBe(false);
    });
    it('should handle an invalid input - numbers', () => {
      expect(
        isPhoto({
          ...Mocks.createMockPhotoInput(),
          views: '__FAIL__',
        })
      ).toBe(false);
    });
    it('should handle an invalid input - strings', () => {
      expect(
        isPhoto({
          ...Mocks.createMockPhotoInput(),
          id: false,
        })
      ).toBe(false);
    });
    it('should handle an invalid input - arrays', () => {
      expect(
        isPhoto({
          ...Mocks.createMockPhotoInput(),
          tags: '__FAIL__',
        })
      ).toBe(false);
    });
    it('should handle an invalid input - string arrays', () => {
      expect(
        isPhoto({
          ...Mocks.createMockPhotoInput(),
          tags: [false],
        })
      ).toBe(false);
    });
  });
});
