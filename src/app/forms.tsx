"use client";
import { useActionState, useState } from "react";
import { access, submitReport } from "./actions";
import { categories, sectors, periods } from "../lib/catalog";

export function AccessForm({ register, disabled }: { register: boolean; disabled: boolean }) {
  const [state, action, pending] = useActionState(access.bind(null, register ? "register" : "login"), { message: "" });
  const [visible, setVisible] = useState(false);
  return <form action={action} className="form-stack">
    {register && <label>Alias <input name="alias" required minLength={3} maxLength={24} placeholder="Vecino_CantoGrande" /></label>}
    <label>Correo ficticio <input name="email" type="email" autoComplete="username" placeholder="vecino@example.test" required maxLength={100} /></label>
    <label>Contraseña <input name="password" type={visible ? "text" : "password"} autoComplete={register ? "new-password" : "current-password"} required minLength={10} maxLength={128} /></label>
    <button type="button" className="text-button" aria-pressed={visible} onClick={() => setVisible(!visible)}>{visible ? "Ocultar" : "Mostrar"} contraseña</button>
    {state.message && <p role="alert" className="notice">{state.message}</p>}
    <button className="button" disabled={disabled || pending}>{pending ? "Procesando…" : register ? "Crear cuenta demo" : "Ingresar"}</button>
  </form>;
}

export function ReportForm({ requestId }: { requestId: string }) {
  const [state, action, pending] = useActionState(submitReport, { message: "" });
  const fields = [
    { label: "Sector", name: "sector", values: sectors.map(value => ({ value, label: value })) },
    { label: "Categoría", name: "category", values: categories.map(value => ({ value, label: value })) },
    { label: "Periodo", name: "period", values: periods.map((value, index) => ({ value, label: index === 0 ? "Julio a septiembre de 2026" : "Octubre a diciembre de 2026" })) },
  ];
  return <form action={action} className="form-stack">
    <input type="hidden" name="requestId" value={requestId} />
    {fields.map(({label, name, values}) => <label key={name}>{label}
      <select name={name} required defaultValue=""><option value="" disabled>Selecciona una opción</option>
        {values.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>)}
    <label className="check"><input type="checkbox" name="demo" required /> Confirmo que es un ensayo ficticio.</label>
    {state.message && <p role="alert" className="notice">{state.message}</p>}
    <button className="button" disabled={pending}>{pending ? "Guardando…" : "Enviar reporte demo"}</button>
  </form>;
}
