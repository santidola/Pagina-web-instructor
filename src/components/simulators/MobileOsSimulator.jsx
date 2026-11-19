/**
 * Single Responsibility Principle (SRP) & Liskov Substitution Principle (LSP):
 * Interactive Smartphone & Memory (RAM vs Storage) simulator for Session 1.
 */
import React, { useState, useEffect } from 'react';
import { INITIAL_MOBILE_SETTINGS } from '../../data/simulatorsData';

export function MobileOsSimulator() {
  const [clockText, setClockText] = useState('08:00');
  const [alarmTime, setAlarmTime] = useState('07:00');
  const [alarmStatus, setAlarmStatus] = useState({
    type: 'muted',
    message: 'Selecciona la hora y presiona "Activar".'
  });
  const [settings, setSettings] = useState(INITIAL_MOBILE_SETTINGS);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClockText(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSetAlarm = () => {
    if (!alarmTime) {
      setAlarmStatus({ type: 'error', message: '⚠️ Por favor selecciona una hora.' });
      return;
    }
    setAlarmStatus({
      type: 'success',
      message: `✅ ¡Alarma activada para las ${alarmTime}! Sonará con el tono predeterminado.`
    });
  };

  const handleToggleSetting = (id) => {
    setSettings((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextEnabled = !item.enabled;
        setToastMessage(`${item.featureName} ${nextEnabled ? 'ACTIVADO(A) 🟢' : 'DESACTIVADO(A) ⚪'}`);
        return { ...item, enabled: nextEnabled };
      })
    );
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(''), 2500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  return (
    <div className="card card-accent-top" style={{ marginTop: '24px' }}>
      <h3 style={{ color: 'var(--sena-green-dark)', marginBottom: '8px' }}>
        📱 Laboratorio en Vivo: Dispositivo Móvil, RAM vs Almacenamiento y Ajustes
      </h3>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Familiarízate con las partes del smartphone, programa tu alarma de clase y comprende la analogía clave de la
        memoria:
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        <div style={{ border: '2px solid #39A900', background: '#f0fdf4', padding: '18px', borderRadius: '10px' }}>
          <h4 style={{ color: '#166534', marginBottom: '6px' }}>🧠 Memoria RAM: "La Mesa de Trabajo"</h4>
          <p style={{ fontSize: '0.85rem', color: '#374151' }}>
            Memoria temporal y rápida. Sostiene las aplicaciones que tienes abiertas en este instante. Al reiniciar el
            teléfono, se limpia sola.
          </p>
        </div>
        <div style={{ border: '2px solid #f59e0b', background: '#fffbeb', padding: '18px', borderRadius: '10px' }}>
          <h4 style={{ color: '#92400e', marginBottom: '6px' }}>📦 Almacenamiento: "El Armario o Bodega"</h4>
          <p style={{ fontSize: '0.85rem', color: '#374151' }}>
            Memoria permanente. Guarda tus fotos, videos y audios de WhatsApp. Si se llena, el celular se congela y no
            puede trabajar.
          </p>
        </div>
      </div>

      <div className="mobile-simulator">
        <div className="mobile-screen">
          <div className="mobile-status-bar">
            <span>{clockText}</span>
            <span>📶 4G · 🔋 92%</span>
          </div>

          <div className="mobile-content">
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Mis Aplicaciones Cotidianas
            </div>

            <div className="mobile-app-grid">
              <div className="mobile-app-icon">
                <span className="icon-emoji">⏰</span>
                <span>Reloj</span>
              </div>
              <div className="mobile-app-icon">
                <span className="icon-emoji">⚙️</span>
                <span>Ajustes</span>
              </div>
              <div className="mobile-app-icon">
                <span className="icon-emoji">📞</span>
                <span>Contactos</span>
              </div>
            </div>

            <div className="mobile-widget-box">
              <strong style={{ fontSize: '0.82rem', color: '#334155', display: 'block', marginBottom: '6px' }}>
                ⚙️ Ajustes Rápidos en Vivo
              </strong>
              {settings.map((item) => (
                <div key={item.id} className="mobile-toggle-item">
                  <span>{item.label}</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={() => handleToggleSetting(item.id)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              ))}
              {toastMessage && (
                <div
                  style={{
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    color: 'var(--sena-green-dark)',
                    marginTop: '8px',
                    textAlign: 'center'
                  }}
                >
                  {toastMessage}
                </div>
              )}
            </div>

            <div className="mobile-widget-box" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
              <strong style={{ fontSize: '0.82rem', color: '#166534', display: 'block', marginBottom: '6px' }}>
                ⏰ Tarea Práctica: Programar Alarma de Clase
              </strong>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                <input
                  type="time"
                  value={alarmTime}
                  onChange={(e) => setAlarmTime(e.target.value)}
                  style={{
                    padding: '6px 8px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    flex: 1
                  }}
                />
                <button
                  type="button"
                  onClick={handleSetAlarm}
                  className="btn btn-primary"
                  style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                >
                  Activar
                </button>
              </div>
              <div
                style={{
                  fontSize: '0.78rem',
                  fontWeight: alarmStatus.type === 'success' ? 700 : 400,
                  color:
                    alarmStatus.type === 'error'
                      ? '#dc2626'
                      : alarmStatus.type === 'success'
                      ? 'var(--sena-green-dark)'
                      : '#475569'
                }}
              >
                {alarmStatus.message}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
