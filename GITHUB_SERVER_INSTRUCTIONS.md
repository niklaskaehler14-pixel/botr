# 🚀 How to Host Your Bot 24/7 via GitHub

To keep your bot and admin panel running 24/7 without having to keep your computer on, follow these simple steps.

### Step 1: Create a GitHub Repository
1. Go to [GitHub.com](https://github.com) and create a new **Private** repository.
2. Name it something like `galaxy-bot-server`.
3. Upload all the files from this folder to that repository **EXCEPT** for `node_modules` and your `.env` file (the `.gitignore` file I provided will help with this if you use the GitHub Desktop app).

### Step 2: Set Up Hosting (e.g., Render.com)
I recommend [Render.com](https://render.com) because it's free and very easy to connect to GitHub.

1. Create a free account on Render.com.
2. Click **New** -> **Web Service**.
3. Connect your GitHub account and select your `galaxy-bot-server` repository.
4. Render will automatically detect the `render.yaml` file I created for you.

### Step 3: Add Your Secrets (IMPORTANT)
Your bot needs its "brain" to work. Since we didn't upload the `.env` file to GitHub for safety, you need to add those values manually in the hosting panel:

1. In your Render dashboard, go to the **Environment** tab.
2. Add the following **Environment Variables**:
   * `DISCORD_TOKEN`: (Your bot token)
   * `DISCORD_CLIENT_ID`: (Your bot client ID)
   * `DISCORD_CLIENT_SECRET`: (Your bot client secret)
   * `OWNER_ID`: (Your Discord ID)
   * `ADMIN_PASSWORD`: (Any password you want)
   * `SESSION_SECRET`: (Any random string)
   * `GEMINI_API_KEY`: (Your AI key)

### Step 4: Access Your Dashboard
Once deployed, Render will give you a URL (e.g., `https://galaxy-bot.onrender.com`).
1. Copy this URL.
2. Go back to your Render environment variables and add one more:
   * `DASHBOARD_URL`: (Paste the URL here)
3. Your bot will restart automatically, and you are done!

---

### Why this is better:
* **24/7 Running**: The bot stays online even when your PC is off.
* **Auto-Update**: Every time you change code and "Push" to GitHub, the bot updates itself instantly.
* **Private**: Because the GitHub repo is private, nobody can see your code or settings.
