# Beginner's Guide to Requestly 🚀

### 1. What is Requestly? (Easy Version)
Think of Requestly as a **"Remote Control"** for your web browser. 
Usually, your website talks to your server, and the server gives an answer. Requestly sits in the middle and lets you **intercept** that conversation and change the answer!

### 2. Why use it in "NoCap Decoder"?
- **Fake a Server**: Don't want to run `app.py`? Requestly can "pretend" to be your server and give you a fake "Real" or "Fake" result so you can fix your CSS/Design.
- **Test Hard Situations**: Want to see how your site looks if the server crashes or gives an error? You can force it to happen with one click.
- **Fix Bugs Faster**: You can see exactly what data is going in and out without digging deep into code.

### 3. The "Requestly Mindset" 🧠
When building a complex app like this, don't think: *"I must run everything at once."*
Think: *"I want to work on the UI today, so I'll use Requestly to **Mock** the server data so I don't have to worry about Python or Databases right now."*

### 4. How to use it RIGHT NOW:
1.  **Install**: Get the [Requestly Chrome Extension](https://chrome.google.com/webstore/detail/requestly-redirect-url-mo/mdnleldcmiljblolonhlmokjkabhebcm).
2.  **Import**: In the extension, find the "Import" button and select the file at:
    `NoCap/requestly/mock_rules.json`
3.  **Activate**: Turn on the "Mock Prediction" rule.
4.  **Try it**: Go to your app and run a check. Even if your server is OFF, you will see a result!

### 5. What did I add to your code?
I added a tiny "Listener" (the SDK) in your `index.html`. This tells Requestly: *"Hey, this is the NoCap project, help the developer debug this!"*
