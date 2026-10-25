// // pages/BillingPlansPage.tsx
// import { useState } from "react";
// import { services } from "../entities/serviceContext"; // ваши услуги для выбора service_id
// import { ChevronDown, ChevronUp } from "lucide-react";

// // ===== ТИПЫ (зеркало схемы) =====

// // ⚠️ ПОДСТАВЬ РЕАЛЬНЫЕ ЗНАЧЕНИЯ ИЗ SWAGGER (секция Schemas → PriceType)
// const PRICE_TYPES = ["fixed", "per_session"] as const;
// type PriceType = (typeof PRICE_TYPES)[number];

// // ⚠️ ПОДСТАВЬ РЕАЛЬНЫЕ ЗНАЧЕНИЯ (Schemas → BillingPeriod)
// const BILLING_PERIODS = ["weekly", "monthly", "yearly", "custom"] as const;
// type BillingPeriod = (typeof BILLING_PERIODS)[number];

// type BillingPlan = {
//   id: string;
//   service_id: string;
//   name: string;
//   price_type: PriceType;
//   price: string;            // Decimal приходит строкой — как и везде
//   billing_period: BillingPeriod;
//   billing_day: number | null;
//   custom_period_days: number | null;
//   is_active: boolean;
// };

// // Пока бэкенд не подключён — храним в состоянии страницы
// const mockPlans: BillingPlan[] = [
//   {
//     id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     service_id: services[0].id,
//     name: "Маникюр — абонемент 4 визита",
//     price_type: "fixed",
//     price: "8000.00",
//     billing_period: "monthly",
//     billing_day: 1,
//     custom_period_days: null,
//     is_active: true,
//   },
// ];

// // Человекочитаемые подписи для enum'ов
// const PERIOD_LABELS: Record<BillingPeriod, string> = {
//   weekly: "Еженедельно",
//   monthly: "Ежемесячно",
//   yearly: "Ежегодно",
//   custom: "Свой интервал",
// };

// const PRICE_TYPE_LABELS: Record<PriceType, string> = {
//   fixed: "Фиксированная сумма",
//   per_session: "За визит",
// };


// export default function BillingPlansPage() {
//   const [plans, setPlans] = useState<BillingPlan[]>(mockPlans);

