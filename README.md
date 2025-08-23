# Nummi Racing Team Website

A modern, responsive racing team website built with HTML, CSS, and JavaScript. Features an easy-to-use admin panel for content management and is designed to work seamlessly on all devices.

## 🏁 Features

### Core Sections
- **Hero Section** - Eye-catching introduction with call-to-action buttons
- **Countdown Timer** - Live countdown to the next race
- **About Us** - Team information and mission
- **Drivers** - Driver profiles with photos and accomplishments
- **Crew** - Team crew member profiles
- **The Car** - Detailed specifications of the Toyota 86
- **Race Schedule** - Upcoming races and previous results
- **Gallery** - Race photos organized by event
- **Merchandise** - Team merchandise showcase
- **Sponsors** - Sponsor recognition and partnerships
- **Contact** - Contact information and social media links

### Admin Panel Features
- **Content Editor** - Easy-to-use interface for updating text content
- **Image Management** - Upload and organize photos by section
- **Schedule Updates** - Modify race dates and countdown timer
- **Social Media Links** - Update social media URLs
- **Real-time Updates** - Changes appear immediately on the website

### Technical Features
- **Fully Responsive** - Works on mobile, tablet, and desktop
- **Auto-scaling** - Automatically adjusts to different screen sizes
- **Modern Design** - Clean, professional racing aesthetic
- **Smooth Animations** - Scroll-triggered animations and transitions
- **Local Storage** - Content persists between sessions
- **Cross-browser Compatible** - Works on all modern browsers

## 🚀 Quick Start

### 1. Download Files
Download all the website files to your computer:
- `index.html` - Main website file
- `styles.css` - Styling and responsive design
- `script.js` - Functionality and admin panel
- `images/` - Directory for your photos

### 2. Add Your Content
1. **Images**: Place your photos in the `images/` folder
   - `hero-bg.jpg` - Hero section background
   - `team-photo.jpg` - Team photo for About section
   - `driver1.jpg`, `driver2.jpg` - Driver photos
   - `crew1.jpg`, `crew2.jpg` - Crew photos
   - `car-main.jpg` - Main car photo
   - `gallery1.jpg`, `gallery2.jpg` - Gallery photos
   - `merch1.jpg`, `merch2.jpg` - Merchandise photos
   - `sponsor1.jpg`, `sponsor2.jpg` - Sponsor logos

2. **Content**: Use the admin panel to customize:
   - Team information
   - Driver and crew details
   - Race schedule
   - Social media links

### 3. Test Locally
Open `index.html` in your web browser to test the website locally.

### 4. Deploy to GoDaddy
1. **Upload Files**: Upload all files to your GoDaddy hosting via FTP or File Manager
2. **Domain Setup**: Point your domain to the hosting directory
3. **Test Live**: Visit your domain to ensure everything works

## 🎨 Customization

