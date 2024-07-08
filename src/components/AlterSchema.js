import React, { useState } from 'react';
import PropertyForm from './PropertyForm';
import DeletePropertyForm from './DeletePropertyForm';
import '../assets/css/AlterSchema.css'; // Add CSS for tabs if needed

const AlterSchema = () => {
    const [activeTab, setActiveTab] = useState('add');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'add':
                return <PropertyForm />;
            case 'delete':
                return <DeletePropertyForm />;
            default:
                return <PropertyForm />;
        }
    };

    return (
        <div className="alter-schema">
            <div className="tabs">
                <button 
                    className={activeTab === 'add' ? 'active' : ''} 
                    onClick={() => setActiveTab('add')}
                >
                    Add Property
                </button>
                <button 
                    className={activeTab === 'delete' ? 'active' : ''} 
                    onClick={() => setActiveTab('delete')}
                >
                    Delete Property
                </button>
            </div>
            <div className="tab-content">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default AlterSchema;
