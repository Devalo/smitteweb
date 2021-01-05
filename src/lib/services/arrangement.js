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
};

const getAllParticipants = async (listId) => {
  const participants = [];

  const partRef = db.collection(`arrangements/${listId}/participants`);
  const snapshot = await partRef.orderBy('createdAt', 'desc').get();

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
      participantCount: 0,
    };

    const addList = await db.collection('arrangements').add(data);

    callbackFromView(addList.id);
  } catch (err) {
    console.error(err);
  }
};

export const addParticipant = async (listId, data) => {
  try {
    const participantRef = db.collection('arrangements').doc(listId);
    const increment = firebase.firestore.FieldValue.increment(1);
    const dataWithTimestamp = {
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      ...data,
    };

    await db.collection(`arrangements/${listId}/participants`).add(dataWithTimestamp);

    await participantRef.update({ participantCount: increment });
  } catch (err) {
    console.error(err);
  }
};
const deleteArrangement = async (userId, listId) => {
  const arrangRef = db.collection('arrangements').doc(listId);
  try {
    await arrangRef.delete();
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const deleteParticipant = async (listId, partId) => {
  const decrement = firebase.firestore.FieldValue.increment(-1);
  const participantRef = db.collection('arrangement').doc(listId);
  const particiRef = db.collection('arrangement').doc(listId).collection('participants').doc(partId);
  try {
    await particiRef.delete();
    await participantRef.update({ participantCount: decrement });
    return true;
  } catch (err) {
    console.error(err);
    return true;
  }
};

export default {
  getAllArrangements,
  getAllParticipants,
  addArrangement,
  deleteArrangement,
  deleteParticipant,
};
