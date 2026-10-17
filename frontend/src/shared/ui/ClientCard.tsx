import StatusActive from "./StatusActive";

export default function ClientCard({ client }) {
    const name = `${client.first_name || ""} ${client.last_name || ""}`.trim();
    const isActive = Boolean(client.is_active);

    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg">
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-soft-blue font-semibold text-blue">
                    {client.first_name[0]}
                    {client.last_name[0]}
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold  text-wrap">
                        {name}
                    </h3>

                    <p className="mt-0.5 text-sm text-slate-500">
                        {client.phone}
                    </p>
                </div>
                <StatusActive isActive={isActive}/>
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