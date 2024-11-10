import React from 'react';
import DashboardLayout from '../../hoc/dashboardLayout';
import HistoryBlock from '../../utils/historyBlock';
const UserDashboard = ({ users }) => {
    const { firstname, lastname, email, history } = users?.data || {};

    return (
        <DashboardLayout title="Overview">
            <div className="user_nfo_panel">
                <div>
                    <span>{firstname}</span>
                    <span>{lastname}</span>
                    <span>{email}</span>
                </div>
                {users.data.history.length > 0 ? (
                    <div className="user_nfo_panel">
                        <h1>History of purchases</h1>
                        <div className="user_product_block_wrapper">
                            history
                        </div>
                    </div>
                ) : null}
            </div>
        </DashboardLayout>
    );
}

export default UserDashboard;
