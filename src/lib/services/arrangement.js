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
  console.log('GET')
  const arrRef = db.collection('arrangements').doc(listId);
  const singleArrangement = await arrRef.get();
  
  return singleArrangement.data();
}

const getAllParticipants = async (listId) => {
  const user = fire.auth().currentUser;
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
  console.log(participants);
  return participants;
};

export default {
  getAllArrangements,
  getAllParticipants,
};