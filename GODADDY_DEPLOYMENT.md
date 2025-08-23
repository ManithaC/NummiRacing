# GoDaddy Deployment Guide for Nummi Racing Website

This guide will walk you through deploying your racing team website on GoDaddy hosting step by step.

## 🚀 Prerequisites

- GoDaddy hosting account (any plan)
- Domain name (can be purchased separately or included with hosting)
- All website files downloaded to your computer

## 📁 File Preparation

Before uploading, ensure you have these files in a folder on your computer:

```
NummiRacing/
├── index.html
├── styles.css
├── script.js
├── README.md
├── GODADDY_DEPLOYMENT.md
└── images/
    ├── hero-bg.jpg (your hero background image)
    ├── team-photo.jpg (team photo)
    ├── driver1.jpg (driver photos)
    ├── driver2.jpg
    ├── crew1.jpg (crew photos)
    ├── crew2.jpg
    ├── car-main.jpg (car photo)
    ├── gallery1.jpg (gallery images)
    ├── gallery2.jpg
    ├── merch1.jpg (merchandise images)
    ├── merch2.jpg
    ├── sponsor1.jpg (sponsor logos)
    └── sponsor2.jpg
```

## 🌐 Method 1: GoDaddy File Manager (Recommended for Beginners)

### Step 1: Access Your Hosting Control Panel
1. Go to [GoDaddy.com](https://godaddy.com) and sign in
2. Click "My Products" → "Web Hosting"
3. Find your hosting plan and click "Manage"
4. Click "File Manager" in the control panel

### Step 2: Navigate to Your Domain Directory
1. In File Manager, click on `public_html` folder
2. This is your website's root directory
3. **Important**: All website files must go here

### Step 3: Upload Website Files
1. **Upload HTML, CSS, and JS files first:**
   - Click "Upload" button
   - Select `index.html`, `styles.css`, and `script.js`
   - Upload them to `public_html`

2. **Create and upload images folder:**
   - Right-click in `public_html` → "Create Folder"
   - Name it `images`
   - Open the `images` folder
   - Upload all your image files here

### Step 4: Verify File Structure
Your `public_html` should look like this:
```
public_html/
├── index.html
├── styles.css
├── script.js
└── images/
    ├── hero-bg.jpg
    ├── team-photo.jpg
    ├── driver1.jpg
    └── ... (other images)
```

### Step 5: Test Your Website
1. Go to your domain name in a web browser
2. The website should load with your content
3. Test the admin panel (gear icon in bottom-right)

## 🔧 Method 2: FTP Upload (For Advanced Users)

### Step 1: Get FTP Credentials
1. In your GoDaddy hosting control panel
2. Go to "FTP Users" or "FTP Management"
3. Note your FTP username, password, and server address

### Step 2: Use FTP Client
1. Download an FTP client (FileZilla, WinSCP, etc.)
2. Connect using your FTP credentials
3. Navigate to `public_html` directory
4. Upload all files maintaining the folder structure

## ⚙️ Domain Configuration

### If Domain is Already Pointed to GoDaddy
- No additional configuration needed
- Your website should work immediately after file upload

### If Domain is Elsewhere
1. **Update DNS Settings:**
   - Go to your domain registrar's DNS settings
   - Change nameservers to GoDaddy's nameservers:
     - `ns1.secureserver.net`
     - `ns2.secureserver.net`
   - Wait 24-48 hours for DNS propagation

2. **Or use GoDaddy's DNS Management:**
   - In GoDaddy control panel, go to "DNS Management"
   - Add/update A record pointing to your hosting IP
   - Add CNAME record for www subdomain

## 🔒 SSL Certificate Setup

### Enable HTTPS (Recommended)
1. In your hosting control panel
2. Look for "SSL Certificates" or "Security"
3. Enable "Let's Encrypt" or "Free SSL"
4. Wait for activation (usually 5-10 minutes)

### Force HTTPS Redirect
After SSL is active, add this to your `.htaccess` file in `public_html`:
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## 📱 Testing Your Deployment

### Desktop Testing
1. Open your domain in different browsers
2. Test all sections and functionality
3. Verify admin panel works
4. Check responsive design by resizing browser

### Mobile Testing
1. Test on your phone
2. Check navigation menu
3. Verify images load properly
4. Test admin panel on mobile

### Cross-Browser Testing
- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile browsers ✅

## 🛠️ Troubleshooting Common Issues

### Website Not Loading
- **Check file permissions**: Files should be 644, folders 755
- **Verify file names**: Ensure exact case matching
- **Check .htaccess**: Remove if causing issues
- **Clear browser cache**: Hard refresh (Ctrl+F5)

### Images Not Displaying
- **Check file paths**: Ensure images are in `images/` folder
- **Verify file names**: Match exactly with HTML references
- **Check file permissions**: Images should be 644
- **File size**: Keep under 500KB for fast loading

### Admin Panel Not Working
- **JavaScript errors**: Check browser console (F12)
- **File uploads**: Ensure all files uploaded correctly
- **Browser compatibility**: Test in different browsers
- **Clear cache**: Remove browser cache and cookies

### Mobile Issues
- **Viewport meta tag**: Ensure it's in HTML head
- **CSS media queries**: Verify responsive styles
- **Touch targets**: Check button sizes on mobile
- **Image scaling**: Ensure images scale properly

## 📊 Performance Optimization

### Image Optimization
1. **Compress images** before uploading
2. **Use appropriate formats**: JPG for photos, PNG for logos
3. **Optimize file sizes**: Aim for under 500KB per image
4. **Consider WebP format** for better compression

### Caching Setup
1. **Browser caching**: Enable in hosting control panel
2. **Gzip compression**: Enable if available
3. **CDN**: Consider using GoDaddy's CDN service

### Speed Testing
- Use Google PageSpeed Insights
- Test on GTmetrix
- Check mobile performance
- Optimize based on recommendations

## 🔄 Content Updates

### Using Admin Panel
1. Click gear icon (⚙️) on your live website
2. Select section to edit
3. Make changes and save
4. Changes appear immediately

### Manual Updates
1. Edit files locally
2. Upload via File Manager or FTP
3. Refresh browser to see changes

### Regular Maintenance
- Update race schedule monthly
- Add new photos after events
- Keep social media links current
- Monitor website performance

## 📞 GoDaddy Support

### Getting Help
1. **24/7 Support**: Available via phone, chat, or email
2. **Knowledge Base**: Extensive documentation available
3. **Community Forums**: User community support
4. **Ticket System**: Submit support tickets

### Common Support Topics
- File upload issues
- DNS configuration
- SSL certificate problems
- Performance optimization
- Domain management

## ✅ Deployment Checklist

- [ ] All website files uploaded to `public_html`
- [ ] Images folder created and populated
- [ ] Domain pointing to GoDaddy hosting
- [ ] SSL certificate enabled (optional but recommended)
- [ ] Website loads correctly in browser
- [ ] Admin panel functional
- [ ] Mobile responsive design working
- [ ] All images displaying properly
- [ ] Navigation working on all pages
- [ ] Contact information updated
- [ ] Social media links configured
- [ ] Race schedule populated
- [ ] Countdown timer working

## 🎯 Next Steps

After successful deployment:

1. **Customize Content**: Use admin panel to add your team's information
2. **Add Real Images**: Replace placeholder images with your photos
3. **Update Schedule**: Set your actual race dates
4. **Configure Social Media**: Add your social media links
5. **Test Everything**: Ensure all features work correctly
6. **Share Your Website**: Promote your new racing team website!

---

**Need Help?** Contact GoDaddy support or refer to the main README.md file for detailed feature documentation.

*Happy Racing! 🏁*
