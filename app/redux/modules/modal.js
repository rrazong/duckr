const OPENING_NEW_DUCK_MODAL = 'OPENING_NEW_DUCK_MODAL ';
const CLOSE_NEW_DUCK_MODAL = 'CLOSE_NEW_DUCK_MODAL ';
const UPDATE_DUCK_TEXT = 'UPDATE_DUCK_TEXT ';

const initialState = {
  isOpen: false,
  duckText: '',
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case OPENING_NEW_DUCK_MODAL:
      return {
        ...state,
        isOpen: true,
      };
    case CLOSE_NEW_DUCK_MODAL:
      return {
        ...state,
        isOpen: false,
      };
    case UPDATE_DUCK_TEXT:
      return {
        ...state,
        duckText: action.newDuckText,
      };
    default:
      return state;
  }
}

export function openModal() {
  return {
    type: OPENING_NEW_DUCK_MODAL,
  };
}

export function closeModal() {
  return {
    type: CLOSE_NEW_DUCK_MODAL,
  };
}

export function updateDuckText(newDuckText) {
  return {
    type: UPDATE_DUCK_TEXT,
    newDuckText,
  };
}
