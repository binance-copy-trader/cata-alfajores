# 🍪 Cata de Alfajores — App de votación

Web app para que los invitados puntúen alfajores desde el celular y ver
resultados en vivo. Hecha con Next.js + Postgres (Neon).

## ✏️ Lo único que tenés que editar

Abrí **`config/cata.ts`** y poné tus alfajores reales en la lista
`ALFAJORES`. Ahí también podés cambiar el título y los criterios.

---

## 🚀 Cómo publicarla GRATIS (camino recomendado, ~15 min)

No necesitás tener Node instalado: Vercel compila en la nube.

### 1. Subir el código a GitHub
```bash
cd D:\cumple-leon-alfajor
git init
git add .
git commit -m "Cata de alfajores"
```
Creá un repo nuevo en https://github.com/new (puede ser privado) y seguí
las instrucciones de "push an existing repository":
```bash
git remote add origin https://github.com/TU_USUARIO/cata-alfajores.git
git branch -M main
git push -u origin main
```

### 2. Importar en Vercel
1. Entrá a https://vercel.com y registrate con tu cuenta de GitHub.
2. **Add New → Project** → elegí el repo `cata-alfajores` → **Import**.
3. No toques nada todavía, hacé **Deploy**. (Va a fallar o quedar sin base;
   lo arreglamos en el paso 3.)

### 3. Agregar la base de datos gratis (Neon)
1. En tu proyecto de Vercel → pestaña **Storage** → **Create Database**.
2. Elegí **Neon** (Postgres) → plan gratis → **Create**.
3. Cuando te pregunte, **conectalo a este proyecto**. Eso crea solita la
   variable `DATABASE_URL`.
4. Andá a **Deployments** → en el último deploy, **Redeploy**.

### 4. ¡Listo!
- Tu URL queda tipo `https://cata-alfajores.vercel.app`
- Para votar: esa URL
- Resultados en vivo (proyectalos en la tele): `.../resultados`
- QR para que escaneen los chicos: `.../qr`

> El QR y la URL andan con WiFi **o** datos móviles, sin tocar tu firewall.

---

## 🖥️ Alternativa: tu servidor Ubuntu
Funciona igual (es una app Next.js + una `DATABASE_URL` de Postgres), pero
para que entren desde el celular necesitás dominio público + HTTPS. Para una
fiesta, Vercel es más a prueba de fallos. Si querés este camino, avisame y
te paso los comandos.

## 🔧 Correr local (opcional, requiere Node 18+)
```bash
npm install
# copiá .env.example a .env.local y pegá tu DATABASE_URL
npm run dev
```
Abrí http://localhost:3000
