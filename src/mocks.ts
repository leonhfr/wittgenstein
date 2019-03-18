// Internal.
import { CreateAreaInput } from './Area';
import { CreatePhotoInput } from './Photo';

// Code.
export const createMockAreaInput = (area?: any): CreateAreaInput => {
  const _area = area || {};
  return {
    id: _area.id || '8ea8f412-4ee8-4f1d-9228-4c133b8fbd37',
    name: _area.name || 'Sant Marti',
    file: _area.file || 'sant-marti',
    lastScheduledAt: _area.lastScheduledAt || 0,
    refreshRate: _area.refreshRate || 86400,
    enabled: _area.enabled || true,
    zonesComputed: _area.zonesComputed || false,
  };
};

export const createMockPhotoInput = (photo?: any): CreatePhotoInput => {
  const _photo = photo || {};
  return {
    id: _photo.id || '32457360587',
    owner: _photo.owner || '41710899@N08',
    secret: _photo.secret || '69b27ceb18',
    server: _photo.server || '4898',
    farm: _photo.farm || 5,
    title: _photo.title || 'Arc de Triomf',
    description:
      _photo.description ||
      'The Arc de Triomf was built as the entrance of the 1888 Barcelona Universal Exposition. It was designed by architect Josep Vilaseca i Casanovas in the Neo-Mudéjar style.',
    ownername: _photo.ownername || 'jdf_92',
    views: _photo.views || 16,
    tags: _photo.tags || [
      'spain',
      'barcelona',
      'arcdetriomf',
      '1888barcelonaworldfair',
      'neomudéjar',
      '1888barcelonauniversalexposition',
      'catelonia',
    ],
    latitude: _photo.latitude || 41.390791,
    longitude: _photo.longitude || 2.18114,
    context: _photo.context || 0,
  };
};
