/* eslint-disable import/no-anonymous-default-export */
import firebase from 'firebase';

import fire from '../../config/fire';

const db = fire.firestore();

const getAllArrangements = async () => {
  const user = fire.auth().currentUser;
  const arrangements = [];
  
  const arrangRef = db.collection('arrangements');
  const snapshot = await arrangRef.where('belongsTo', '==', user.uid).get();
  
  snapshot.forEach((doc) => {
    const obj = {
      id: doc.id,
      ...doc.data(),
    };
    arrangements.push(obj);
  });
  return arrangements;
};

export const getOneArrangement = async (listId) => {
  const arrRef = db.collection('arrangements').doc(listId);
  const singleArrangement = await arrRef.get();
  
  return singleArrangement.data();
}

const getAllParticipants = async (listId) => {
  const participants = [];
  
  const partRef = db.collection(`arrangements/${listId}/participants`);
  const snapshot = await partRef.get();
  
  snapshot.forEach((doc) => {
    const obj = {
      id: doc.id,
      ...doc.data(),
    };
    participants.push(obj);
  });
  return participants;
};

const addArrangement = async (listName, callbackFromView) => {
  const user = fire.auth().currentUser;
  try {
    const data = {
      name: listName,
      belongsTo: user.uid,
    };
    
    const addList = await db.collection('arrangements').add(data);
    
    const dataWithId = {
      ...data,
      id: addList.id,
    }
    callbackFromView(addList.id);
    
  } catch (err) {
    console.error(err);
  }
}

export const addParticipant = async (listId, data) => {
  try {
    const added = await db.collection(`arrangements/${listId}/participants`).add(data);
    const increment = firebase.firestore.FieldValue.increment(1);

    const participantRef = db.collection('arrangements').doc(listId);
    participantRef.update({ participantCount: increment });
  } catch (err) {
    console.log(err);
  }
}

export default {
  getAllArrangements,
  getAllParticipants,
  addArrangement,
};