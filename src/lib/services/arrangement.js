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
  return participants;
};

export default {
  getAllArrangements,
  getAllParticipants,
};