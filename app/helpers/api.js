import { ref } from '../config/constants';

function saveToDucks(duck) {
  const duckId = ref.child('ducks').push().key;
  const duckPromise = ref.child(`ducks/${duckId}`).set({
    ...duck,
    duckId,
  });

  return {
    duckId,
    duckPromise,
  };
}

function saveToUsersDucks(duck, duckId) {
  return ref.child(`usersDucks/${duck.uid}/${duckId}`).set({
    ...duck,
    duckId,
  });
}

function saveToLikeCount(duckId) {
  return ref.child(`likeCount/${duckId}`).set(0);
}

function saveDuck(duck) {
  const { duckId, duckPromise } = saveToDucks(duck);

  return Promise.all([
    duckPromise,
    saveToUsersDucks(duck, duckId),
    saveToLikeCount(duckId),
  ])
    .then(() => ({
      ...duck,
      duckId,
    }))
    .catch((error) => {
      console.log('there was an error saving this duck', duck, error);
    });
}

export default saveDuck;
