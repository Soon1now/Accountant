import StatusActive from "./StatusActive";

export default function ServiceCard({ service }) {

    const isActive = Boolean(service.is_active);

    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg" >
            <div className="flex gap-3">
                <div className="h-11 w-11 rounded-full bg-indigo-50"></div>

                <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-wrap border-l-3 pl-1.5 rounded-xs" style={{ borderColor: service.color }}>
                        {service.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-slate-500">
                        {service.description}
                    </p>
                </div>

                <StatusActive isActive={isActive} />
            </div>

        </div>
    );
}