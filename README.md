# 🌍 AI-Powered Recycling Rewards App

> Encouraging responsible recycling through AI-powered recognition and gamified rewards

## 🎯 Overview

The AI-Powered Recycling Rewards App is a web-based platform that uses artificial intelligence and computer vision to encourage responsible recycling behavior. Users can upload or capture photos of recyclable items through their device camera, and the AI automatically identifies and verifies the material. Verified recycling earns users reward points redeemable at partner eco-friendly businesses.

### Alignment with UN Sustainable Development Goals

**Primary Goal: SDG 12 – Responsible Consumption and Production**
- Promotes sustainable waste management practices
- Encourages recycling and reuse of materials
- Reduces environmental footprint through gamification

**Secondary Goal: SDG 13 – Climate Action**
- Reduces greenhouse gas emissions from waste
- Tracks and displays CO₂ savings from recycling activities
- Educates users on environmental impact

## 🎯 Project Goals

1. **Behavioral Change**: Encourage consistent recycling habits through positive reinforcement
2. **Education**: Provide users with knowledge about proper recycling and environmental impact
3. **Community Building**: Create a network of eco-conscious users and partner businesses
4. **Data Collection**: Generate insights on recycling patterns for waste management optimization
5. **Accessibility**: Make recycling tracking easy and rewarding for everyone

## ✨ Key Features

### Core Features (MVP - Phase 1)

- 🧠 **AI-Based Item Recognition**
  - Computer vision-powered recyclable material detection
  - Supports: Plastic bottles, aluminum cans, paper, glass, cardboard
  - Confidence scoring for accurate verification
  - Works with device camera or uploaded images

- 🎁 **Reward Points System**
  - Earn eco-points for each verified recyclable item
  - Point multipliers for rare/valuable recyclables
  - Gamified levels and achievements

- 👤 **User Authentication & Profiles**
  - Secure Firebase authentication
  - Personal recycling dashboard
  - Track total items recycled and points earned

- 📊 **Recycling History**
  - Complete log of all recycling activities
  - Filter by date, item type, and points earned
  - Export data functionality

### Advanced Features (Phase 2+)

- 🌍 **Eco Analytics Dashboard**
  - Real-time environmental impact metrics
  - CO₂ saved, water conserved, energy saved
  - Comparison with community averages
  - Visual charts and progress tracking

- 💬 **AI-Powered Chatbot**
  - Answers recycling questions
  - Provides local recycling guidelines
  - Tips for reducing waste
  - Educational content delivery

- 🏆 **Rewards Marketplace**
  - Redeem points at partner stores
  - Discount codes and vouchers
  - Eco-friendly product recommendations
  - Donation options to environmental NGOs

- 📍 **Local Recycling Finder**
  - Interactive map of nearby recycling centers
  - Drop-off points for special materials
  - Operating hours and accepted items
  - QR code verification at centers

- 👥 **Social & Community Features**
  - Leaderboards (city, country, global)
  - Team challenges and competitions
  - Share achievements on social media
  - Friend referral system

- 🛠️ **Admin Panel**
  - Partner business management
  - User engagement analytics
  - Reward redemption tracking
  - System configuration

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js
- **Styling**: Tailwind CSS / Material-UI
- **State Management**: React Context API / Redux
- **Routing**: React Router
- **Camera Access**: react-webcam or native MediaDevices API
- **Maps**: Google Maps JavaScript API

### Backend
- **Authentication**: Firebase Authentication
- **Database**: Cloud Firestore
- **Storage**: Firebase Storage (for images)
- **Cloud Functions**: Firebase Cloud Functions (optional for serverless logic)
- **Alternative**: Node.js + Express (if building custom backend)

### AI & Machine Learning
- **Primary Option**: TensorFlow.js (for in-browser inference)
- **Alternative**: Google Cloud Vision API / Clarifai API
- **Model**: YOLOv8 (converted to TensorFlow.js) or MobileNet
- **Training**: TensorFlow / PyTorch (for custom model development)

### Additional Services
- **Maps**: Google Maps API / Mapbox
- **Payments**: Stripe API / PayPal
- **Mobile Money**: M-Pesa API (for Kenya market)
- **Analytics**: Google Analytics / Mixpanel
- **Email**: SendGrid / Firebase Email Extension

