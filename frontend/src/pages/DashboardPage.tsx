export default function DashboardPage() {
    return (
        <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-sm text-slate-500">Всего клиентов</p>
                        <p className="text-2xl font-bold text-slate-800 mt-1">12</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-sm text-slate-500">Активных услуг</p>
                        <p className="text-2xl font-bold text-slate-800 mt-1">5</p>
                    </div>
                </div>
            </div>
        </main>
    )
}