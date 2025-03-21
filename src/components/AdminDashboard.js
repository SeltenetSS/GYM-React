import React from 'react';

const AdminDashboard = () => {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <p>Admin olaraq istifadəçiləri idarə edə bilərsiniz, abunəlikləri və ödənişləri izləyə bilərsiniz.</p>
            {/* Admin üçün idarəetmə alətləri */}
            <button>İstifadəçiləri İdarə Et</button>
            <button>Ödənişləri İdarə Et</button>
            <button>Statistikaları Görüntülə</button>
        </div>
    );
};

export default AdminDashboard;
