import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Barcode,
  Bell,
  Boxes,
  Building2,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Download,
  FileBox,
  FileDown,
  FileText,
  History,
  LayoutDashboard,
  LogIn,
  Menu,
  Minus,
  Package,
  PackageCheck,
  Plus,
  ReceiptText,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Trash2,
  TrendingUp,
  TriangleAlert,
  User,
  Users,
  Warehouse,
  X,
  type LucideIcon,
} from "lucide-react";

type Role = "Administrador General" | "Bodega y Logística" | "Administrativo / Finanzas" | "Supervisor de Obras";
type Page =
  | "dashboard"
  | "ingreso"
  | "egreso"
  | "scanner"
  | "ajustes"
  | "inventario"
  | "catalogo"
  | "entidades"
  | "pmp"
  | "consulta"
  | "costos"
  | "cardex";

const roles: { name: Role; detail: string; icon: LucideIcon }[] = [
  { name: "Administrador General", detail: "Acceso completo y configuración", icon: ShieldCheck },
  { name: "Bodega y Logística", detail: "Inventario, ingresos y egresos", icon: Warehouse },
  { name: "Administrativo / Finanzas", detail: "Costos, proveedores y reportes", icon: ReceiptText },
  { name: "Supervisor de Obras", detail: "Consultas y costos, solo lectura", icon: ClipboardCheck },
];

const navItems: { page: Page; label: string; icon: LucideIcon; roles?: Role[] }[] = [
  { page: "dashboard", label: "Resumen general", icon: LayoutDashboard, roles: ["Administrador General", "Administrativo / Finanzas"] },
  { page: "ingreso", label: "Ingreso de materiales", icon: ArrowDownRight, roles: ["Administrador General", "Bodega y Logística"] },
  { page: "egreso", label: "Egreso a obras", icon: ArrowUpRight, roles: ["Administrador General", "Bodega y Logística"] },
  { page: "scanner", label: "Escáner QR / barras", icon: Barcode, roles: ["Administrador General", "Bodega y Logística"] },
  { page: "ajustes", label: "Mermas y devoluciones", icon: RotateCcw, roles: ["Administrador General", "Bodega y Logística"] },
  { page: "inventario", label: "Inventario físico", icon: ClipboardCheck, roles: ["Administrador General", "Bodega y Logística"] },
  { page: "catalogo", label: "Catálogo de artículos", icon: Boxes, roles: ["Administrador General", "Bodega y Logística"] },
  { page: "entidades", label: "Proveedores y mandantes", icon: Users, roles: ["Administrador General", "Administrativo / Finanzas"] },
  { page: "pmp", label: "Valorización PMP", icon: TrendingUp, roles: ["Administrador General", "Administrativo / Finanzas"] },
  { page: "consulta", label: "Consulta de stock", icon: Search },
  { page: "costos", label: "Costos por obra", icon: BarChart3, roles: ["Administrador General", "Administrativo / Finanzas", "Supervisor de Obras"] },
  { page: "cardex", label: "Cardex de movimientos", icon: History, roles: ["Administrador General"] },
];

const money = (value: number) => `$${value.toLocaleString("es-CL")}`;

function Button({
  children,
  variant = "primary",
  icon: Icon,
  onClick,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  icon?: LucideIcon;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} type={type} disabled={disabled}>
      {Icon && <Icon size={17} />}
      {children}
    </button>
  );
}

function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "success" | "warning" | "danger" | "info" | "neutral" }) {
  return <span className={`badge badge-${tone}`}><span className="badge-dot" />{children}</span>;
}

function Field({
  label,
  placeholder,
  value,
  required,
  hint,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  hint?: string;
  type?: string;
}) {
  return (
    <label className="field">
      <span>{label}{required && <b> *</b>}</span>
      <input type={type} placeholder={placeholder} defaultValue={value} />
      {hint && <small>{hint}</small>}
    </label>
  );
}

function SelectField({ label, children, required }: { label: string; children: ReactNode; required?: boolean }) {
  return (
    <label className="field">
      <span>{label}{required && <b> *</b>}</span>
      <div className="select-wrap">
        <select>{children}</select>
        <ChevronDown size={16} />
      </div>
    </label>
  );
}

function PageHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description: string; actions?: ReactNode }) {
  return (
    <div className="page-header">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{children}</section>;
}

function TableToolbar({ title, count, filter = "Todas las categorías" }: { title?: string; count?: string; filter?: string }) {
  return (
    <div className="table-toolbar">
      <div>{title && <h2>{title}</h2>}{count && <span className="count-pill">{count}</span>}</div>
      <div className="toolbar-actions">
        <div className="mini-search"><Search size={16} /><input placeholder="Buscar..." /></div>
        <button className="filter-btn"><SlidersHorizontal size={16} />{filter}<ChevronDown size={14} /></button>
      </div>
    </div>
  );
}

function Pagination({ text = "Mostrando 1–5 de 18" }: { text?: string }) {
  return (
    <div className="pagination">
      <span>{text}</span>
      <div><button aria-label="Anterior"><ChevronLeft size={16} /></button><button className="active">1</button><button>2</button><button>3</button><button aria-label="Siguiente"><ChevronRight size={16} /></button></div>
    </div>
  );
}

function Login({ onLogin }: { onLogin: (role: Role) => void }) {
  const [selected, setSelected] = useState<Role>("Administrador General");
  return (
    <main className="login-shell">
      <section className="login-brand">
        <div className="brand-mark large"><span>F</span></div>
        <div className="login-copy">
          <span className="login-kicker">FYAG · Gestión operacional</span>
          <h1>Control total de tu inventario, desde bodega hasta la obra.</h1>
          <p>Una plataforma diseñada para que cada equipo, material y movimiento esté siempre bajo control.</p>
        </div>
        <div className="login-stats">
          <div><strong>99,8%</strong><span>Trazabilidad</span></div>
          <div><strong>+1.200</strong><span>Artículos</span></div>
          <div><strong>24/7</strong><span>Disponibilidad</span></div>
        </div>
        <div className="warehouse-art" aria-hidden="true"><Boxes size={190} strokeWidth={1} /></div>
      </section>
      <section className="login-panel">
        <div className="login-form">
          <div className="mobile-logo"><div className="brand-mark"><span>F</span></div><b>Proyecto Alpha</b></div>
          <span className="eyebrow">Bienvenido a Proyecto Alpha</span>
          <h2>Inicia sesión</h2>
          <p>Selecciona tu perfil para acceder al entorno de demostración.</p>
          <div className="role-list">
            {roles.map(({ name, detail, icon: Icon }) => (
              <button key={name} className={`role-option ${selected === name ? "selected" : ""}`} onClick={() => setSelected(name)}>
                <span className="role-icon"><Icon size={20} /></span>
                <span><strong>{name}</strong><small>{detail}</small></span>
                <span className="radio">{selected === name && <span />}</span>
              </button>
            ))}
          </div>
          <Button icon={LogIn} onClick={() => onLogin(selected)}>Ingresar al sistema</Button>
          <p className="login-help">¿Necesitas ayuda? <button>Contactar a soporte FYAG</button></p>
        </div>
      </section>
    </main>
  );
}

function Dashboard() {
  const kpis = [
    { label: "Valor del inventario", value: "$184.620.450", trend: "+8,4%", detail: "vs. mes anterior", icon: Package, tone: "blue" },
    { label: "Artículos críticos", value: "12", trend: "3 nuevos", detail: "requieren atención", icon: TriangleAlert, tone: "red" },
    { label: "Egresos del mes", value: "$28.450.900", trend: "+12,1%", detail: "vs. mes anterior", icon: ArrowUpRight, tone: "amber" },
    { label: "Obras activas", value: "8", trend: "2 próximas", detail: "a finalizar", icon: Building2, tone: "green" },
  ];
  return (
    <>
      <PageHeader eyebrow="Resumen ejecutivo" title="Buenos días, Daniela" description="Así está operando FYAG hoy, martes 24 de junio." actions={<><Button variant="secondary" icon={Download}>Exportar</Button><Button icon={Plus}>Nuevo movimiento</Button></>} />
      <div className="kpi-grid">
        {kpis.map((k) => {
          const Icon = k.icon;
          return <Card key={k.label} className="kpi-card"><div className={`kpi-icon ${k.tone}`}><Icon size={21} /></div><span>{k.label}</span><strong>{k.value}</strong><div><b>{k.trend}</b> {k.detail}</div></Card>;
        })}
      </div>
      <div className="dashboard-grid">
        <Card className="critical-table">
          <TableToolbar title="Stock bajo umbral crítico" count="12 artículos" />
          <div className="table-scroll">
            <table>
              <thead><tr><th>Artículo</th><th>Categoría</th><th>Ubicación</th><th>Stock</th><th>Crítico</th><th>Estado</th></tr></thead>
              <tbody>
                <tr><td><div className="item-cell"><span className="item-thumb"><Package size={18} /></span><div><b>Tubería cobre 3/8"</b><small>TUB-COB-038</small></div></div></td><td>Tuberías</td><td>A-02-14</td><td><strong>4 un.</strong></td><td>10 un.</td><td><Badge tone="danger">Crítico</Badge></td></tr>
                <tr><td><div className="item-cell"><span className="item-thumb"><Package size={18} /></span><div><b>Gas refrigerante R410A</b><small>REF-R410A-11</small></div></div></td><td>Refrigerantes</td><td>B-01-03</td><td><strong>2 cil.</strong></td><td>5 cil.</td><td><Badge tone="danger">Crítico</Badge></td></tr>
                <tr><td><div className="item-cell"><span className="item-thumb"><Package size={18} /></span><div><b>Aislante elastomérico 1/2"</b><small>AIS-ELA-012</small></div></div></td><td>Aislación</td><td>A-04-08</td><td><strong>8 un.</strong></td><td>12 un.</td><td><Badge tone="warning">Mínimo</Badge></td></tr>
                <tr><td><div className="item-cell"><span className="item-thumb"><Package size={18} /></span><div><b>Contactor trifásico 25A</b><small>ELE-CON-025</small></div></div></td><td>Eléctricos</td><td>C-02-06</td><td><strong>3 un.</strong></td><td>6 un.</td><td><Badge tone="warning">Mínimo</Badge></td></tr>
              </tbody>
            </table>
          </div>
          <div className="card-footer"><button>Ver todos los artículos <ChevronRight size={15} /></button><div><button><FileText size={15} />PDF</button><button><FileDown size={15} />Excel</button></div></div>
        </Card>
        <Card className="activity-card">
          <div className="section-heading"><div><h2>Actividad reciente</h2><p>Últimos movimientos</p></div><button>Ver todo</button></div>
          <div className="activity-list">
            <div><span className="activity-icon in"><ArrowDownRight size={16} /></span><p><b>Ingreso confirmado</b><span>Factura N° 4832 · ColdTech</span><small>Hace 18 min</small></p><strong>+$2.840.500</strong></div>
            <div><span className="activity-icon out"><ArrowUpRight size={16} /></span><p><b>Egreso a obra</b><span>Clínica Santa María</span><small>Hace 46 min</small></p><strong>−$865.200</strong></div>
            <div><span className="activity-icon count"><ClipboardCheck size={16} /></span><p><b>Conteo actualizado</b><span>Sector B · Refrigerantes</span><small>Hace 2 h</small></p></div>
            <div><span className="activity-icon return"><RotateCcw size={16} /></span><p><b>Devolución de obra</b><span>Edificio Manquehue</span><small>Ayer, 17:42</small></p><strong>+$185.900</strong></div>
          </div>
        </Card>
      </div>
    </>
  );
}

function Ingreso() {
  return (
    <>
      <PageHeader eyebrow="Movimientos / Nuevo ingreso" title="Ingreso de materiales" description="Registra documentos de compra y actualiza el inventario." actions={<Button variant="secondary">Guardar borrador</Button>} />
      <Card className="form-card">
        <div className="form-section-head"><span>1</span><div><h2>Datos del documento</h2><p>Información tributaria y del proveedor</p></div></div>
        <div className="form-grid four">
          <SelectField label="Tipo de documento" required><option>Factura electrónica</option><option>Boleta</option><option>Guía de despacho</option><option>Nota de crédito</option></SelectField>
          <Field label="Folio" value="4832" required />
          <Field label="Fecha de emisión" value="24-06-2025" required />
          <Field label="Fecha de vencimiento" value="24-07-2025" />
        </div>
        <div className="form-grid two">
          <Field label="RUT proveedor" value="76.345.890-2" required hint="RUT válido" />
          <Field label="Razón social" value="ColdTech SpA" required hint="Autocompletado desde proveedores" />
        </div>
      </Card>
      <Card className="form-card items-form">
        <div className="form-section-head"><span>2</span><div><h2>Detalle de materiales</h2><p>Agrega artículos, cantidades y descuentos</p></div><Button variant="secondary" icon={Plus}>Agregar ítem</Button></div>
        <div className="table-scroll">
          <table>
            <thead><tr><th>Artículo</th><th>Cant.</th><th>Precio unit.</th><th>Dcto. 1</th><th>Dcto. 2</th><th>Dcto. 3</th><th>IVA</th><th>Total</th><th /></tr></thead>
            <tbody>
              <tr><td><div className="table-input wide"><b>Gas refrigerante R410A 11,3 kg</b><small>REF-R410A-11</small></div></td><td><div className="table-input">8</div></td><td><div className="table-input">$185.000</div></td><td><div className="table-input">5%</div></td><td><div className="table-input">2%</div></td><td><div className="table-input">—</div></td><td>19%</td><td><b>$1.640.674</b></td><td><button className="icon-btn danger"><Trash2 size={16} /></button></td></tr>
              <tr><td><div className="table-input wide"><b>Tubería cobre 3/8" rollo 15 m</b><small>TUB-COB-038</small></div></td><td><div className="table-input">12</div></td><td><div className="table-input">$72.500</div></td><td><div className="table-input">3%</div></td><td><div className="table-input">—</div></td><td><div className="table-input">—</div></td><td>19%</td><td><b>$1.004.109</b></td><td><button className="icon-btn danger"><Trash2 size={16} /></button></td></tr>
            </tbody>
          </table>
        </div>
        <button className="add-row"><Plus size={16} />Agregar otra línea</button>
        <div className="totals-wrap">
          <label className="notes"><span>Observaciones</span><textarea placeholder="Información adicional del ingreso..." /></label>
          <div className="totals">
            <div><span>Subtotal neto</span><b>$2.222.507</b></div><div><span>Descuentos</span><b>−$127.493</b></div><div><span>IVA (19%)</span><b>$422.276</b></div><div className="grand-total"><span>Total documento</span><strong>$2.644.783</strong></div>
          </div>
        </div>
        <div className="submit-bar"><span><Check size={16} />La información tributaria fue validada</span><Button icon={PackageCheck}>Confirmar ingreso</Button></div>
      </Card>
    </>
  );
}

function Egreso({ toast }: { toast: (text: string) => void }) {
  const [blocked, setBlocked] = useState(true);
  return (
    <>
      <PageHeader eyebrow="Movimientos / Nuevo egreso" title="Egreso a obras" description="Prepara un vale de salida y asigna materiales a una obra." actions={<Button variant="secondary" icon={History}>Ver vales</Button>} />
      <Card className="form-card">
        <div className="form-section-head"><span>1</span><div><h2>Destino del egreso</h2><p>Todos los campos son obligatorios</p></div></div>
        <div className="form-grid three">
          <SelectField label="Cliente / Mandante" required><option>Inmobiliaria Norte Grande SpA</option></SelectField>
          <SelectField label="Obra" required><option>Edificio Parque Titanium</option></SelectField>
          <SelectField label="Técnico responsable" required><option>Juan Pablo Rojas</option></SelectField>
        </div>
        <div className="destination"><Building2 size={22} /><div><b>Edificio Parque Titanium</b><span>Av. Andrés Bello 2711, Las Condes · OT-2025-018</span></div><Badge tone="success">Obra activa</Badge></div>
      </Card>
      <Card className="form-card">
        <div className="form-section-head"><span>2</span><div><h2>Materiales solicitados</h2><p>El stock se valida en tiempo real</p></div><Button variant="secondary" icon={Barcode}>Escanear</Button></div>
        <div className="table-scroll">
          <table>
            <thead><tr><th>Artículo</th><th>Ubicación</th><th>Disponible</th><th>Solicitado</th><th>Estado</th><th /></tr></thead>
            <tbody>
              <tr><td><div className="item-cell"><span className="item-thumb"><Package size={18} /></span><div><b>Tubería cobre 3/8"</b><small>TUB-COB-038</small></div></div></td><td>A-02-14</td><td><b>4 un.</b></td><td><div className={`qty-input ${blocked ? "invalid" : ""}`}><button onClick={() => setBlocked(false)}><Minus size={13} /></button><b>{blocked ? "6" : "4"}</b><button><Plus size={13} /></button></div></td><td>{blocked ? <Badge tone="danger">Stock insuficiente</Badge> : <Badge tone="success">Disponible</Badge>}</td><td><button className="icon-btn"><X size={16} /></button></td></tr>
              <tr><td><div className="item-cell"><span className="item-thumb"><Package size={18} /></span><div><b>Soporte condensadora 500 mm</b><small>SOP-CON-500</small></div></div></td><td>D-03-05</td><td><b>24 un.</b></td><td><div className="qty-input"><button><Minus size={13} /></button><b>4</b><button><Plus size={13} /></button></div></td><td><Badge tone="success">Disponible</Badge></td><td><button className="icon-btn"><X size={16} /></button></td></tr>
            </tbody>
          </table>
        </div>
        {blocked && <div className="alert danger-alert"><AlertTriangle size={19} /><div><b>No puedes confirmar este egreso</b><span>La cantidad solicitada de Tubería cobre 3/8" supera el stock disponible. Reduce la cantidad para continuar.</span></div></div>}
        <div className="signature-row"><div><span>Firma digital del responsable</span><div className="signature">Juan P. Rojas</div><small>Firmado el 24 jun 2025 · 10:42</small></div><div className="vale-total"><span>VAL-002847</span><strong>$486.320</strong><small>Valor total PMP</small></div></div>
        <div className="submit-bar"><span>{blocked ? "Revisa las cantidades solicitadas" : "Todo listo para emitir el vale"}</span><Button disabled={blocked} icon={FileText} onClick={() => toast("Vale de salida emitido correctamente")}>Emitir vale de salida</Button></div>
      </Card>
    </>
  );
}

function Scanner({ onBack }: { onBack: () => void }) {
  const [scanned, setScanned] = useState(false);
  return (
    <div className={`scanner-page ${scanned ? "scanned" : ""}`}>
      <div className="scanner-top"><button onClick={onBack}><ArrowLeft size={22} /></button><div><b>Escáner</b><span>QR / Código de barras</span></div><button><Settings size={21} /></button></div>
      <div className="camera-view">
        <div className="camera-grain" />
        <div className="scan-instruction"><Barcode size={19} /><span>{scanned ? "Código detectado" : "Centra el código dentro del recuadro"}</span></div>
        <div className="scan-frame"><i /><i /><i /><i />{!scanned && <span className="scan-line" />}</div>
        {!scanned && <button className="simulate" onClick={() => setScanned(true)}><Camera size={18} />Simular lectura</button>}
      </div>
      {scanned && <div className="scan-result">
        <div className="result-handle" />
        <div className="result-success"><span><Check size={20} /></span><div><b>Artículo encontrado</b><small>Lectura exitosa</small></div><Badge tone="success">Stock OK</Badge></div>
        <div className="scanned-product"><div className="product-visual"><Package size={42} /></div><div><small>TUB-COB-038</small><h2>Tubería cobre 3/8"</h2><p>Rollo de 15 metros · Cobre tipo L</p></div></div>
        <div className="stock-summary"><div><span>Stock físico</span><strong>48 <small>un.</small></strong></div><div><span>Comprometido</span><strong>12 <small>un.</small></strong></div><div className="available"><span>Disponible</span><strong>36 <small>un.</small></strong></div></div>
        <div className="result-meta"><div><span>Ubicación</span><b>A-02-14</b></div><div><span>Costo PMP</span><b>$68.450</b></div><div><span>Último movimiento</span><b>Hoy, 09:32</b></div></div>
        <div className="scan-actions"><Button variant="secondary" onClick={() => setScanned(false)}>Escanear otro</Button><Button icon={ArrowUpRight}>Crear movimiento</Button></div>
      </div>}
    </div>
  );
}

function Ajustes() {
  const [type, setType] = useState("Merma");
  return (
    <>
      <PageHeader eyebrow="Movimientos / Ajustes" title="Mermas, devoluciones y uso interno" description="Registra salidas extraordinarias manteniendo la trazabilidad." />
      <div className="segmented">{["Merma", "Devolución", "Uso interno"].map((t) => <button key={t} className={type === t ? "active" : ""} onClick={() => setType(t)}>{t === "Merma" ? <Trash2 size={17} /> : t === "Devolución" ? <RotateCcw size={17} /> : <Settings size={17} />}{t}</button>)}</div>
      <Card className="form-card">
        <div className="adjustment-banner"><span className={type === "Merma" ? "red" : type === "Devolución" ? "green" : "blue"}>{type === "Merma" ? <Trash2 /> : type === "Devolución" ? <RotateCcw /> : <Settings />}</span><div><h2>Registrar {type.toLowerCase()}</h2><p>{type === "Merma" ? "Descuenta existencias dañadas, vencidas o perdidas." : type === "Devolución" ? "Reintegra al inventario materiales provenientes de una obra." : "Asigna materiales para labores internas de FYAG."}</p></div></div>
        <div className="form-grid two">
          <SelectField label="Artículo" required><option>Seleccionar artículo...</option></SelectField>
          <Field label="Cantidad" placeholder="0" required />
          {type === "Merma" && <SelectField label="Motivo de la merma" required><option>Material dañado</option><option>Vencimiento</option><option>Pérdida</option></SelectField>}
          {type === "Devolución" && <SelectField label="Obra de origen" required><option>Edificio Parque Titanium</option></SelectField>}
          {type === "Uso interno" && <SelectField label="Centro de costo" required><option>Mantención bodega central</option></SelectField>}
          <Field label="Responsable" value="Daniela González" required />
        </div>
        <label className="notes full"><span>Justificación <b>*</b></span><textarea placeholder="Describe el motivo y antecedentes del movimiento..." /></label>
        <div className="attachment"><FileText size={22} /><div><b>Adjuntar respaldo</b><span>PDF, JPG o PNG · Máx. 10 MB</span></div><Button variant="secondary">Seleccionar archivo</Button></div>
        <div className="submit-bar"><span>Este movimiento quedará registrado en el Cardex</span><Button>Registrar {type.toLowerCase()}</Button></div>
      </Card>
    </>
  );
}

function Inventario() {
  return (
    <>
      <PageHeader eyebrow="Control de inventario" title="Inventario físico" description="Conteo por sector y conciliación de diferencias." actions={<><Button variant="secondary" icon={FileText}>PDF</Button><Button variant="secondary" icon={FileDown}>Excel</Button><Button icon={Plus}>Nuevo conteo</Button></>} />
      <div className="summary-strip"><div><span>Sesión activa</span><b>INV-2025-006</b></div><div><span>Sector</span><b>A · Tuberías y aislación</b></div><div><span>Avance</span><b>68% · 82 de 120</b></div><div className="progress"><span style={{ width: "68%" }} /></div></div>
      <Card>
        <TableToolbar title="Conteo del sector A" count="120 artículos" filter="Todas las diferencias" />
        <div className="table-scroll">
          <table>
            <thead><tr><th>Código / Artículo</th><th>Ubicación</th><th>Stock sistema</th><th>Conteo físico</th><th>Diferencia</th><th>Valorización</th><th>Estado</th></tr></thead>
            <tbody>
              <tr><td><b>TUB-COB-038</b><small className="block">Tubería cobre 3/8"</small></td><td>A-02-14</td><td>48</td><td><div className="count-input">46</div></td><td><b className="negative">−2</b></td><td className="negative">−$136.900</td><td><Badge tone="danger">Diferencia</Badge></td></tr>
              <tr><td><b>AIS-ELA-012</b><small className="block">Aislante elastomérico 1/2"</small></td><td>A-04-08</td><td>8</td><td><div className="count-input">8</div></td><td><b>0</b></td><td>$0</td><td><Badge tone="success">Conciliado</Badge></td></tr>
              <tr><td><b>TUB-PVC-025</b><small className="block">Tubería PVC presión 25 mm</small></td><td>A-01-04</td><td>126</td><td><div className="count-input">130</div></td><td><b className="positive">+4</b></td><td className="positive">+$18.400</td><td><Badge tone="warning">Revisar</Badge></td></tr>
              <tr><td><b>AIS-CIN-050</b><small className="block">Cinta aislante aluminio 50 mm</small></td><td>A-05-02</td><td>32</td><td><div className="count-input empty">Ingresar</div></td><td>—</td><td>—</td><td><Badge>Pendiente</Badge></td></tr>
            </tbody>
          </table>
        </div>
        <Pagination text="Mostrando 1–4 de 120 artículos" />
      </Card>
      <div className="inventory-bottom"><Card><span>Diferencia neta valorizada</span><strong className="negative">−$118.500</strong><small>3 artículos con diferencia</small></Card><Button icon={Check}>Finalizar y conciliar conteo</Button></div>
    </>
  );
}

function Catalogo() {
  return (
    <>
      <PageHeader eyebrow="Maestros" title="Catálogo de artículos" description="Administra productos, ubicaciones y umbrales de stock." actions={<Button icon={Plus}>Nuevo artículo</Button>} />
      <div className="catalog-layout">
        <Card className="catalog-table">
          <TableToolbar count="1.248 artículos" />
          <div className="table-scroll"><table><thead><tr><th>Artículo</th><th>Categoría</th><th>Ubicación</th><th>Stock</th><th>Estado</th></tr></thead><tbody>
            <tr><td><div className="item-cell"><span className="item-thumb"><Package /></span><div><b>Unidad Split Muro 12.000 BTU</b><small>EQU-SPL-120</small></div></div></td><td>Equipos</td><td>E-01-02</td><td><b>18 un.</b></td><td><Badge tone="success">Óptimo</Badge></td></tr>
            <tr className="selected-row"><td><div className="item-cell"><span className="item-thumb"><Package /></span><div><b>Tubería cobre 3/8"</b><small>TUB-COB-038</small></div></div></td><td>Tuberías</td><td>A-02-14</td><td><b>4 un.</b></td><td><Badge tone="danger">Crítico</Badge></td></tr>
            <tr><td><div className="item-cell"><span className="item-thumb"><Package /></span><div><b>Gas refrigerante R410A</b><small>REF-R410A-11</small></div></div></td><td>Refrigerantes</td><td>B-01-03</td><td><b>22 cil.</b></td><td><Badge tone="success">Óptimo</Badge></td></tr>
            <tr><td><div className="item-cell"><span className="item-thumb"><Package /></span><div><b>Aislante elastomérico 1/2"</b><small>AIS-ELA-012</small></div></div></td><td>Aislación</td><td>A-04-08</td><td><b>8 un.</b></td><td><Badge tone="warning">Mínimo</Badge></td></tr>
          </tbody></table></div><Pagination />
        </Card>
        <Card className="article-panel">
          <div className="panel-head"><div><span>Editar artículo</span><h2>Tubería cobre 3/8"</h2></div><button><X size={18} /></button></div>
          <Field label="Nombre del artículo" value={'Tubería cobre 3/8"'} required />
          <div className="form-grid two"><Field label="Código interno" value="TUB-COB-038" required /><SelectField label="Categoría"><option>Tuberías</option></SelectField></div>
          <div className="form-grid two"><SelectField label="Sector"><option>A · Tuberías</option></SelectField><Field label="Ubicación" value="A-02-14" /></div>
          <div className="thresholds"><h3>Semáforo de stock</h3><div className="form-grid two"><Field label="Stock mínimo" value="15" /><Field label="Stock crítico" value="10" /></div><div className="stock-scale"><span className="red" /><span className="amber" /><span className="green" /></div><div className="scale-labels"><span>0–10 Crítico</span><span>11–15 Mínimo</span><span>16+ Óptimo</span></div></div>
          <div className="panel-actions"><Button variant="secondary">Cancelar</Button><Button>Guardar cambios</Button></div>
        </Card>
      </div>
    </>
  );
}

function Entidades() {
  return (
    <>
      <PageHeader eyebrow="Maestros" title="Proveedores y mandantes" description="Directorio comercial y datos de facturación." actions={<Button icon={Plus}>Nueva entidad</Button>} />
      <div className="entity-tabs"><button className="active">Proveedores <span>48</span></button><button>Mandantes <span>21</span></button></div>
      <div className="entity-layout">
        <Card className="entity-list"><TableToolbar filter="Todos los estados" /><div className="entities">
          <button className="active"><span className="entity-avatar">CT</span><div><b>ColdTech SpA</b><small>76.345.890-2 · Santiago</small></div><Badge tone="success">Activo</Badge></button>
          <button><span className="entity-avatar amber">RF</span><div><b>Refrigeración Fénix Ltda.</b><small>77.120.445-8 · Quilicura</small></div><Badge tone="success">Activo</Badge></button>
          <button><span className="entity-avatar purple">IC</span><div><b>Importadora Clima Sur</b><small>96.862.110-4 · San Miguel</small></div><Badge>Inactivo</Badge></button>
          <button><span className="entity-avatar green">TM</span><div><b>TecnoMecánica Chile</b><small>78.009.321-5 · Pudahuel</small></div><Badge tone="success">Activo</Badge></button>
        </div></Card>
        <Card className="entity-detail">
          <div className="entity-hero"><span className="entity-avatar large">CT</span><div><h2>ColdTech SpA</h2><p>Importación y distribución de refrigeración</p></div><Button variant="secondary">Editar ficha</Button></div>
          <div className="detail-grid"><div><span>RUT</span><b>76.345.890-2</b></div><div><span>Giro</span><b>Venta de equipos de climatización</b></div><div><span>Dirección</span><b>Av. Marathon 2450, Macul</b></div><div><span>Condición de pago</span><b>30 días</b></div></div>
          <div className="subsection-head"><h3>Contactos</h3><button><Plus size={14} />Agregar</button></div>
          <div className="contact-list"><div><span className="contact-icon"><User /></span><p><b>Carolina Muñoz</b><span>Ejecutiva comercial</span></p><p><b>+56 9 8765 4321</b><span>carolina@coldtech.cl</span></p></div><div><span className="contact-icon"><User /></span><p><b>Felipe Sandoval</b><span>Cobranza</span></p><p><b>+56 2 2456 8890</b><span>finanzas@coldtech.cl</span></p></div></div>
          <div className="subsection-head"><h3>Datos bancarios</h3><ShieldCheck size={17} /></div>
          <div className="bank-card"><div><span>Banco</span><b>Banco de Chile</b></div><div><span>Tipo de cuenta</span><b>Cuenta corriente</b></div><div><span>N° cuenta</span><b>**** 8294</b></div><div><span>Titular</span><b>ColdTech SpA</b></div></div>
        </Card>
      </div>
    </>
  );
}

function Pmp() {
  const chart = [34, 40, 37, 48, 44, 53, 58, 55, 64, 61, 69, 72];
  return (
    <>
      <PageHeader eyebrow="Finanzas / Valorización" title="Costo promedio ponderado" description="Evolución de costos de inventario calculada por PMP." actions={<Button variant="secondary" icon={Download}>Exportar informe</Button>} />
      <div className="pmp-grid">
        <Card className="product-selector"><span>Producto seleccionado</span><div className="selected-product"><span className="item-thumb"><Package /></span><div><b>Tubería cobre 3/8"</b><small>TUB-COB-038 · Tuberías</small></div><ChevronDown /></div><div className="pmp-value"><span>Costo PMP actual</span><strong>$68.450</strong><Badge tone="warning">+4,8% este mes</Badge></div><div className="pmp-details"><div><span>Stock valorizado</span><b>$3.285.600</b></div><div><span>Unidades</span><b>48</b></div><div><span>Último costo compra</span><b>$72.500</b></div></div></Card>
        <Card className="chart-card"><div className="section-heading"><div><h2>Historial de variación</h2><p>Últimos 12 meses · CLP por unidad</p></div><select><option>12 meses</option></select></div><div className="chart"><div className="y-labels"><span>$75k</span><span>$65k</span><span>$55k</span><span>$45k</span></div><div className="bars">{chart.map((h, i) => <div key={i}><span style={{ height: `${h}%` }} /><small>{["Jul", "Ago", "Sep", "Oct", "Nov", "Dic", "Ene", "Feb", "Mar", "Abr", "May", "Jun"][i]}</small></div>)}</div></div></Card>
      </div>
      <Card><TableToolbar title="Movimientos que modificaron el PMP" count="24 movimientos" /><div className="table-scroll"><table><thead><tr><th>Fecha</th><th>Documento</th><th>Proveedor</th><th>Cantidad</th><th>Costo compra</th><th>PMP anterior</th><th>Nuevo PMP</th><th>Variación</th></tr></thead><tbody>
        <tr><td>24 jun 2025</td><td><b>FAC-4832</b></td><td>ColdTech SpA</td><td>12 un.</td><td>$72.500</td><td>$65.312</td><td><b>$68.450</b></td><td><Badge tone="warning">+4,8%</Badge></td></tr>
        <tr><td>03 jun 2025</td><td><b>FAC-4701</b></td><td>Refrigeración Fénix</td><td>20 un.</td><td>$66.900</td><td>$64.788</td><td><b>$65.312</b></td><td><Badge tone="info">+0,8%</Badge></td></tr>
      </tbody></table></div></Card>
    </>
  );
}

function Consulta() {
  return (
    <div className="stock-mobile-page">
      <div className="mobile-page-head"><span className="eyebrow">Solo lectura</span><h1>Consulta de stock</h1><p>Disponibilidad actualizada en bodega</p></div>
      <div className="mobile-stock-search"><Search /><input placeholder="Buscar por nombre o código..." /><Barcode /></div>
      <div className="recent-searches"><span>Búsquedas recientes</span><button>R410A</button><button>Tubería cobre</button><button>Split 12K</button></div>
      <h2>Resultados <span>4 artículos</span></h2>
      <div className="stock-cards">
        <article><div className="stock-card-top"><span className="item-thumb large"><Package /></span><div><small>TUB-COB-038</small><h3>Tubería cobre 3/8"</h3><p>Rollo 15 m · A-02-14</p></div><Badge tone="danger">Crítico</Badge></div><div className="stock-numbers"><div><span>Físico</span><b>48</b></div><div><span>Comprometido</span><b>44</b></div><div><span>Disponible</span><strong>4</strong></div></div></article>
        <article><div className="stock-card-top"><span className="item-thumb large"><Package /></span><div><small>TUB-COB-012</small><h3>Tubería cobre 1/2"</h3><p>Rollo 15 m · A-02-15</p></div><Badge tone="success">Óptimo</Badge></div><div className="stock-numbers"><div><span>Físico</span><b>62</b></div><div><span>Comprometido</span><b>18</b></div><div><span>Disponible</span><strong>44</strong></div></div></article>
        <article><div className="stock-card-top"><span className="item-thumb large"><Package /></span><div><small>TUB-COB-058</small><h3>Tubería cobre 5/8"</h3><p>Rollo 15 m · A-02-16</p></div><Badge tone="warning">Mínimo</Badge></div><div className="stock-numbers"><div><span>Físico</span><b>20</b></div><div><span>Comprometido</span><b>8</b></div><div><span>Disponible</span><strong>12</strong></div></div></article>
      </div>
      <div className="read-only-note"><ShieldCheck /><div><b>Vista de solo lectura</b><span>La información se actualizó hace 2 minutos.</span></div></div>
    </div>
  );
}

function Costos() {
  return (
    <>
      <PageHeader eyebrow="Obras / Control de costos" title="Costos por obra" description="Seguimiento de materiales utilizados y presupuesto." actions={<Button variant="secondary" icon={Download}>Exportar reporte</Button>} />
      <Card className="project-header"><div className="project-title"><span className="project-icon"><Building2 /></span><div><span>Obra seleccionada</span><h2>Edificio Parque Titanium</h2><p>Inmobiliaria Norte Grande SpA · OT-2025-018</p></div><button><ChevronDown /></button></div><Badge tone="success">En ejecución</Badge></Card>
      <div className="cost-kpis"><Card><span>Presupuesto materiales</span><strong>$28.500.000</strong><small>100% asignado</small></Card><Card><span>Costo ejecutado</span><strong>$18.920.450</strong><small className="positive">66,4% del presupuesto</small></Card><Card><span>Saldo disponible</span><strong>$9.579.550</strong><small>33,6% por ejecutar</small></Card><Card><span>Proyección final</span><strong>$27.840.000</strong><small className="positive">Bajo presupuesto</small></Card></div>
      <Card className="budget-card"><div className="section-heading"><div><h2>Avance presupuestario</h2><p>Materiales consumidos vs. presupuesto</p></div><strong>66,4%</strong></div><div className="budget-bar"><span style={{ width: "66.4%" }} /></div><div className="budget-legend"><span><i className="used" />Ejecutado {money(18920450)}</span><span><i />Disponible {money(9579550)}</span></div></Card>
      <Card><div className="entity-tabs inline"><button className="active">Vales de egreso <span>18</span></button><button>Devoluciones <span>5</span></button></div><div className="table-scroll"><table><thead><tr><th>Vale</th><th>Fecha</th><th>Responsable</th><th>Ítems</th><th>Valor PMP</th><th>Estado</th><th /></tr></thead><tbody>
        <tr><td><b>VAL-002847</b></td><td>24 jun 2025</td><td>Juan Pablo Rojas</td><td>6 artículos</td><td><b>$486.320</b></td><td><Badge tone="success">Firmado</Badge></td><td><button className="link-btn">Ver detalle</button></td></tr>
        <tr><td><b>VAL-002811</b></td><td>18 jun 2025</td><td>Matías Silva</td><td>12 artículos</td><td><b>$1.284.900</b></td><td><Badge tone="success">Firmado</Badge></td><td><button className="link-btn">Ver detalle</button></td></tr>
        <tr><td><b>VAL-002786</b></td><td>10 jun 2025</td><td>Juan Pablo Rojas</td><td>8 artículos</td><td><b>$742.180</b></td><td><Badge tone="success">Firmado</Badge></td><td><button className="link-btn">Ver detalle</button></td></tr>
      </tbody></table></div><Pagination text="Mostrando 1–3 de 18 vales" /></Card>
    </>
  );
}

function Cardex() {
  const [modal, setModal] = useState(false);
  const [reason, setReason] = useState("");
  return (
    <>
      <PageHeader eyebrow="Auditoría / Administrador" title="Cardex de movimientos" description="Registro cronológico e inalterable de inventario." actions={<Button variant="secondary" icon={Download}>Exportar Cardex</Button>} />
      <div className="audit-note"><ShieldCheck size={20} /><div><b>Registro protegido</b><span>Los movimientos no pueden eliminarse. Una anulación genera un movimiento inverso y conserva la trazabilidad completa.</span></div></div>
      <Card>
        <div className="advanced-filters"><div className="mini-search"><Search /><input placeholder="Código, artículo o documento..." /></div><button><Clock3 />01 jun — 24 jun 2025</button><button><SlidersHorizontal />Tipo de movimiento</button><button>Todos los usuarios<ChevronDown /></button></div>
        <div className="table-scroll"><table><thead><tr><th>Fecha y hora</th><th>Movimiento</th><th>Documento</th><th>Artículo</th><th>Entrada</th><th>Salida</th><th>Saldo</th><th>Usuario</th><th /></tr></thead><tbody>
          <tr><td><b>24 jun 2025</b><small className="block">10:42:18</small></td><td><Badge tone="info">Egreso a obra</Badge></td><td>VAL-002847</td><td><b>TUB-COB-038</b><small className="block">Tubería cobre 3/8"</small></td><td>—</td><td className="negative"><b>−4</b></td><td>48</td><td>Daniela G.</td><td><button className="more-btn" onClick={() => setModal(true)}>•••</button></td></tr>
          <tr><td><b>24 jun 2025</b><small className="block">09:32:05</small></td><td><Badge tone="success">Ingreso</Badge></td><td>FAC-4832</td><td><b>REF-R410A-11</b><small className="block">Gas refrigerante R410A</small></td><td className="positive"><b>+8</b></td><td>—</td><td>22</td><td>Marcelo T.</td><td><button className="more-btn" onClick={() => setModal(true)}>•••</button></td></tr>
          <tr><td><b>23 jun 2025</b><small className="block">16:18:42</small></td><td><Badge tone="warning">Devolución</Badge></td><td>DEV-000184</td><td><b>SOP-CON-500</b><small className="block">Soporte condensadora</small></td><td className="positive"><b>+2</b></td><td>—</td><td>24</td><td>Daniela G.</td><td><button className="more-btn" onClick={() => setModal(true)}>•••</button></td></tr>
        </tbody></table></div><Pagination text="Mostrando 1–3 de 2.486 movimientos" /></Card>
      {modal && <div className="modal-backdrop" onMouseDown={() => setModal(false)}><div className="modal" onMouseDown={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setModal(false)}><X /></button><span className="modal-icon"><RotateCcw /></span><h2>Anular movimiento</h2><p>Esta acción generará un movimiento inverso para <b>VAL-002847</b>. El registro original permanecerá visible.</p><div className="movement-summary"><span>Egreso · 24 jun 2025</span><b>TUB-COB-038 · −4 unidades</b></div><label className="notes full"><span>Motivo de anulación <b>*</b></span><textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Explica por qué se debe anular este movimiento..." /><small>Mínimo 10 caracteres. Quedará registrado en la auditoría.</small></label><div className="modal-actions"><Button variant="secondary" onClick={() => setModal(false)}>Cancelar</Button><Button variant="danger" disabled={reason.length < 10}>Anular movimiento</Button></div></div></div>}
    </>
  );
}

function AppShell({ role, onLogout }: { role: Role; onLogout: () => void }) {
  const [page, setPage] = useState<Page>(role === "Supervisor de Obras" ? "consulta" : "dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState("");
  const allowed = navItems.filter((item) => !item.roles || item.roles.includes(role));
  const navigate = (next: Page) => { setPage(next); setSidebarOpen(false); };
  const showToast = (text: string) => { setToast(text); window.setTimeout(() => setToast(""), 2800); };
  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard />;
      case "ingreso": return <Ingreso />;
      case "egreso": return <Egreso toast={showToast} />;
      case "scanner": return <Scanner onBack={() => navigate(role === "Supervisor de Obras" ? "consulta" : "dashboard")} />;
      case "ajustes": return <Ajustes />;
      case "inventario": return <Inventario />;
      case "catalogo": return <Catalogo />;
      case "entidades": return <Entidades />;
      case "pmp": return <Pmp />;
      case "consulta": return <Consulta />;
      case "costos": return <Costos />;
      case "cardex": return <Cardex />;
    }
  };
  const isImmersive = page === "scanner";
  return (
    <div className={`app-shell ${isImmersive ? "immersive" : ""}`}>
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand"><div className="brand-mark"><span>F</span></div><div><b>Proyecto Alpha</b><small>Inventario FYAG</small></div><button onClick={() => setSidebarOpen(false)}><X /></button></div>
        <nav><span className="nav-label">OPERACIÓN</span>{allowed.map(({ page: itemPage, label, icon: Icon }, index) => <button key={itemPage} className={page === itemPage ? "active" : ""} onClick={() => navigate(itemPage)}>{index === 5 && <span className="nav-divider" />}<Icon size={19} /><span>{label}</span>{itemPage === "dashboard" && <small>12</small>}</button>)}</nav>
        <div className="sidebar-help"><span><ShieldCheck /></span><div><b>¿Necesitas ayuda?</b><small>Revisa el centro de soporte</small></div><ChevronRight /></div>
        <button className="sidebar-profile" onClick={onLogout}><span>DG</span><div><b>Daniela González</b><small>{role}</small></div><ChevronDown /></button>
      </aside>
      {sidebarOpen && <button className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <div className="main-shell">
        {!isImmersive && <header className="topbar"><button className="menu-btn" onClick={() => setSidebarOpen(true)}><Menu /></button><div className="global-search"><Search size={18} /><input placeholder="Buscar artículos, obras o documentos..." /><kbd>⌘ K</kbd></div><div className="topbar-right"><span className="sync-status"><i />Inventario actualizado</span><button className="icon-btn"><Bell /><small>3</small></button><div className="topbar-user"><span>DG</span><div><b>Daniela González</b><small>{role}</small></div><ChevronDown size={15} /></div></div></header>}
        <main className={isImmersive ? "immersive-content" : "content"}>{renderPage()}</main>
      </div>
      {!isImmersive && <nav className="mobile-nav">{allowed.slice(0, 4).map(({ page: itemPage, label, icon: Icon }) => <button key={itemPage} className={page === itemPage ? "active" : ""} onClick={() => navigate(itemPage)}><Icon /><span>{label.split(" ")[0]}</span></button>)}<button onClick={() => setSidebarOpen(true)}><Menu /><span>Más</span></button></nav>}
      {toast && <div className="toast"><span><Check /></span><div><b>Acción completada</b><small>{toast}</small></div><button onClick={() => setToast("")}><X /></button></div>}
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState<Role | null>(null);
  return role ? <AppShell role={role} onLogout={() => setRole(null)} /> : <Login onLogin={setRole} />;
}
