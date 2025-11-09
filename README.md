# 💰 Finance Tracker

A **full-stack, type-safe Finance Management System** built with **Next.js**, **Hono**, **Prisma**, and **PostgreSQL**.  
It helps users efficiently track income, expenses, and financial insights through dynamic charts, tables, and analytics.  

This project demonstrates true end-to-end type safety. Types flow from the database and backend to the frontend. Changing the backend types propagates to the frontend compiler and prevents runtime type errors.

---

## 🚀 Tech Stack

- **Frontend:** Next.js, React, TypeScript  
- **Backend:** Hono, TypeScript, Prisma  
- **Database:** PostgreSQL (Neon)  
- **Auth & Validation:** Clerk, Zod  
- **State & Data:** Zustand, TanStack Query, TanStack Table  
- **UI & Styling:** Tailwind CSS, shadcn/ui  
- **Charts & UI Widgets:** Recharts, date-fns, react-countup, react-currency-input-field, react-day-picker, react-hook-form, react-select  
- **Hosting:** Vercel (frontend & API)  
- **ORM:** Prisma (type-safe DB client)

---

## 🔑 Key Features

- **End-to-end type safety** from DB → API → Frontend.
- **Authentication** via Clerk and schema validation via Zod.
- **Account management:** Create, update, delete financial accounts (Bank, Cash, etc.).
- **Category management:** Create/edit/delete spending categories (Food, Travel, Bills).
- **Transactions:** Add income/expense transactions with date, account, category, amount, and optional notes.
- **Transaction history:** Full listing with pagination using TanStack Table.
- **Reactive UI:** Cached queries and live updates via TanStack Query. UI state (sheets, modals) managed by Zustand.
- **Analytics / Overview:** Remaining balance, total income, total expenses.
- **Multiple chart types:** Income visualized as Area, Bar, and Line charts; Expenses visualized as Pie, Radar, and Radial charts (date-range filters supported).
- **Forms & inputs:** Date picking, currency input, selects, and validated forms with react-hook-form + Zod.
- **Responsive UI:** Built with Tailwind and shadcn UI components from mobile to  desktop design.

---

## 🧩 Core Features

### **1. Account Management**
- Create, update, and delete accounts (e.g., Bank, Cash).  
- Real-time reflection in the data table.  
- Fully reactive state via Zustand.  

### **2. Category Management**
- Create spending categories like “Food”, “Travel”, or “Bills.”  
- Editable and deletable with seamless updates.  

### **3. Transactions**
- Add transactions by selecting date, account, category, amount, and type (income/expense).  
- Optional notes for each entry.  
- Transactions auto-update in the table using React Query caching.  

### **4. Overview & Analytics**
- Interactive dashboard summarizing total **income**, **expenses**, and **remaining balance**.  
- Charts built with **Recharts**:  
  - Income: Area, Bar, and Line variants (date-wise).  
  - Expenses: Pie, Radar, and Radial variants (category-wise).  
- Date range filters for custom insights.  

### **5. Tables & Pagination**
- Responsive data tables with sorting and pagination via **TanStack Table**.  
- Optimized for large datasets and fast re-renders.  

### **6. Authentication & Security**
- **Clerk** handles user registration, login, and session management.  
- **Zod** ensures strict schema validation for input data.  
- Private routes and secure API endpoints.  

### **7. State & Performance**
- **Zustand** manages UI sheet modals for “Add New” actions.  
- **React Query** ensures instant UI updates with cached data.  
- End-to-end type safety from database to API to frontend.  

---

---

## 🛠 Other Libraries & Tools Used

| **Purpose** | **Library** |
|--------------|-------------|
| Charts | Recharts |
| Dates | Date-fns |
| Currency Inputs | React-Currency-Input-Field |
| Animations | React-CountUp |
| Form Control | React-Hook-Form + Zod |
| Date Picker | React-Day-Picker |
| Dropdowns | React-Select |
| Data Caching | TanStack Query |
| Tables | TanStack Table |

---

## 📸 Screenshots

- **Home / Overview**  
  <img width="1893" height="854" alt="overview1" src="https://github.com/user-attachments/assets/7951e9b1-d5f3-463d-a72a-f6e730f02a8d" />

- **Overview with Calendar**  
  <img width="1893" height="864" alt="overview2" src="https://github.com/user-attachments/assets/4105bfe6-1016-4395-9654-c437cccd41d2" />

- **Overview with Chart Options**  
  <img width="1906" height="862" alt="overview3" src="https://github.com/user-attachments/assets/1d2e35da-e297-40b1-b25b-b907ffd6d44d" />

- **Accounts Table**  
  <img width="1919" height="858" alt="account" src="https://github.com/user-attachments/assets/ed0ca3bd-4a6d-4cb3-a073-3275bafe49fa" />

- **Categories Table**  
  <img width="1910" height="864" alt="category" src="https://github.com/user-attachments/assets/9e88ff35-2c95-4409-ba28-b71e0d0d2dfe" />

- **Transaction History / Table**  
  <img width="1900" height="867" alt="transaction" src="https://github.com/user-attachments/assets/7f4f27e7-1c38-4536-9629-b64963f094f4" />

- **Add Transaction Modal**  
  <img width="1914" height="849" alt="create transaction" src="https://github.com/user-attachments/assets/7ec2bee9-8d95-475d-9431-df634dc4c880" />

- **Edit or Delete Transaction**  
  <img width="1916" height="864" alt="edit or delete transaction" src="https://github.com/user-attachments/assets/3b5cf56b-dc55-4c72-bb32-43d94bdc32f0" />

---

## 🎥 Demo Video

🎬 [Watch Demo Video on YouTube](https://youtu.be/2jXM6hTxXME)

---

## ⚙️ Local Setup (Development)

1. **Clone**
```bash
git clone https://github.com/yourusername/finance-tracker.git
cd finance-tracker
