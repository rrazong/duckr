
// Attempt to authorize via Firebase and Facebook
export function auth() {
  return new Promise((resolve) => {
    // TODO: Replace with actual authorization
    window.setTimeout(() => {
      resolve({
        avatar: 'https://avatars0.githubusercontent.com/u/89370?s=200&v=4',
        name: 'Rich Razon',
        uid: 'rrazong',
      });
    }, 2000);
  });
}

// Check application state if user has been authenticated
export function checkIfAuthed(store) {
  // TODO: If not authed in state, check Firebase/Facebook
  return store.getState().isAuthed;
}
