# PingMe
## A Real‑Time Chat App (Frontend)

### Overview
A React application featuring:
- Email/password sign‑up & sign‑in  
- Friend requests with live notifications  
- One‑to‑one chats (including self‑chat)  
- Persistent state via Zustand + localStorage  
- Real‑time updates via Socket.IO  
- UI built with CSS/Flexbox  

### Setup

1. **Clone & install deps**  
   ```bash
    git clone <frontend-repo-url> frontend
    cd frontend
    npm install
   ```
2. **Environment**
   
   Create .env.local:
    ```bash
    VITE_API_URL=https://backend/api
    VITE_SOCKET_URL=https://your-backend        
    ```

3. **Run**

    ```bash
     npm run dev        # start dev server
     npm run build      # create production build
     npm run preview    # preview build
    ```

4. **Architecture**

  - **State management**:
    - `userStore`: auth, friends, friend‑requests
    - `appStore`: global lists & UI toggles
    - `chatStore`: chats, active chat, messages

   - **Socket context**: auto‑connect on sign‑in
   - **Key components**:
     - `App.jsx`: session check & data fetch
     - `List/`: sidebar & ChatList
     - `Chat/`: ChatTop, ChatContainer, message input
     - `Detail/`: profile & settings
     - `shared/`: UserInfo, Notifications, icons

### **Real‑Time Events**

 - From server:
    - user-registered
    - friend-request-received
    - friend-request-status-changed
    - message-sent

 - Client: Listen & dispatch to stores; fallback to API if needed.

### **Scripts**

```bash
npm run dev
npm run build
npm run preview
```