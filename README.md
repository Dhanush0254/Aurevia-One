# Aurevia One — AI-Powered Investing Ecosystem

**Concept & Product Demo by Dhanush**

> **Disclaimer:** This project is a **frontend-only product demonstration** created for an exploratory internship and product discussion assignment. It is NOT a real trading platform. It does not connect to real financial APIs, does not have a backend database, and does not process real money or user authentication. All data shown is mocked for presentation purposes.

---

## 🎯 The Vision

**"A beginner-to-expert AI-guided investing ecosystem."**

Aurevia One was designed to rethink the modern investing experience. After analyzing and reverse-engineering popular fintech platforms like Groww and AssetsPlus, a common pain point emerged: traditional platforms provide excellent *tools* but lack proactive *guidance* for beginners.

The goal of this project is to demonstrate **product thinking, UX/UI problem-solving, and a scalable product vision** that bridges the gap between complex financial data and beginner-friendly investing.

---

## 🚀 Why Aurevia One is Different

Through competitive analysis, this product proposes a shift from *manual exploration* to *AI-guided wealth creation*. 

| Feature Area | Traditional Platforms | Aurevia One Approach |
| :--- | :--- | :--- |
| **User Experience** | Data-heavy dashboards with technical finance terminology that can overwhelm new users. | Calm, guided experience using beginner-friendly language and simplified workflows. |
| **Investment Guidance**| Users are left to make decisions alone, requiring prior financial understanding. | AI-powered recommendations, guided assistance, and smart educational insights. |
| **Learning Experience**| Education is often hidden in separate blogs or disconnected resources. | Contextual education integrated directly into the investing flow (Learn while investing). |
| **Personalization** | A static, "one-size-fits-all" interface for every user. | Goal-based recommendations adapting to the user's risk profile and life goals. |
| **Emotional Experience**| Can be intimidating due to complex visuals and information overload. | Focuses on building confidence with a simple visual hierarchy and reduced clutter. |
| **AI Integration** | Mostly manual fund discovery and portfolio tracking. | Features an AI investment assistant, smart portfolio insights, and AI fund scoring. |

---

## 📱 Platform Features

### 1. Landing Page
A startup-pitch inspired hero section that immediately communicates value. It features a premium, clean aesthetic with soft gradients, floating UI elements, and a dedicated section comparing the Aurevia One approach to traditional platforms.

### 2. Goal-Based Dashboard
Instead of just showing red and green numbers, the dashboard is oriented around **life goals** (e.g., Emergency Fund, Dream Vacation, Retirement). It includes:
- Clear portfolio metrics (Total Invested, Current Value, XIRR).
- AI Insights providing contextual tips (e.g., Diversification opportunities, SIP reminders).
- Visual progress bars mapping investments to real-world goals.

### 3. Explore Funds
A curated mutual fund discovery experience.
- Replaces overwhelming data tables with clean, readable cards.
- Includes an **AI Score** for every fund to help users gauge quality quickly.
- Easy filtering by risk level, category, and tags (e.g., "Best for Beginners", "High Risk High Return").
- A responsive bottom-sheet/modal design for viewing detailed fund information on mobile.

### 4. AI Assistant
A simulated conversational AI interface built to answer investing queries in plain, jargon-free language.
- Suggests helpful prompts for beginners ("What is SIP?", "Which fund is safer?").
- Uses a structured markdown-style parser to render beautiful, readable responses with headings, bullet points, and highlighted tips.

### 5. Learning Hub
A dedicated space to master investing basics.
- Articles are categorized by difficulty and topic.
- Features quick "Key Points" and actionable takeaways.
- Uses `lucide-react` icons for a clean, modern look instead of emojis.

---

## 💻 Technical Implementation

Built with modern web technologies focusing on performance and UI aesthetics:

- **Framework:** React 18 + Vite (Fast, optimized frontend tooling)
- **Styling:** Tailwind CSS v4 (Utility-first CSS for responsive, custom designs)
- **Animations:** Framer Motion (Smooth page transitions, micro-interactions, and layout animations)
- **Charts:** Recharts (Responsive area charts for portfolio growth visualization)
- **Icons:** Lucide React (Clean, consistent, professional iconography)
- **Routing:** React Router DOM (Client-side routing)
- **Deployment Configuration:** Configured with `vercel.json` to handle SPA routing paths correctly.

---

## 🛠️ Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dhanush0254/Aurevia-One.git
   cd Aurevia-One
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

---

## 🌐 Deployment

This project is fully ready to be deployed on **Vercel**. 

1. Import the repository into your Vercel dashboard.
2. The included `vercel.json` file will automatically configure the routing rewrite rules required for React Router to function properly on page refreshes.
3. Click **Deploy**.
