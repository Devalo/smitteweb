/* eslint-disable import/no-anonymous-default-export */
import firebase from 'firebase';

import fire from '../../config/fire';

const db = fire.firestore();

// Oppretter en referanse til firebase-collection,
// Henter ned et snapshot av all data
// Looper over dataen, og oppretter et nytt objekt for hver loop,
// hvor vi appender en ID til hvert objekt.
// objektet pushes så til et array i parent funksjon,
// og returneres til action.
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

// Public funksjon som går utenom redux.
// Denne servicen benyttes for å fetche arrangementdata
// til deltakere (public)
export const getOneArrangement = async (listId) => {
  const arrRef = db.collection('arrangements').doc(listId);
  const singleArrangement = await arrRef.get();

  return singleArrangement.data();
};

// Henter alle deltakere i et arrangement.
// Sorteres etter createdAt.
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

// oppretter et nytt objekt, hvor antall deltakere initialiseres,
// og brukerens ID legges til.
// Etter å ha mottatt ID fra firebase, returneres id i en callback
// til view
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
    return { ...data, id: addList.id };
  } catch (err) {
    console.error(err);
  }
  return false;
};

// public funksjon for å legge til deltakere.
// Legger til createdAt, og oppdaterer arrangementets deltakerantall
// etter opprettelse.
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

// Sletter arrangement.
// Firebase gir ingen indikasjon på om sletting gir ok,
// Så hvis try-blokken er vellykket, returneres true
const deleteArrangement = async (userId, listId) => {
  const arrangRef = db.collection('arrangements').doc(listId);
  const arrangement = await arrangRef.get();
  try {
    if (arrangement.data().belongsTo === userId) {
      await arrangRef.delete();
      return true;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
  return false;
};

// Sletter deltaker. Oppdaterer deltakerantallet, og returnerer true hvis ok.
const deleteParticipant = async (listId, partId) => {
  const decrement = firebase.firestore.FieldValue.increment(-1);
  const participantRef = db.collection('arrangements').doc(listId);
  const particiRef = db.collection('arrangements').doc(listId).collection('participants').doc(partId);
  try {
    await particiRef.delete();
    await participantRef.update({ participantCount: decrement });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default {
  getAllArrangements,
  getAllParticipants,
  addArrangement,
  deleteArrangement,
  deleteParticipant,
};
