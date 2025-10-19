# Contact Form Email Setup Guide

Your contact form is ready to send emails to `anusha05aug@gmail.com`. Choose one of these options:

## 🎯 **Option 1: Formspree (Recommended - Easy & Free)**

### Step 1: Sign up for Formspree
1. Go to [formspree.io](https://formspree.io/)
2. Click "Get Started" 
3. Sign up with your email: `anusha05aug@gmail.com`

### Step 2: Create a new form
1. Click "Create Form"
2. Enter form name: "Personal Website Contact"
3. Enter your email: `anusha05aug@gmail.com`
4. Copy the form endpoint (looks like: `https://formspree.io/f/xyzabc123`)

### Step 3: Update your website
1. Open `index.html`
2. Find line 509: `action="https://formspree.io/f/YOUR_FORM_ID"`
3. Replace `YOUR_FORM_ID` with your actual form ID

Example:
```html
<form class="contact-form" id="contactForm" action="https://formspree.io/f/xyzabc123" method="POST">
```

### Step 4: Test your form
1. Visit your website
2. Fill out the contact form
3. Submit it
4. Check your Gmail inbox!

**Benefits:**
- ✅ Free for 50 submissions/month
- ✅ No coding required
- ✅ Spam protection included
- ✅ Works with static websites
- ✅ Professional email notifications

---

## 🎯 **Option 2: Netlify Forms (If hosting on Netlify)**

If you're hosting on Netlify, simply add `netlify` to your form:

```html
<form class="contact-form" id="contactForm" name="contact" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="contact" />
    <!-- rest of your form fields -->
</form>
```

---

## 🎯 **Option 3: EmailJS (More Advanced)**

### Step 1: Sign up for EmailJS
1. Go to [emailjs.com](https://www.emailjs.com/)
2. Create account with your Gmail
3. Set up Gmail service
4. Create email template

### Step 2: Add EmailJS to your website
Add this script before closing `</body>` tag in `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    emailjs.init("YOUR_PUBLIC_KEY");
</script>
```

### Step 3: Update JavaScript
Replace the form handling in `js/script.js` with EmailJS code.

---

## 🎯 **Option 4: Simple mailto (Basic)**

Replace your form with a simple mailto link:

```html
<a href="mailto:anusha05aug@gmail.com?subject=Contact from Website&body=Hello Anusha," class="btn btn-primary">
    Send Email Directly
</a>
```

---

## 🚀 **Recommended Setup Steps**

1. **Choose Option 1 (Formspree)** - It's the easiest and most professional
2. **Sign up at formspree.io** with your Gmail
3. **Get your form endpoint**
4. **Update index.html** with your form ID
5. **Test the form** by submitting a message
6. **Deploy your website** and test again

## 📧 **What Happens When Someone Submits**

With Formspree, you'll receive emails like this:

```
From: Formspree <noreply@formspree.io>
To: anusha05aug@gmail.com
Subject: New submission from Personal Website Contact

Name: John Doe
Email: john@example.com
Subject: Job Opportunity
Message: Hi Anusha, I saw your portfolio and would like to discuss a job opportunity...
```

## 🛡️ **Security Features**

- ✅ Spam protection
- ✅ CAPTCHA available
- ✅ Email validation
- ✅ Rate limiting
- ✅ No server required

## 💡 **Pro Tips**

1. **Test thoroughly** before going live
2. **Set up email filters** in Gmail for form submissions
3. **Consider upgrading** Formspree for more submissions
4. **Add honeypot fields** for extra spam protection
5. **Set up autoresponder** to thank people for contacting you

---

Your contact form will be ready to receive professional inquiries once you complete the Formspree setup! 🎉