### Development Tools
- **Version Control**: Git + GitHub
- **Package Manager**: npm / yarn
- **Build Tool**: Vite / Create React App
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel / Netlify / Firebase Hosting

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Web Browser)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Camera     │  │     UI       │  │   Dashboard  │ │
│  │   Capture    │  │  Components  │  │   Analytics  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   AI/ML PROCESSING                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │  TensorFlow.js Model (In-browser)                │  │
│  │  OR Cloud Vision API (Server-side)               │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  FIREBASE BACKEND                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │   Auth   │  │ Firestore│  │  Storage │             │
│  └──────────┘  └──────────┘  └──────────┘             │
│  ┌──────────────────────────────────────────────────┐  │
│  │           Cloud Functions (Optional)             │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              EXTERNAL SERVICES                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │  Google  │  │  Payment │  │  Email   │             │
│  │   Maps   │  │   APIs   │  │ Service  │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘
```

## mvp live demo : 
https://ai-eco-rewards.vercel.app/

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase account
- Google Cloud account (if using Cloud Vision API)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/recycling-rewards-app.git
   cd recycling-rewards-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at https://firebase.google.com
   - Enable Authentication (Email/Password)
   - Enable Cloud Firestore
   - Enable Storage
   - Copy your Firebase configuration

4. **Configure environment variables**
   ```bash
   # Create .env file in root directory
   cp .env.example .env
   ```

   Add your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   
   # Optional: If using Google Cloud Vision
   REACT_APP_GOOGLE_CLOUD_API_KEY=your_google_cloud_api_key
   
   # Optional: If using Google Maps
   REACT_APP_GOOGLE_MAPS_API_KEY=your_maps_api_key
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

### Project Structure

```
recycling-rewards-app/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Auth/
│   │   ├── Camera/
│   │   ├── Dashboard/
│   │   └── Common/
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   └── History.jsx
│   ├── services/            # API and service functions
│   │   ├── firebase.js
│   │   ├── aiService.js
│   │   └── recyclingService.js
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── RecyclingContext.jsx
│   ├── utils/               # Helper functions
│   │   ├── imageProcessing.js
│   │   └── calculations.js
│   ├── models/              # AI models (if using TensorFlow.js)
│   ├── styles/              # Global styles
│   ├── App.jsx
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## 📅 Development Roadmap

### Phase 1: Foundation & MVP (Weeks 1-6) ✅ *Current Phase*

**Weeks 1-2: Setup & Planning**
- [x] Project initialization and environment setup
- [x] Firebase configuration
- [x] Database schema design
- [x] Choose AI approach (Cloud API vs Custom Model)
- [ ] Basic UI wireframes

**Weeks 3-4: Authentication & Core UI**
- [ ] User authentication (signup/login)
- [ ] Navigation and routing
- [ ] Home page and dashboard layout
- [ ] Camera component for image capture
- [ ] Responsive design implementation

**Weeks 5-6: AI Integration & Rewards**
- [ ] Integrate AI model or API
- [ ] Image upload and processing
- [ ] Item recognition and verification
- [ ] Points system implementation
- [ ] Recycling history display

### Phase 2: Enhanced Features (Weeks 7-10)

- [ ] Eco-impact analytics dashboard
- [ ] Rewards marketplace
- [ ] Partner integration
- [ ] Point redemption system
- [ ] User profile enhancement
- [ ] Achievements and badges

### Phase 3: Community & Advanced Features (Weeks 11-14)

- [ ] AI chatbot integration
- [ ] Social features and leaderboards
- [ ] Team challenges
- [ ] Google Maps integration
- [ ] QR code scanning at centers
- [ ] Email notifications

### Phase 4: Admin & Business Tools (Weeks 15-16)

- [ ] Admin panel development
- [ ] Partner dashboard
- [ ] Analytics and reporting
- [ ] User management tools
- [ ] System configuration panel

### Phase 5: Testing & Launch (Weeks 17-20)

- [ ] Comprehensive testing (unit, integration, E2E)
- [ ] Performance optimization
- [ ] Security audit
- [ ] Beta testing with real users
- [ ] Bug fixes and refinements
- [ ] Production deployment
- [ ] Marketing materials
- [ ] Launch! 🚀

## 💰 Revenue Model

### Primary Revenue Streams

1. **Sponsored Rewards**
   - Eco-friendly brands sponsor point rewards
   - Cost-per-engagement model
   - Featured placement in rewards marketplace

2. **Partnership Fees**
   - Local businesses pay monthly/annual fees
   - Access to engaged eco-conscious audience
   - Marketing and analytics tools

3. **Data Analytics Services**
   - Anonymized recycling data for waste management companies
   - Municipal governments and urban planners
   - Research institutions

4. **In-App Advertising**
   - Display ads (non-intrusive)
   - Focus on eco-friendly products/services
   - Native advertising integration

5. **Premium Features** (Optional)
   - Advanced analytics
   - Ad-free experience
   - Exclusive rewards and challenges
   - Subscription: $2.99/month

6. **Corporate Sustainability Programs**
   - White-label solutions for companies
   - Employee engagement packages
   - CSR reporting integration

