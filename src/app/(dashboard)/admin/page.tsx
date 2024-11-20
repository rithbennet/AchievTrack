import SystemActivity from './components/SystemActivity';
import Alerts from './components/Alerts';
import ReportingMetrics from './components/ReportingMetrics';
import ExportSummary from './components/ExportSummary';

export default function dashboardAdmin() {
    return (
        <main className="container mt-4">
            <h1>Admin Dashboard</h1>

            {/* Critical Alerts */}
            <Alerts />

            <div className="row">
                {/* System Activity */}
                <div className="col-md-6">
                    <SystemActivity />
                </div>

                {/* Reporting Metrics */}
                <div className="col-md-6">
                    <ReportingMetrics />
                </div>
            </div>

            <div className="row">
                {/* Exportable Summary */}
                <div className="col-md-12">
                    <ExportSummary />
                </div>
            </div>
        </main>
    );
}
