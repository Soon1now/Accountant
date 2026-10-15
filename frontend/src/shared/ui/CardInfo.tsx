export default function ClientCard({ client }) {
    const name = `${client.first_name || ""} ${client.last_name || ""}`.trim();
    const isActive = Boolean(client.is_active);

    return (
        <div className="break-inside-avoid group rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg">
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 font-semibold text-indigo-600">
                    {client.first_name[0]}
                    {client.last_name[0]}
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-slate-900">
                        {name}
                    </h3>

                    <p className="mt-0.5 text-sm text-slate-500">
                        {client.phone}
                    </p>
                </div>

                <span
                    className={`h-2.5 w-2.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-slate-300"
                        }`}
                    title={isActive ? "Активный" : "Неактивный"}
                />
            </div>
            {client.notes && (
                <div className="mt-4 rounded-xl  px-3 text-sm text-slate-600">
                    {client.notes}
                </div>
            )}

            <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
                Telegram: @{client.telegram_username.replace("@", "")}
            </div>
        </div>
    );
}