### Projected Revenue (Year 1)

- **Sponsored Rewards**: 40%
- **Partnerships**: 30%
- **Data Services**: 15%
- **Advertising**: 10%
- **Premium Subscriptions**: 5%

## 🌱 Environmental Impact

### Metrics Tracked

- **Items Recycled**: Total count by category
- **CO₂ Emissions Saved**: Based on recycling vs landfill calculations
- **Water Conserved**: Estimated water savings from recycling
- **Energy Saved**: Kilowatt-hours saved through recycling
- **Landfill Space Saved**: Cubic meters diverted from landfills

### Impact Calculations (Examples)

- **1 Plastic Bottle**: 0.03 kg CO₂ saved, 2 liters water saved
- **1 Aluminum Can**: 0.14 kg CO₂ saved, 40 liters water saved
- **1 kg Paper**: 1.5 kg CO₂ saved, 50 liters water saved
- **1 Glass Bottle**: 0.18 kg CO₂ saved, 1.2 liters water saved

### Target Impact Goals

**Year 1:**
- 10,000 active users
- 500,000 items recycled
- 15 tons CO₂ emissions prevented
- 50 partner businesses

**Year 3:**
- 100,000 active users
- 5 million items recycled
- 150 tons CO₂ emissions prevented
- 500+ partner businesses
- Expansion to 5 cities/countries

## 🤝 Contributing

We welcome contributions from developers, designers, environmentalists, and anyone passionate about sustainability!

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Be respectful and inclusive

### Areas We Need Help

- 🎨 UI/UX design improvements
- 🤖 AI model optimization
- 🌍 Localization and translations
- 📊 Data analytics and visualization
- 🧪 Testing and quality assurance
- 📝 Documentation
- 🌱 Environmental impact calculations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Project Lead**: Mercy Ndiritu
- **Development**: Mercy Ndiritu
- **Design**: Mercy Ndiritu
- **AI/ML**: Mercy Ndiritu

## 📞 Contact

- **Email**: mewanjikundiritu@gmail.com
- **Website**: 
- **LinkedIn**: 

## 🙏 Acknowledgments

- UN Sustainable Development Goals
- Firebase and Google Cloud Platform
- TensorFlow and open-source ML community
- Environmental organizations and partners
- Beta testers and early adopters

---

**Made with 💚 for a sustainable future**


<img width="373" height="816" alt="Screenshot 2025-10-29 152349" src="https://github.com/user-attachments/assets/818ea084-1477-4647-bc63-33a683303c6c" />



<img width="379" height="810" alt="Screenshot 2025-10-29 152358" src="https://github.com/user-attachments/assets/e146f6a3-d4ce-4acb-9f47-f0049d025e05" />


<img width="381" height="816" alt="Screenshot 2025-10-29 152408" src="https://github.com/user-attachments/assets/fc52fa00-50d8-4388-b2da-b2e1312d81b8" />

<img width="372" height="812" alt="Screenshot 2025-10-29 152421" src="https://github.com/user-attachments/assets/d8e3366d-a5af-4caa-8026-069eb5f513b3" />



<img width="370" height="817" alt="Screenshot 2025-10-29 152432" src="https://github.com/user-attachments/assets/9587d0c7-bfe6-4e7f-a7f0-c71a7c7f0aa2" />
<img width="379" height="819" alt="Screenshot 2025-10-29 152445" src="https://github.com/user-attachments/assets/6e6beb33-0a88-49e7-9772-76b7575ae702" />

<img width="380" height="814" alt="Screenshot 2025-10-29 152515" src="https://github.com/user-attachments/assets/fa93bf93-fb2f-4bf1-8593-73efbe3c630f" />

<img width="380" height="814" alt="Screenshot 2025-10-29 152515" src="https://github.com/user-attachments/assets/a19cc14d-f424-4a2e-83a5-2e89d9751065" />




<img width="391" height="814" alt="Screenshot 2025-10-29 152959" src="https://github.com/user-attachments/assets/9990aed2-2e7a-4bac-8606-29579006491c" />

<img width="360" height="761" alt="Screenshot 2025-10-29 152613" src="https://github.com/user-attachments/assets/cf36ddda-63b9-45fb-82e8-70ad980fc784" />

<img width="377" height="761" alt="Screenshot 2025-10-29 152635" src="https://github.com/user-attachments/assets/669ded70-ceab-44ca-948b-33ec7325f8a0" />


<img width="373" height="824" alt="Screenshot 2025-10-29 152648" src="https://github.com/user-attachments/assets/ec2656bb-3fe7-4f5a-8135-386aa79ad8f3" />

*Last Updated: October 29, 2025*


