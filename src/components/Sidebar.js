import React from 'react';

const Sidebar = ({ megaids }) => {
    return (
        <div className="sidebar">
            {megaids.map(mega => (
                <div key={mega.megaid} className="mega-item">
                    <h4 style={{ textDecoration: 'underline', color: 'blue' }}>MegaID: {mega.megaid}</h4>
                    <img 
                        src={mega.thumbnailUrl} 
                        alt={`Thumbnail for Megaid ${mega.megaid}`} 
                        style={{ width: '100px', height: 'auto' }} // Set the width and maintain aspect ratio
                    />
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
