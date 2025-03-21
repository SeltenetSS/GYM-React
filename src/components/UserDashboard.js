import React from 'react';

const UserDashboard = () => {
    return (
        <div>
            <h2>User Dashboard</h2>
            <p>İstifadəçi olaraq məşq planlarını seçə bilərsiniz, ödənişləri edə bilərsiniz və nəticələrinizi izləyə bilərsiniz.</p>
            {/* User üçün məşq planları və digər funksionallıqlar */}
            <button>Yeni Məşq Planı Seç</button>
            <button>Ödəniş Et</button>
            <button>Məşq Nəticələrini Görüntülə</button>
        </div>
    );
};

export default UserDashboard;
