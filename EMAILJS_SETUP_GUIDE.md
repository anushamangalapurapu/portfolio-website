# EmailJS Setup Guide - Complete Instructions

Your website is ready for EmailJS! Follow these steps to connect your contact form to Gmail.

## 📧 **Step 1: Create EmailJS Account**

1. Go to [emailjs.com](https://www.emailjs.com/)
2. Click **"Sign Up"**
3. Use your email: `anusha05aug@gmail.com`
4. Verify your email address

## 🔧 **Step 2: Add Gmail Service**

1. In your EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"** and sign in with your Gmail
5. **Copy your Service ID** (example: `service_gmail123`)
   - You'll need this for Step 4

## 📝 **Step 3: Create Email Template**

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Enter **Template Name**: "Website Contact Form"
4. **Replace the template content** with this:

### Template Subject:
```
New Contact from {{from_name}} - {{subject}}
```

### Template Content:
```
Hello Anusha,

You have received a new message from your website contact form:

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio website contact form.
You can reply directly to {{from_email}}.
```

5. **Save the template**
6. **Copy your Template ID** (example: `template_abc123`)
   - You'll need this for Step 4

## 🔑 **Step 3.5: Get Your Public Key**

1. Go to **"Account"** → **"General"**
2. Find **"Public Key"** section
3. **Copy your Public Key** (example: `user_xyz789`)
   - You'll need this for Step 4

## 💻 **Step 4: Update Your Website Code**

You need to update 2 files with your EmailJS credentials:

### A. Update `index.html` (line 554):
```html
<!-- Replace this line: -->
emailjs.init("YOUR_PUBLIC_KEY");

<!-- With your actual public key: -->
emailjs.init("user_xyz789abc123");
```

### B. Update `js/script.js` (lines 112-113):
```javascript
// Replace these lines:
const serviceID = 'YOUR_SERVICE_ID';      // e.g., 'service_gmail123'
const templateID = 'YOUR_TEMPLATE_ID';    // e.g., 'template_abc123'

// With your actual IDs:
const serviceID = 'service_gmail123';     // Your Gmail service ID
const templateID = 'template_abc123';     // Your template ID
```

## 🧪 **Step 5: Test Your Contact Form**

1. **Save all files**
2. **Refresh your website** (http://localhost:8080)
3. **Fill out the contact form** with test data:
   - Name: "Test User"
   - Email: "test@example.com"
   - Subject: "Testing Contact Form"
   - Message: "This is a test message"
4. **Click "Send Message"**
5. **Check your Gmail inbox** - you should receive the email!

## 📱 **Step 6: Test from Different Devices**

- Test on mobile phone
- Test from different browsers
- Ask a friend to test it

## 🎯 **What You'll Receive**

When someone fills out your contact form, you'll get an email like this:

```
From: anusha05aug@gmail.com (via EmailJS)
To: anusha05aug@gmail.com
Subject: New Contact from John Smith - Job Opportunity

Hello Anusha,

You have received a new message from your website contact form:

From: John Smith
Email: john@company.com
Subject: Job Opportunity

Message:
Hi Anusha, I saw your portfolio and would like to discuss a position at our company...

---
This message was sent from your portfolio website contact form.
You can reply directly to john@company.com.
```

## 🔒 **Security Features**

- ✅ **No server required** - runs client-side
- ✅ **Spam protection** - EmailJS has built-in protections
- ✅ **Rate limiting** - prevents abuse
- ✅ **Gmail integration** - uses your actual Gmail account
- ✅ **Direct replies** - you can reply normally to received emails

## 💡 **Pro Tips**

1. **Test thoroughly** before sharing your portfolio
2. **Set up Gmail filters** to organize contact form emails
3. **Monitor EmailJS dashboard** for usage statistics
4. **Consider upgrading** EmailJS if you get many contacts
5. **Add CAPTCHA** if you get spam (available in EmailJS)

## 🚀 **Free Plan Limits**

EmailJS free plan includes:
- ✅ **200 emails/month**
- ✅ **2 email services**
- ✅ **2 email templates**
- ✅ **Basic support**

Perfect for a personal portfolio!

## 🛠️ **Troubleshooting**

**Form not working?**
- Check browser console for errors
- Verify all IDs are correct (service, template, public key)
- Make sure Gmail service is connected
- Test with a simple message first

**Not receiving emails?**
- Check Gmail spam folder
- Verify template is saved correctly
- Test with your own email address first
- Check EmailJS dashboard for delivery logs

---

## ✅ **Final Checklist**

- [ ] EmailJS account created
- [ ] Gmail service connected
- [ ] Email template created
- [ ] Public key copied
- [ ] Service ID copied  
- [ ] Template ID copied
- [ ] `index.html` updated with public key
- [ ] `js/script.js` updated with service & template IDs
- [ ] Contact form tested successfully
- [ ] Email received in Gmail

**Once completed, your contact form will send emails directly to anusha05aug@gmail.com!** 🎉