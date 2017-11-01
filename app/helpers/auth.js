
function auth() {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        name: 'Rich Razon',
        avatar: 'https://avatars0.githubusercontent.com/u/89370?s=200&v=4',
        uid: 'rrazong',
      });
    }, 2000);
  });
}

export default auth;
