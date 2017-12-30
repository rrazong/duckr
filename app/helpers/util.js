export function formatUserInfo(name, avatar, uid) {
  return {
    name,
    avatar,
    uid,
  };
}

export function formatDuck(text, { uid, avatar, name }) {
  return {
    avatar,
    name,
    text,
    timestamp: Date.now(),
    uid,
  };
}
