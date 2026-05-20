export const AVATAR_OPTIONS = [
  {
    id: 'avatar-1',
    label: 'Búho',
    source: require('../../assets/avatars/avatar-1.png'),
  },
  {
    id: 'avatar-2',
    label: 'Zorro',
    source: require('../../assets/avatars/avatar-2.png'),
  },
  {
    id: 'avatar-3',
    label: 'Gato',
    source: require('../../assets/avatars/avatar-3.png'),
  },
  {
    id: 'avatar-4',
    label: 'Oso',
    source: require('../../assets/avatars/avatar-4.png'),
  },
];

export const DEFAULT_AVATAR_ID = AVATAR_OPTIONS[0].id;

export const getAvatarById = (avatarId) => (
  AVATAR_OPTIONS.find((avatar) => avatar.id === avatarId)
);

export const getAvatarSource = (avatarId, photoURL) => {
  const localAvatar = getAvatarById(avatarId || photoURL);

  if (localAvatar) {
    return localAvatar.source;
  }

  if (photoURL) {
    return { uri: photoURL };
  }

  return null;
};
