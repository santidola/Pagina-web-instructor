/**
 * Single Responsibility Principle (SRP) & Liskov Substitution Principle (LSP):
 * Interactive Personal Finance Spreadsheet Simulator (Official SENA Model) for Session 3.
 */
import React, { useState, useMemo } from 'react';
import { INITIAL_SENA_EXPENSES, INITIAL_SENA_SALARY } from '../../data/simulatorsData';

export function ExcelBudgetSimulator() {
  const [expenses, setExpenses] = useState(INITIAL_SENA_EXPENSES);
  const [salary, setSalary] = useState(INITIAL_SENA_SALARY);
  const [activeFormula, setActiveFormula] = useState('=F2 - B7 [Sueldo Recibido - Total Gastos]');

  const handleExpenseChange = (id, rawValue) => {
    const numeric = parseFloat(rawValue) || 0;
    setExpenses((prev) => prev.map((item) => (item.id === id ? { ...item, amount: numeric } : item)));
  };

  const { totalExpenses, availableBalance, badgeConfig } = useMemo(() => {
    const sum = expenses.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
    const net = (Number(salary) || 0) - sum;

    let badge = {
      className: 'badge badge-green',
      style: {},
      text: '🟢 Superávit (Saldo disponible para ahorro)'
    };

    if (net === 0) {
      badge = {
        className: 'badge badge-outline',
        style: {},
        text: '⚪ Equilibrio exacto (Ingresos = Gastos)'
      };
    } else if (net < 0) {
      badge = {
        className: 'badge',
        style: { background: '#dc2626', color: '#fff' },
        text: '🔴 Déficit (Gastas más de lo que ganas)'
      };
    }

    return { totalExpenses: sum, availableBalance: net, badgeConfig: badge };
  }, [expenses, salary]);

  return (
    <div className="card card-accent-top" style={{ marginTop: '24px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '8px'
        }}
      >
        <h3
          style={{
            fontSize: '1.15rem',
            color: 'var(--sena-green-dark)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          📊 Modelo Oficial SENA: Hoja1 - Presupuesto de Gastos Adicionales
        </h3>
        <span className={badgeConfig.className} style={badgeConfig.style}>
          {badgeConfig.text}
        </span>
      </div>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
        Recreación del ejercicio oficial del taller. Modifica cualquier gasto (¡prueba cambiando el{' '}
        <strong>Gym a $45.000</strong>!) y observa cómo la fórmula <code>=SUMA(B2:B6)</code> y el Saldo{' '}
        <code>=F2-F3</code> se recalculan en vivo:
      </p>

      <div className="excel-sim">
        <div className="excel-header-bar">
          <span>📗 Hoja1 — Presupuesto de Gastos Adicionales (SENA Finanzas Personales)</span>
          <span>=SUMA(B2:B6) y =F2-F3</span>
        </div>
        <div className="excel-formula-bar">
          <span className="excel-fx-icon">fx</span>
          <span>{activeFormula}</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="excel-grid">
            <thead>
              <tr>
                <th className="row-num">#</th>
                <th style={{ width: '32%', textAlign: 'left', paddingLeft: '10px' }}>Columna A (Concepto Gasto)</th>
                <th style={{ width: '20%', textAlign: 'right', paddingRight: '10px' }}>Columna B (Monto $)</th>
                <th style={{ width: '28%', textAlign: 'left', paddingLeft: '10px' }}>Columna E (Rubro)</th>
                <th style={{ width: '20%', textAlign: 'right', paddingRight: '10px' }}>Columna F (Total $)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: '#f1f5f9', fontWeight: 700 }}>
                <td className="row-num">1</td>
                <td style={{ color: '#047857', fontWeight: 800, paddingLeft: '10px' }}>Gastos Adicionales</td>
                <td style={{ textAlign: 'right', paddingRight: '10px' }}>(Fórmula)</td>
                <td style={{ color: '#1e3a8a', fontWeight: 800, paddingLeft: '10px' }}>Pago 31 de diciembre</td>
                <td style={{ textAlign: 'right', color: '#1e3a8a', paddingRight: '10px' }}>Total</td>
              </tr>

              {expenses.map((item, idx) => {
                const rowNumber = idx + 2;
                return (
                  <tr key={item.id}>
                    <td className="row-num">{rowNumber}</td>
                    <td style={{ paddingLeft: '10px' }}>{item.concept}</td>
                    <td>
                      <input
                        type="number"
                        className="excel-input"
                        value={item.amount}
                        onFocus={() => setActiveFormula(`=VALOR_CELDA(${item.cell}) [Columna Gasto: ${item.concept}]`)}
                        onChange={(e) => handleExpenseChange(item.id, e.target.value)}
                      />
                    </td>
                    {rowNumber === 2 && (
                      <>
                        <td style={{ fontWeight: 700, paddingLeft: '10px' }}>Sueldo Recibido (F2)</td>
                        <td>
                          <input
                            type="number"
                            className="excel-input"
                            style={{ textAlign: 'right', fontWeight: 700, color: '#15803d' }}
                            value={salary}
                            onFocus={() => setActiveFormula('=VALOR_CELDA(F2) [Sueldo Recibido]')}
                            onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
                          />
                        </td>
                      </>
                    )}
                    {rowNumber === 3 && (
                      <>
                        <td style={{ fontWeight: 700, color: '#b91c1c', paddingLeft: '10px' }}>
                          (-) Total Gastos (F3 = B7)
                        </td>
                        <td className="excel-result-cell" style={{ color: '#b91c1c', fontWeight: 700 }}>
                          $ {totalExpenses.toLocaleString('es-CO')}
                        </td>
                      </>
                    )}
                    {rowNumber === 4 && (
                      <>
                        <td
                          style={{
                            background: '#fef08a',
                            fontWeight: 800,
                            color: '#854d0e',
                            paddingLeft: '10px'
                          }}
                        >
                          💰 Saldo Disponible (F4 = F2-F3)
                        </td>
                        <td
                          className="excel-result-cell"
                          style={{
                            background: '#fef08a',
                            fontWeight: 800,
                            color: availableBalance >= 0 ? '#166534' : '#b91c1c',
                            fontSize: '1.05rem'
                          }}
                        >
                          $ {availableBalance.toLocaleString('es-CO')}
                        </td>
                      </>
                    )}
                    {rowNumber > 4 && (
                      <>
                        <td></td>
                        <td></td>
                      </>
                    )}
                  </tr>
                );
              })}

              <tr style={{ background: '#ecfdf5', borderTop: '2px solid #86efac' }}>
                <td className="row-num">7</td>
                <td style={{ fontWeight: 800, color: '#166534', paddingLeft: '10px' }}>
                  TOTAL GASTOS (=SUMA(B2:B6))
                </td>
                <td className="excel-result-cell" style={{ color: '#166534', fontWeight: 800 }}>
                  $ {totalExpenses.toLocaleString('es-CO')}
                </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
