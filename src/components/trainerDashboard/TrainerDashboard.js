import React from 'react';

const TrainerDashboard = () => {
    return (
        <div>
            <h2>Trainer Dashboard</h2>
            <p>Trainer olaraq məşq planları yaradın və istifadəçilərin məşq tarixçəsini izləyin.</p>
            {/* Trainer üçün məşq planları və tarixçə */}
            <button>Yeni Məşq Planı Yarad</button>
            <button>İstifadəçi Məşq Tarixçəsini Görüntülə</button>
            <button>Məşq Nəticələrini Yoxla</button>
        </div>
    );
};

export default TrainerDashboard;
