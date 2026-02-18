# 📖 Guest Book Application

A beautiful, minimalist guest book application where visitors can leave messages and see what others have shared. Built with modern web technologies and featuring a sleek blue and black design.

![Guest Book Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.1-black)
![NestJS](https://img.shields.io/badge/NestJS-10.0-red)

---

## 🌟 What Is This?

Think of this as a digital version of a traditional guest book you might find at a wedding or hotel. Visitors can:

- **Write their name** and leave a message
- **See all messages** from other visitors
- **Watch new messages appear** instantly after posting

It's simple, elegant, and easy to use!

---

## ✨ Features

### For Users
- 📝 **Simple Form** - Just enter your name and message
- 💬 **Real-Time Updates** - New messages appear immediately
- 📱 **Mobile Friendly** - Works perfectly on phones and tablets
- 🎨 **Beautiful Design** - Minimalist blue and black theme
- ⚡ **Fast & Smooth** - Subtle animations and quick responses

### For Developers
- 🔒 **Input Validation** - Prevents empty or invalid submissions
- 🗄️ **Database Storage** - All messages safely stored in Supabase
- 🔄 **REST API** - Clean, maintainable backend architecture
- 📦 **TypeScript** - Type-safe code throughout
- 🎯 **Best Practices** - Following modern web development standards

---

## 🎯 How It Works (Simple Explanation)

### The Big Picture

Imagine three friends working together:

1. **The Frontend (What You See)** - Like a store's display window
   - Shows the beautiful interface on your screen
   - Has the form where you type your message
   - Displays all the guest book entries

2. **The Backend (The Manager)** - Like a store manager
   - Receives your message when you click "Submit"
   - Checks that everything is valid (name and message aren't empty)
   - Talks to the database to save or retrieve messages

3. **The Database (The Storage Room)** - Like a filing cabinet
   - Stores all the guest book entries forever
   - Organizes them by date (newest first)
   - Keeps everything safe and accessible

### What Happens When You Leave a Message?

Let's walk through the journey of a message:

1. **You visit the website** 
   - The frontend loads and looks pretty! 🎨
   - It immediately asks the backend: "Hey, what messages do we have?"

2. **You type your name and message**
   - The form waits patiently for you to finish
   - As you type, everything looks smooth and responsive

3. **You click "Submit"**
   - The frontend says: "Hold on, let me check if you filled everything out!"
   - If something's missing, it politely asks you to complete it

4. **The message travels to the backend**
   - Like sending a package, your message goes to the backend
   - The backend checks again: "Is this valid? Name and message both filled?"

5. **The backend saves it to the database**
   - If everything's good, the backend tells Supabase (our database)
   - "Please save this new message with a timestamp"
   - Supabase stores it safely

6. **You see success!**
   - A green success message appears ✅
   - The form clears out automatically
   - Your new message appears at the top of the list
   - Other visitors can now see your message too!

---

## 🏗️ Project Structure (What's in the Box?)

```
guestbook/
├── backend/                    # The backend (NestJS)
│   ├── src/
│   │   ├── comments/          # Everything related to comments
│   │   │   ├── dto/           # Data validation rules
│   │   │   ├── entities/      # What a comment looks like
│   │   │   ├── comments.controller.ts  # Handles web requests
│   │   │   ├── comments.service.ts     # Business logic
│   │   │   └── comments.module.ts      # Packages it all together
│   │   ├── supabase/          # Database connection
│   │   ├── app.module.ts      # Main application setup
│   │   └── main.ts            # Application entry point
│   ├── package.json           # Backend dependencies list
│   └── tsconfig.json          # TypeScript configuration
│
├── frontend/                   # The frontend (Next.js)
│   ├── src/
│   │   ├── app/               # Pages and layouts
│   │   │   ├── page.tsx       # Home page (main page)
│   │   │   ├── layout.tsx     # Overall page structure
│   │   │   └── globals.css    # Global styles
│   │   ├── components/        # Reusable UI pieces
│   │   │   ├── CommentForm/   # The form to add comments
│   │   │   ├── CommentCard/   # Shows a single comment
│   │   │   └── CommentList/   # Shows all comments
│   │   ├── services/          # API communication
│   │   └── types/             # TypeScript type definitions
│   ├── package.json           # Frontend dependencies list
│   └── tsconfig.json          # TypeScript configuration
│
└── README.md                   # This file!
```

### What Each Folder Does (In Plain English)

**Backend Folders:**
- `comments/` - Everything about guest book messages
- `dto/` - Rules for what makes a valid message
- `entities/` - Blueprint of what a message looks like
- `supabase/` - Code that connects to the database

**Frontend Folders:**
- `app/` - The actual pages people see
- `components/` - Building blocks (like LEGO pieces) we reuse
- `services/` - Code that talks to the backend
- `types/` - Definitions so TypeScript knows what data looks like

---

## 🚀 Getting Started

### What You Need First (Prerequisites)

Before you start, make sure you have:

- **Node.js** (version 18 or newer) - [Download here](https://nodejs.org/)
  - *What is it?* JavaScript runtime that lets you run the application
- **npm** (comes with Node.js) - Package manager
- **A Supabase Account** - [Sign up free](https://supabase.com/)
  - *What is it?* Cloud database service (like Google Drive, but for databases)

### Step 1: Get the Code

Download or clone this project to your computer.

### Step 2: Set Up the Database (Supabase)

1. **Go to [Supabase](https://supabase.com/) and sign in**

2. **Create a new project**
   - Click "New Project"
   - Give it a name (like "guest-book")
   - Set a database password (save this somewhere safe!)
   - Choose a region close to you
   - Wait a few minutes for it to set up

3. **Create the comments table**
   - Click on "SQL Editor" in the left menu
   - Click "New Query"
   - Copy and paste this code:

```sql
-- Create the comments table
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create an index for faster sorting
CREATE INDEX comments_created_at_idx ON comments(created_at DESC);
```

   - Click "Run" button
   - You should see "Success. No rows returned"

4. **Get your API keys**
   - Click on "Settings" (gear icon) in the left menu
   - Click "API" under Project Settings
   - You'll see two important things:
     - **Project URL** - Copy this
     - **anon/public key** - Copy this too
   - Keep these safe! You'll need them in the next step

### Step 3: Configure the Backend

1. **Navigate to the backend folder** in your terminal/command prompt:
   ```bash
   cd backend
   ```

2. **Install the required packages** (this downloads all the tools the backend needs):
   ```bash
   npm install
   ```

3. **Create your environment file**:
   - Find the file named `.env.example`
   - Make a copy of it and rename the copy to `.env`
   - Open `.env` in a text editor
   - Replace the placeholder values with your Supabase info:

```env
SUPABASE_URL=your_actual_supabase_url_here
SUPABASE_KEY=your_actual_supabase_key_here
PORT=3001
```

   *Example:*
   ```env
   SUPABASE_URL=https://abcdefghijk.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   PORT=3001
   ```

4. **Start the backend**:
   ```bash
   npm run start:dev
   ```

   You should see: `🚀 Guest Book API is running on: http://localhost:3001`

   ✅ **Success!** Keep this terminal window open and running.

### Step 4: Configure the Frontend

1. **Open a NEW terminal window** (keep the backend running in the first one)

2. **Navigate to the frontend folder**:
   ```bash
   cd frontend
   ```

3. **Install the required packages**:
   ```bash
   npm install
   ```

4. **Create your environment file**:
   - Find the file named `.env.example`
   - Make a copy and rename it to `.env`
   - Open `.env` in a text editor
   - It should look like this:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

   This tells the frontend where to find the backend.

5. **Start the frontend**:
   ```bash
   npm run dev
   ```

   You should see: `- ready started server on 0.0.0.0:3000`

   ✅ **Success!** Keep this window open too.

### ⚡ Quick Start: Run Both at Once

**Don't want to manage two terminal windows?** You can run both frontend and backend simultaneously!

1. **From the ROOT folder** (guestbook/), first install the concurrently package:
   ```bash
   npm install
   ```

2. **Run both servers with a single command**:
   ```bash
   npm run dev
   ```

   This will start both the backend (port 3001) and frontend (port 3000) at the same time with color-coded output!
   
   - 🔵 **Blue text** = Backend messages
   - 🟢 **Green text** = Frontend messages

   To stop both servers, press `Ctrl+C` once.

### Step 5: Use the Application! 🎉

1. **Open your web browser**
2. **Go to** `http://localhost:3000`
3. **You should see:**
   - A beautiful blue and black interface
   - A form to enter your name and message
   - A section that says "No comments yet"

4. **Try it out:**
   - Type your name (e.g., "Alice")
   - Write a message (e.g., "Hello, world!")
   - Click "Submit"
   - Watch your message appear instantly! ✨

---

## 🛠️ Available Commands

### Root Commands (Run Both at Once)

Run these from the **root `guestbook/`** folder:

```bash
# Install concurrently package (one-time setup)
npm install

# Run both backend and frontend simultaneously
npm run dev

# Install dependencies for both backend and frontend
npm run setup
```

### Backend Commands

Run these from the `backend/` folder:

```bash
# Start the backend in development mode (auto-reloads when you change code)
npm run start:dev

# Build the backend for production
npm run build

# Start the backend in production mode
npm run start:prod

# Run tests
npm run test

# Check code formatting
npm run lint
```

### Frontend Commands

Run these from the `frontend/` folder:

```bash
# Start the frontend in development mode
npm run dev

# Build the frontend for production
npm run build

# Start the production build
npm run start

# Check code formatting
npm run lint
```

---

## 🎨 Design Philosophy

### Color Theme

The guest book uses a **minimalist blue and black** color scheme:

- **Background**: Deep black with subtle blue gradient (#0a0a0a to #1a1a2e)
- **Primary Blue**: Vibrant blue accents (#2563eb)
- **Text**: Pure white for readability (#ffffff)
- **Cards**: Semi-transparent backgrounds with blue borders
- **Buttons**: Blue gradient with hover effects

### User Experience

- **Clean & Simple**: No clutter, just what you need
- **Smooth Animations**: Subtle transitions and entrance effects
- **Responsive**: Works beautifully on all screen sizes
- **Accessible**: High contrast and clear typography
- **Instant Feedback**: Loading states and success messages

---

## 🔒 Security & Validation

### Input Validation

Both frontend and backend validate your input:

- **Name**: Required, 1-100 characters
- **Message**: Required, 1-500 characters
- **No empty submissions**: Both fields must have content
- **No HTML allowed**: Prevents malicious code injection

### API Security

- **CORS enabled**: Only allows requests from the frontend
- **Validation pipes**: Automatically validates all incoming data
- **Error handling**: Gracefully handles and reports errors
- **Environment variables**: Sensitive keys kept in .env files

---

## 📝 API Documentation

### Endpoints

The backend provides these endpoints:

#### 1. Get All Comments
```
GET /comments
```

**What it does:** Fetches all guest book entries

**Response:** Array of comments, newest first

**Example:**
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Alice",
    "message": "Great application!",
    "created_at": "2026-02-15T10:30:00.000Z"
  }
]
```

#### 2. Create a Comment
```
POST /comments
```

**What it does:** Adds a new guest book entry

**Request Body:**
```json
{
  "name": "Bob",
  "message": "Hello from Bob!"
}
```

**Response:** The newly created comment
```json
{
  "id": "223e4567-e89b-12d3-a456-426614174001",
  "name": "Bob",
  "message": "Hello from Bob!",
  "created_at": "2026-02-15T10:35:00.000Z"
}
```

**Error Response (if validation fails):**
```json
{
  "statusCode": 400,
  "message": ["name should not be empty"],
  "error": "Bad Request"
}
```

#### 3. Health Check
```
GET /health
```

**What it does:** Checks if the backend is running

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-15T10:40:00.000Z"
}
```

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue: "Cannot connect to backend"

**Symptoms:** Frontend shows error messages, comments don't load

**Solution:**
1. Make sure the backend is running (`npm run start:dev` in backend folder)
2. Check that the backend is on port 3001
3. Verify your `.env` file in frontend has `NEXT_PUBLIC_API_URL=http://localhost:3001`
4. Check browser console for error messages

#### Issue: "Failed to create comment"

**Symptoms:** Form submission fails, error message appears

**Solution:**
1. Check that both name and message fields are filled
2. Make sure Supabase credentials are correct in backend's `.env`
3. Verify the `comments` table exists in Supabase
4. Check backend terminal for error messages

#### Issue: "No comments showing up"

**Symptoms:** Form works, but comments list is empty

**Solution:**
1. Check Supabase table has data (go to Supabase → Table Editor → comments)
2. Verify backend is connected to Supabase (check backend terminal)
3. Try refreshing the page
4. Open browser DevTools → Network tab to see API calls

#### Issue: "npm install fails"

**Symptoms:** Error messages during package installation

**Solution:**
1. Make sure you have Node.js 18 or newer: `node --version`
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` folder and try again
4. Try using `npm install --legacy-peer-deps`

#### Issue: "Port 3000 or 3001 already in use"

**Symptoms:** Error about address already in use

**Solution:**
1. Close other applications using those ports
2. Or change the port in the configuration files
3. On Windows: `netstat -ano | findstr :3001` then `taskkill /PID <PID> /F`

---

## 📚 Technologies Used

### Frontend Stack

- **Next.js 14.1** - React framework for building web applications
- **React 18.2** - JavaScript library for user interfaces
- **TypeScript 5** - Typed JavaScript for better development
- **CSS Modules** - Scoped styling for components

### Backend Stack

- **NestJS 10** - Node.js framework for backend APIs
- **TypeScript 5** - Type-safe backend code
- **class-validator** - Input validation
- **Supabase Client** - Database connection

### Database

- **Supabase (PostgreSQL)** - Cloud database service

---

## 🌐 Deployment (Going Live)

### Deploying to Production

#### Frontend (Vercel - Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Import your repository
4. Set environment variable: `NEXT_PUBLIC_API_URL=your_backend_url`
5. Deploy!

#### Backend (Railway, Heroku, or DigitalOcean)

1. Choose a hosting provider
2. Connect your repository
3. Set environment variables (SUPABASE_URL, SUPABASE_KEY, PORT)
4. Deploy the backend folder
5. Update frontend's `NEXT_PUBLIC_API_URL` to your backend URL

---

## 🤝 Contributing

Want to improve the guest book? Here's how:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit (`git commit -m 'Add amazing feature'`)
5. Push (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 💡 Tips for Customization

Want to make it your own? Here are some easy changes:

### Change Colors

Edit `frontend/src/app/globals.css`:
- Replace `#2563eb` (blue) with your preferred color
- Change background gradient colors

### Change Text Limits

Edit `backend/src/comments/dto/create-comment.dto.ts`:
- Modify `@MaxLength()` decorator values

### Add New Fields

1. Add field to Supabase table
2. Update backend DTO and entity
3. Update frontend form and components

### Change Sorting

Edit `backend/src/comments/comments.service.ts`:
- Change `ascending: false` to `ascending: true` for oldest first

---

## ❓ FAQ

**Q: Do I need to pay for Supabase?**
A: No! Supabase has a generous free tier perfect for this application.

**Q: Can I use a different database?**
A: Yes, but you'll need to modify the backend code to connect to your database.

**Q: Is this production-ready?**
A: Yes! Just make sure to use environment variables and HTTPS in production.

**Q: Can I add user authentication?**
A: Yes! You can integrate Supabase Auth or other authentication services.

**Q: How do I delete comments?**
A: Currently not implemented, but you can add a delete button and endpoint following the same pattern as create.

---

## 🎓 Learning Resources

If you want to learn more about the technologies used:

- **Next.js**: https://nextjs.org/learn
- **React**: https://react.dev/learn
- **NestJS**: https://docs.nestjs.com/
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Supabase**: https://supabase.com/docs

---

## 📬 Support

Having issues? Here's what to do:

1. Check the Troubleshooting section above
2. Look at error messages in the browser console or terminal
3. Search for similar issues online
4. Ask for help with specific error messages

---

## 🎉 You're All Set!

Congratulations! You now have a fully functional guest book application. 

**What you've built:**
- ✅ A beautiful, responsive user interface
- ✅ A secure backend API
- ✅ A cloud database storing all messages
- ✅ Real-time updates when new messages are added
- ✅ Input validation and error handling
- ✅ Production-ready code

**Next steps:**
- Customize the colors and styling
- Deploy it online for others to use
- Add new features like comment editing
- Share it with friends and get their feedback!

Happy coding! 🚀

---

*Built with ❤️ using Next.js, NestJS, and Supabase*
