'use client';

import { useState, useEffect } from 'react';

const FirstPopUp = ( onClose:any ) => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const isMobile = window.innerWidth <= 768; // Show only on mobile screens
        const TWELVE_HOURS = 6 * 60 * 60 * 1000; // 12 hours in milliseconds
    
        if (isMobile) {
          const lastVisit = localStorage.getItem('lastVisit'); // Get the last visit timestamp
          const now = Date.now();
    
          if (!lastVisit || now - parseInt(lastVisit) > TWELVE_HOURS) {
            // Show the pop-up if the user hasn't visited in the last 12 hours
            setShowPopup(true);
            localStorage.setItem('lastVisit', now.toString()); // Update the last visit timestamp
          }
        }
      }, []);
  
    const handleClosePopup = () => {
      setShowPopup(false);
    };
  
    return (
        <>
        {showPopup && (
          <div className="popup-overlay" onClick={handleClosePopup}>
            <div
              className="popup-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-icon" onClick={handleClosePopup}>
                &times;
              </button>
              
              <div className="popup-body">
                <div className="welcome-text">Hey There! 👋</div>
                <div className="savings-badge">SPECIAL OFFER</div>
                <div className="discount-text">70% OFF</div>
                <p className="offer-text">First-Time Customer Exclusive</p>
                <button className="action-button" onClick={handleClosePopup}>
                  Claim Your Discount
                </button>
              </div>
            </div>
            
            <style jsx>{`
              .popup-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
              }
              
              .popup-content {
                background: linear-gradient(145deg, #ffffff, #f7f7f7);
                padding: 28px 24px;
                border-radius: 24px;
                text-align: center;
                width: 90%;
                max-width: 320px;
                max-height: 40vh;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
                position: relative;
                border: 1px solid rgba(243, 92, 122, 0.1);
              }
              
              .popup-body {
                display: flex;
                flex-direction: column;
                gap: 12px;
                align-items: center;
              }
              
              .close-icon {
                position: absolute;
                top: 12px;
                right: 12px;
                background: none;
                border: none;
                font-size: 24px;
                font-weight: bold;
                cursor: pointer;
                color: rgb(243, 92, 122);
                padding: 4px 8px;
                transition: color 0.2s;
              }
              
              .close-icon:hover {
                color: rgb(220, 80, 110);
              }
              
              .welcome-text {
                font-size: 24px;
                font-weight: bold;
                color: #374151;
                margin-bottom: 4px;
              }
              
              .savings-badge {
                background: rgb(243, 92, 122);
                color: white;
                padding: 8px 20px;
                border-radius: 20px;
                font-size: 16px;
                font-weight: 600;
                letter-spacing: 0.5px;
              }
              
              .discount-text {
                font-size: 36px;
                font-weight: bold;
                color: rgb(243, 92, 122);
                margin: 4px 0;
              }
              
              .offer-text {
                color: #6b7280;
                font-size: 14px;
                margin: 0;
                font-weight: 500;
              }
              
              .action-button {
                background: rgb(243, 92, 122);
                color: white;
                border: none;
                padding: 14px 28px;
                border-radius: 25px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                width: 100%;
                max-width: 220px;
                margin-top: 8px;
                box-shadow: 0 4px 12px rgba(243, 92, 122, 0.15);
              }
              
              .action-button:hover {
                background: rgb(220, 80, 110);
                transform: translateY(-1px);
                box-shadow: 0 6px 16px rgba(243, 92, 122, 0.2);
              }
            `}</style>
          </div>
        )}
      </>
      );
};

export default FirstPopUp;