### Colors and Branding
The website uses a racing-inspired color scheme:
- **Primary**: Orange (#ff6b35) - Racing energy and excitement
- **Secondary**: Dark gray (#1a1a1a) - Professional and sleek
- **Accent**: Gold (#f7931e) - Success and achievement

### Fonts
- **Headings**: Orbitron - Futuristic, racing-inspired
- **Body Text**: Roboto - Clean, readable, professional

### Layout
- **Grid-based**: Responsive grid system that adapts to screen size
- **Card Design**: Modern card-based layout for content sections
- **Spacing**: Consistent spacing and padding throughout

## 📱 Mobile Optimization

The website is fully optimized for mobile devices:
- **Touch-friendly** navigation and buttons
- **Responsive images** that scale appropriately
- **Mobile-first** design approach
- **Optimized layouts** for small screens
- **Fast loading** on mobile networks

## 🔧 Admin Panel Usage

### Accessing the Admin Panel
1. Click the gear icon (⚙️) in the bottom-right corner
2. The admin panel slides in from the right
3. Use the different sections to manage your content

### Editing Content
1. Select the section you want to edit from the dropdown
2. Click "Load Content" to see current content
3. Make your changes in the text area
4. Click "Save Changes" to update the website

### Managing Images
1. Select the section for your images
2. Choose image files from your computer
3. Click "Upload Images" to process them
4. Images will be organized by section

### Updating Schedule
1. Set the date and time for your next race
2. Click "Update Countdown" to refresh the timer
3. The countdown will automatically update

### Social Media Links
1. Enter your social media URLs
2. Click "Update Social Links" to save
3. Links will update throughout the website

## 🌐 Hosting on GoDaddy

### File Upload Methods

#### Option 1: GoDaddy File Manager
1. Log into your GoDaddy hosting control panel
2. Open the File Manager
3. Navigate to your domain's root directory (usually `public_html`)
4. Upload all website files
5. Ensure `index.html` is in the root directory

#### Option 2: FTP Upload
1. Use an FTP client (FileZilla, WinSCP, etc.)
2. Connect to your GoDaddy hosting
3. Upload files to the `public_html` directory
4. Maintain the folder structure

### Domain Configuration
1. **DNS Settings**: Ensure your domain points to GoDaddy hosting
2. **SSL Certificate**: Enable HTTPS for security
3. **Subdomain**: Optionally create a subdomain (e.g., `racing.yourdomain.com`)

### Performance Optimization
1. **Image Compression**: Optimize images before uploading
2. **Caching**: Enable browser caching in hosting settings
3. **CDN**: Consider using a content delivery network

## 📊 Content Management Tips

### Regular Updates
- **Race Results**: Update after each race
- **Photos**: Add new race photos to the gallery
- **Schedule**: Keep upcoming races current
- **Social Media**: Update links if accounts change

### Image Guidelines
- **Hero Background**: 1920x1080px minimum
- **Profile Photos**: 400x400px square format
- **Gallery Images**: 800x600px landscape format
- **File Formats**: JPG for photos, PNG for logos
- **File Sizes**: Keep under 500KB for fast loading

### Content Structure
- **Drivers**: Name, role, key accomplishments
- **Crew**: Name, position, relevant experience
- **Races**: Date, location, event name, result
- **Sponsors**: Company name, logo, partnership description

## 🛠️ Troubleshooting

### Common Issues

#### Images Not Displaying
- Check file paths in the `images/` folder
- Ensure image filenames match exactly
- Verify file permissions on the server

#### Admin Panel Not Working
- Check browser console for JavaScript errors
- Ensure all files are uploaded correctly
- Clear browser cache and refresh

#### Mobile Layout Issues
- Test on different devices and browsers
- Check viewport meta tag in HTML
- Verify CSS media queries are working

#### Countdown Timer Issues
- Check date format in admin panel
- Ensure JavaScript is enabled
- Verify timezone settings

### Browser Compatibility
- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Internet Explorer**: Limited support (not recommended)

## 🔒 Security Considerations

### Admin Access
- The admin panel is currently open to all users
- Consider adding password protection for production use
- Implement user authentication for sensitive content

### Data Storage
- Content is stored in browser localStorage
- Consider server-side storage for production
- Implement backup systems for important content

### File Uploads
- Current implementation is for demonstration
- Add file type and size validation
- Implement secure file upload handling

## 🚀 Future Enhancements

### Potential Features
- **User Authentication**: Secure admin access
- **Database Integration**: Server-side content storage
- **E-commerce**: Online merchandise sales
- **Live Updates**: Real-time race results
- **News Blog**: Team updates and announcements
- **Fan Forum**: Community engagement
- **Race Registration**: Online event signups

### Technical Improvements
- **Progressive Web App**: Offline functionality
- **API Integration**: External data sources
- **Analytics**: Visitor tracking and insights
- **SEO Optimization**: Better search engine visibility
- **Performance**: Advanced caching and optimization

## 📞 Support

For technical support or questions:
- Check the troubleshooting section above
- Review browser console for error messages
- Ensure all files are properly uploaded
- Test on different devices and browsers

## 📄 License

This website template is provided for educational and commercial use. Customize it to match your team's branding and requirements.

---

**Built with ❤️ for the racing community**

*Nummi Racing - Professional Racing Excellence*
