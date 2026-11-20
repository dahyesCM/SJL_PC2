"use client";
import { useActionState, useState } from "react";
import { access, submitReport } from "./actions";
import { categories, sectors, periods } from "../lib/catalog";
import { suggestSector } from "../lib/location";

export function AccessForm({ register, disabled, next }: { register: boolean; disabled: boolean; next?: string }) {
  const [state, action, pending] = useActionState(access.bind(null, register ? "register" : "login"), { message: "" });
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  function input(name: string) {
    return {
      id: name, name, value: values[name] ?? "",
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValues(current => ({ ...current, [name]: value }));
      },
      "aria-invalid": Boolean(state.errors?.[name]),
      "aria-describedby": state.errors?.[name] ? name + "-error" : undefined,
    };
  }
  function error(name: string) {
    return state.errors?.[name] && <small id={name + "-error"} className="field-error">{state.errors[name]}</small>;
  }
  return <form action={action} className="form-stack">
    {next && <input type="hidden" name="next" value={next} />}
    {register && <fieldset className="registration-details">
      <legend>Datos personales</legend>
      <label>Nombre completo <input {...input("name")} autoComplete="name" required maxLength={100} />{error("name")}</label>
      <div className="form-row">
        <label>DNI <input {...input("dni")} inputMode="numeric" required maxLength={8} pattern="[0-9]{8}" />{error("dni")}</label>
        <label>Celular <input {...input("phone")} type="tel" autoComplete="tel" placeholder="+51" required maxLength={20} />{error("phone")}</label>
      </div>
      <label>Alias <input {...input("alias")} required minLength={3} maxLength={24} placeholder="Vecino_CantoGrande" />{error("alias")}</label>
    </fieldset>}
    <label>Correo electrónico <input {...input("email")} type="email" autoComplete="username" placeholder="nombre@correo.com" required maxLength={100} />{error("email")}</label>
    <label>Contraseña <input {...input("password")} type={visible ? "text" : "password"} autoComplete={register ? "new-password" : "current-password"} required minLength={10} maxLength={128} />{error("password")}</label>
    {register && <label>Confirmar contraseña <input {...input("confirm")} type={visible ? "text" : "password"} autoComplete="new-password" required minLength={10} maxLength={128} />{error("confirm")}</label>}
    <button type="button" className="text-button" aria-pressed={visible} onClick={() => setVisible(!visible)}>{visible ? "Ocultar" : "Mostrar"} contraseña</button>
    {state.message && <p role="alert" className="notice">{state.message}</p>}
    <button className="button" disabled={disabled || pending}>{pending ? "Procesando…" : register ? "Crear cuenta" : "Iniciar sesión"}</button>
  </form>;
}

export function ReportForm({ requestId }: { requestId: string }) {
  const [state, action, pending] = useActionState(submitReport, { message: "" });
  const [sector, setSector] = useState("");
  const [position, setPosition] = useState("");
  const [locating, setLocating] = useState(false);
  const [locationNote, setLocationNote] = useState("");
  function addLocation() {
    if (!navigator.geolocation) {
      setLocationNote("La ubicación no está disponible en este navegador. Puedes enviar el reporte con el sector.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setLocating(false);
      const latitude = coords.latitude.toFixed(2);
      const longitude = coords.longitude.toFixed(2);
      const suggestion = coords.accuracy <= 2500 ? suggestSector(Number(latitude), Number(longitude)) : undefined;
      if (!suggestion) {
        setLocationNote("No se pudo ubicar el reporte dentro del área disponible. Puedes seleccionar el sector.");
        return;
      }
      setSector(suggestion);
      setPosition(latitude + "," + longitude);
      setLocationNote("Ubicación aproximada añadida. Puedes cambiar el sector o retirar la ubicación.");
    }, () => {
      setLocating(false);
      setLocationNote("No se obtuvo permiso o señal. Puedes enviar el reporte sin ubicación.");
    }, { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 });
  }
  const fields = [
    { label: "Categoría", name: "category", values: categories.map(value => ({ value, label: value })) },
    { label: "Periodo", name: "period", values: periods.map((value, index) => ({ value, label: index === 0 ? "Julio a septiembre de 2026" : "Octubre a diciembre de 2026" })) },
  ];
  return <form action={action} className="form-stack">
    <input type="hidden" name="requestId" value={requestId} />
    <input type="hidden" name="position" value={position} />
    <label>Sector
      <select name="sector" value={sector} onChange={event => setSector(event.target.value)} required>
        <option value="" disabled>Selecciona un sector</option>
        {sectors.map(value => <option key={value}>{value}</option>)}
      </select>
    </label>
    {fields.map(({label, name, values}) => <label key={name}>{label}
      <select name={name} required defaultValue=""><option value="" disabled>Selecciona una opción</option>
        {values.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>)}
    <fieldset className="registration-details report-location">
      <legend>Ubicación del incidente (opcional)</legend>
      <small>Usa tu ubicación si estás en el sector del incidente. Solo se guarda un área aproximada y queda fuera del mapa público.</small>
      <div className="review-actions">
        <button type="button" className="button secondary" onClick={addLocation} disabled={locating}>{locating ? "Buscando…" : "Agregar mi ubicación"}</button>
        {position && <button type="button" className="text-button" onClick={() => {setPosition(""); setLocationNote("Ubicación retirada.");}}>Retirar ubicación</button>}
      </div>
      {locationNote && <small role="status">{locationNote}</small>}
    </fieldset>
    <label className="check"><input type="checkbox" name="demo" required /> Entiendo que este reporte pertenece a la versión piloto.</label>
    {state.message && <p role="alert" className="notice">{state.message}</p>}
    <button className="button" disabled={pending || locating}>{pending ? "Guardando…" : "Enviar reporte"}</button>
  </form>;
}
