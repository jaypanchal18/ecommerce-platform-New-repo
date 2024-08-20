import React from 'react';
import { Toast } from 'react-bootstrap';
 // For custom styles

const Notification = ({ notifications, onClose }) => {
  return (
    <div className="notification-container">
      {notifications.map((notification, index) => (
        <Toast
          key={index}
          bg={notification.type}
          onClose={() => onClose(index)}
          show={true}
          className="notification-toast"
        >
          <Toast.Header>
            <strong className="me-auto">{notification.title}</strong>
          </Toast.Header>
          <Toast.Body>{notification.message}</Toast.Body>
        </Toast>
      ))}
    </div>
  );
};

export default Notification;