//   const [name, setName] = useState("");
//   const [serviceId, setServiceId] = useState(services[0]?.id ?? "");
//   const [price, setPrice] = useState("");
//   const [priceType, setPriceType] = useState<PriceType>(PRICE_TYPES[0]);
//   const [period, setPeriod] = useState<BillingPeriod>("monthly");
//   const [billingDay, setBillingDay] = useState("1");
//   const [customDays, setCustomDays] = useState("");
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [isListOpen, setIsListOpen] = useState(true);
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const newPlan: BillingPlan = {
//       id: crypto.randomUUID(), // временно; на бэке id присвоит БД
//       service_id: serviceId,
//       name,
//       price_type: priceType,
//       price: price,             // строка уходит как есть — Decimal примет
//       billing_period: period,
//       // условные поля: заполняем только если применимы, иначе null
//       billing_day: period === "monthly" ? Number(billingDay) : null,
//       custom_period_days: period === "custom" ? Number(customDays) : null,
//       is_active: true,
//     };

//     setPlans(prev => [newPlan, ...prev]);

//     // сброс формы
//     setName("");
//     setPrice("");
//     setCustomDays("");
//   };

//   const toggleActive = (id: string) => {
//     setPlans(prev =>
//       prev.map(p => (p.id === id ? { ...p, is_active: !p.is_active } : p))
//     );
//   };

//   return (
//     <main className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
//       <section>
//         <div className="flex items-center justify-between mb-4">
//           <h1 className="font-medium text-2xl">Новый тариф</h1>
//           <button
//             onClick={() => setIsFormOpen(prev => !prev)}
//             aria-expanded={isFormOpen}
//             className="rounded-lg p-1.5 hover:bg-gray-100 transition-colors"
//           >
//             {isFormOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//           </button>
//         </div>
//         {isFormOpen && (
//           <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border p-5">
//             <div>
//               <label className="block text-sm text-gray-600 mb-1">Название</label>
//               <input
//                 value={name}
//                 onChange={e => setName(e.target.value)}
//                 required
//                 className="w-full rounded-lg border px-3 py-2 focus:border-indigo-400 focus:outline-none"
//                 placeholder="Абонемент на 4 визита"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-gray-600 mb-1">Услуга</label>
//               <select
//                 value={serviceId}
//                 onChange={e => setServiceId(e.target.value)}
//                 className="w-full rounded-lg border px-3 py-2 focus:border-indigo-400 focus:outline-none"
//               >
//                 {services
//                   .filter(s => s.is_active) // не продаём тарифы на неактивные услуги
//                   .map(s => (
//                     <option key={s.id} value={s.id}>{s.name}</option>
//                   ))}
//               </select>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">Цена</label>
//                 <input
//                   value={price}
//                   onChange={e => setPrice(e.target.value)}
//                   required
//                   inputMode="decimal"
//                   placeholder="8000.00"
//                   className="w-full rounded-lg border px-3 py-2 focus:border-indigo-400 focus:outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">Тип цены</label>
//                 <select
//                   value={priceType}
//                   onChange={e => setPriceType(e.target.value as PriceType)}
//                   className="w-full rounded-lg border px-3 py-2 focus:border-indigo-400 focus:outline-none"
//                 >
//                   {PRICE_TYPES.map(t => (
//                     <option key={t} value={t}>{PRICE_TYPE_LABELS[t]}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm text-gray-600 mb-1">Период списания</label>
//               <select
//                 value={period}
//                 onChange={e => setPeriod(e.target.value as BillingPeriod)}
//                 className="w-full rounded-lg border px-3 py-2 focus:border-indigo-400 focus:outline-none"
//               >
//                 {BILLING_PERIODS.map(p => (
//                   <option key={p} value={p}>{PERIOD_LABELS[p]}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Условные поля: видны только когда релевантны.
//               Это принцип «форма следует за данными», а не наоборот */}
//             {period === "monthly" && (
//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">День списания (1–28)</label>
//                 <input
//                   type="number" min={1} max={28}
//                   value={billingDay}
//                   onChange={e => setBillingDay(e.target.value)}
//                   className="w-full rounded-lg border px-3 py-2 focus:border-indigo-400 focus:outline-none"
//                 />
//                 <p className="text-xs text-gray-400 mt-1">
//                   До 28, чтобы тариф работал и в феврале
//                 </p>
//               </div>
//             )}

//             {period === "custom" && (
//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">Интервал, дней</label>
//                 <input
//                   type="number" min={1}
//                   value={customDays}
//                   onChange={e => setCustomDays(e.target.value)}
//                   required
//                   placeholder="14"
//                   className="w-full rounded-lg border px-3 py-2 focus:border-indigo-400 focus:outline-none"
//                 />
//               </div>
//             )}

//             <button
//               type="submit"
//               className="w-full rounded-xl bg-indigo-600 py-2.5 text-white transition-colors hover:bg-indigo-700"
//             >
//               Создать тариф
//             </button>
//           </form>)}
//       </section>

//       {/* ===== Список тарифов ===== */}
//       <section>
//         <h2 className="font-medium text-2xl mb-4">Тарифы</h2>

//         {plans.length === 0 ? (
//           <p className="text-gray-400">Тарифов пока нет</p>
//         ) : (
//           <ul className="space-y-3">
//             {plans.map(plan => {
//               const service = services.find(s => s.id === plan.service_id);
//               return (
//                 <li
//                   key={plan.id}
//                   className={`rounded-xl border p-4 transition-all
//                     ${plan.is_active ? "bg-white" : "opacity-50 bg-gray-50"}`}
//                   style={{ borderLeftWidth: 4, borderLeftColor: service?.color ?? "#CBD5E1" }}
//                 >
//                   <div className="flex items-start justify-between gap-4">
//                     <div>
//                       <h3 className="font-medium">{plan.name}</h3>
//                       <p className="text-sm text-gray-500">{service?.name ?? "Услуга удалена"}</p>
//                       <p className="text-sm mt-1">
//                         <span className="font-medium text-indigo-600">
//                           {Number(plan.price).toLocaleString("ru-RU")} ₽
//                         </span>
//                         {" · "}{PERIOD_LABELS[plan.billing_period]}
//                         {plan.billing_day != null && ` · ${plan.billing_day} числа`}
//                         {plan.custom_period_days != null && ` · раз в ${plan.custom_period_days} дн.`}
//                       </p>
//                     </div>

//                     <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer shrink-0">
//                       <input
//                         type="checkbox"
//                         checked={plan.is_active}
//                         onChange={() => toggleActive(plan.id)}
//                         className="accent-indigo-600"
//                       />
//                       Активен
//                     </label>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </section>
//     </main >
//   );
// }