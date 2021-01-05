import React from 'react';
import { useSelector } from 'react-redux';

// Komponent som viser notifications
// Henter notifications fra state, i form av en tuple som inneholder både
// beskjeden og en bootstrap class.
const Notification = () => {
  const notification = useSelector((state) => state.notification);
  // notification[0] == message
  // notification[1] == bootstrap class

  const styles = {
    marginTop: '10px',
    marginBottom: '-80px',
  };

  if (!notification[0]) {
    return null;
  }

  return (
    <div className="text-center" style={styles}>
      <div className={`alert alert-${notification[1]}`}>
        {notification[0]}
      </div>
    </div>
  );
};

export default Notification;
