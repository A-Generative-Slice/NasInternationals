import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

export type UserRole = 'USER' | 'ADMIN';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  passportNumber?: string;
  status: 'Active' | 'Suspended';
  createdAt: string;
  token?: string;
  twoFactorEnabled?: boolean;
}

interface ApplicationItem {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  passportNumber: string;
  type: string;
  destination: string;
  nationality: string;
  purpose: string;
  dateSubmitted: string;
  status: string;
  statusNote?: string;
  timeline: any[];
  documents: any[];
  payment: any;
  assignedOfficer?: string;
}

// In-Memory Database of Users (Role ENUM: 'USER' | 'ADMIN')
const USERS_DB: Record<string, User> = {
  'client@nas.com': {
    id: 'usr-client-001',
    email: 'client@nas.com',
    name: 'Rahul Sharma',
    role: 'USER',
    phone: '+91 98765 43210',
    passportNumber: 'Z8923412',
    status: 'Active',
    createdAt: '2024-01-15',
    token: 'jwt-user-token-98124'
  },
  'admin@nas.com': {
    id: 'usr-admin-999',
    email: 'admin@nas.com',
    name: 'John D (Super Admin)',
    role: 'ADMIN',
    phone: '+91 90000 11111',
    passportNumber: 'ADMIN-PASS-01',
    status: 'Active',
    createdAt: '2023-11-01',
    token: 'jwt-admin-secret-token-77777'
  }
};

// System Audit Logs
let SYSTEM_LOGS: any[] = [
  {
    id: 'log-101',
    timestamp: new Date().toISOString(),
    userEmail: 'admin@nas.com',
    action: 'SYSTEM_BOOT: NAS Internationals Auth Engine Initialized (Roles: USER, ADMIN)',
    ipAddress: '127.0.0.1',
    level: 'info'
  },
  {
    id: 'log-102',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    userEmail: 'admin@nas.com',
    action: 'ADMIN_ACCESS: Verified Private Route /admin/login',
    ipAddress: '10.0.4.12',
    level: 'security'
  }
];

// In-Memory DB initialized with mock data
let APPLICATIONS_DB: ApplicationItem[] = [
  {
    id: 'VISA-CAN-20240815',
    applicantName: 'Rahul Sharma',
    email: 'client@nas.com',
    phone: '+91 98765 43210',
    passportNumber: 'Z8923412',
    type: 'Visitor Visa',
    destination: 'Canada',
    nationality: 'Indian',
    purpose: 'Tourism & Leisure',
    dateSubmitted: '10 Oct 2024',
    status: 'Under Review',
    statusNote: 'Your document attestation and payment proof are being processed by our visa specialists.',
    timeline: [
      { title: 'Submitted', date: '10 Oct 2024', completed: true, isCurrent: false },
      { title: 'Under Review', date: '12 Oct 2024', completed: true, isCurrent: true },
      { title: 'Processing', date: 'Pending', completed: false, isCurrent: false },
      { title: 'Approved', date: 'Pending', completed: false, isCurrent: false }
    ],
    documents: [
      { id: 'doc-1', title: 'Passport Bio-Page', required: true, fileName: 'scanned_passport_page1.pdf', status: 'Uploaded' },
      { id: 'doc-2', title: 'Recent Photograph', required: true, fileName: 'applicant_photo_studio.jpg', status: 'Uploaded' },
      { id: 'doc-3', title: 'Bank Statements (Last 3 Months)', required: true, fileName: 'bank_statement_6months.pdf', status: 'Uploaded' }
    ],
    payment: {
      bookingId: 'NAS-987654321',
      amount: 8500,
      upiQrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=nastravels@hdfcbank&pn=NAS%20Travels&am=8500&cu=INR',
      bankName: 'HDFC Bank',
      accountName: 'NAS Travels Pvt Ltd',
      accountNumber: '1234567890',
      ifscCode: 'HDFC0001234',
      transactionId: 'TXN981247192',
      proofFileName: 'payment_receipt.pdf',
      isVerified: true
    }
  },
  {
    id: 'VISA-SCH-20240902',
    applicantName: 'Priya Patel',
    email: 'priya.patel@example.com',
    phone: '+91 91234 56789',
    passportNumber: 'S7812034',
    type: 'Tourist Visa',
    destination: 'Schengen (France)',
    nationality: 'Indian',
    purpose: 'Tourism & Leisure',
    dateSubmitted: '02 Sep 2024',
    status: 'Processing',
    statusNote: 'Documents forwarded to VFS France Embassy consulate.',
    timeline: [
      { title: 'Submitted', date: '02 Sep 2024', completed: true, isCurrent: false },
      { title: 'Under Review', date: '04 Sep 2024', completed: true, isCurrent: false },
      { title: 'Processing', date: '06 Sep 2024', completed: true, isCurrent: true },
      { title: 'Approved', date: 'Pending', completed: false, isCurrent: false }
    ],
    documents: [
      { id: 'doc-1', title: 'Passport Bio-Page', required: true, fileName: 'priya_passport.pdf', status: 'Verified' },
      { id: 'doc-2', title: 'Schengen Insurance', required: true, fileName: 'travel_insurance_30k.pdf', status: 'Verified' }
    ],
    payment: {
      bookingId: 'NAS-451239081',
      amount: 11200,
      upiQrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=nastravels@hdfcbank&pn=NAS%20Travels&am=11200&cu=INR',
      bankName: 'HDFC Bank',
      accountName: 'NAS Travels Pvt Ltd',
      accountNumber: '1234567890',
      ifscCode: 'HDFC0001234',
      transactionId: 'TXN8829104',
      proofFileName: 'pay_receipt_priya.pdf',
      isVerified: true
    }
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API ROUTES ---

  // 1. Auth: Standard Public User Login Endpoint
  app.post('/api/auth/login', (req, res) => {
    const { email, password, rememberMe } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();

    // Check if user exists in DB
    const existingUser = USERS_DB[cleanEmail];

    if (existingUser) {
      if (existingUser.status === 'Suspended') {
        return res.status(403).json({ error: 'Account suspended. Contact NAS Internationals Support.' });
      }

      // If existing user is ADMIN trying to login via standard form
      if (existingUser.role === 'ADMIN') {
        if (password && password !== 'admin123') {
          return res.status(401).json({ error: 'Invalid password for Admin account. Try "admin123".' });
        }
        SYSTEM_LOGS.unshift({
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          userEmail: cleanEmail,
          action: 'LOGIN_ADMIN: Logged in via Standard Auth Form',
          ipAddress: req.ip || '127.0.0.1',
          level: 'admin'
        });
        return res.json({
          user: existingUser,
          token: existingUser.token || 'jwt-admin-token-123',
          redirectUrl: '/admin/dashboard'
        });
      }

      // Standard USER
      SYSTEM_LOGS.unshift({
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        userEmail: cleanEmail,
        action: 'LOGIN_USER: Standard user signed in',
        ipAddress: req.ip || '127.0.0.1',
        level: 'info'
      });
      return res.json({
        user: existingUser,
        token: existingUser.token || 'jwt-user-token-456',
        redirectUrl: '/dashboard'
      });
    }

    // Default fallback dynamically generated USER for demo
    const newUser: User = {
      id: `usr-${Math.floor(1000 + Math.random() * 9000)}`,
      email: cleanEmail || 'client@nas.com',
      name: cleanEmail ? cleanEmail.split('@')[0].toUpperCase() : 'Rahul Sharma',
      role: 'USER',
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
      token: `jwt-user-${Date.now()}`
    };

    USERS_DB[cleanEmail || 'client@nas.com'] = newUser;

    SYSTEM_LOGS.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userEmail: newUser.email,
      action: 'LOGIN_USER: Dynamic user session created',
      ipAddress: req.ip || '127.0.0.1',
      level: 'info'
    });

    return res.json({
      user: newUser,
      token: newUser.token,
      redirectUrl: '/dashboard'
    });
  });

  // 2. Auth: Registration Endpoint (Creates ONLY 'USER' role)
  app.post('/api/auth/register', (req, res) => {
    const { name, email, phone, passportNumber, password, captchaToken } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanEmail || !name) {
      return res.status(400).json({ error: 'Full Name and Email address are required.' });
    }

    if (USERS_DB[cleanEmail]) {
      return res.status(400).json({ error: 'An account with this email already exists. Please log in.' });
    }

    const registeredUser: User = {
      id: `usr-${Math.floor(1000 + Math.random() * 9000)}`,
      email: cleanEmail,
      name: name,
      role: 'USER', // STRICT ENUM ROLE 'USER'
      phone: phone || '',
      passportNumber: passportNumber || '',
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
      token: `jwt-user-${Date.now()}`
    };

    USERS_DB[cleanEmail] = registeredUser;

    SYSTEM_LOGS.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userEmail: cleanEmail,
      action: `REGISTER_USER: New user registered with role USER`,
      ipAddress: req.ip || '127.0.0.1',
      level: 'info'
    });

    return res.status(201).json({
      user: registeredUser,
      token: registeredUser.token,
      redirectUrl: '/dashboard',
      message: 'Account registered successfully!'
    });
  });

  // 3. Auth: Private Admin Login Endpoint (/admin/login ONLY)
  app.post('/api/auth/admin-login', (req, res) => {
    const { email, password, captchaToken } = req.body;
    const cleanEmail = (email || '').trim().toLowerCase();

    // Verify Admin credentials
    const targetUser = USERS_DB[cleanEmail] || USERS_DB['admin@nas.com'];

    if (cleanEmail && cleanEmail !== 'admin@nas.com' && targetUser.role !== 'ADMIN') {
      SYSTEM_LOGS.unshift({
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        userEmail: cleanEmail,
        action: `SECURITY_ALERT: Unauthorized user attempted access to Private Admin Portal (/admin/login)`,
        ipAddress: req.ip || '127.0.0.1',
        level: 'security'
      });
      return res.status(403).json({
        error: '403 Forbidden: Access Denied. Only users with role ADMIN can authenticate via the Private Admin Portal.'
      });
    }

    if (password && password !== 'admin123') {
      return res.status(401).json({ error: 'Invalid security password for Admin portal. Try "admin123".' });
    }

    const adminUser = USERS_DB['admin@nas.com'];

    SYSTEM_LOGS.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userEmail: adminUser.email,
      action: 'ADMIN_LOGIN: Authenticated successfully via Private Route /admin/login',
      ipAddress: req.ip || '127.0.0.1',
      level: 'admin'
    });

    return res.json({
      user: adminUser,
      token: adminUser.token,
      redirectUrl: '/admin/dashboard',
      message: 'Admin session authenticated.'
    });
  });

  // 4. Auth: Forgot Password & OTP verification
  app.post('/api/auth/forgot-password', (req, res) => {
    const { email } = req.body;
    const otp = '849201'; // Simulated 6-digit OTP code
    return res.json({
      success: true,
      message: `A 6-digit verification code has been dispatched to ${email || 'your email'}. (Demo OTP: ${otp})`,
      otp
    });
  });

  app.post('/api/auth/verify-otp', (req, res) => {
    const { otp } = req.body;
    if (otp === '849201' || otp === '123456' || (otp && otp.length === 6)) {
      return res.json({ verified: true, message: 'OTP verified successfully.' });
    }
    return res.status(400).json({ error: 'Invalid OTP code. Please check and try again.' });
  });

  app.post('/api/auth/reset-password', (req, res) => {
    const { email, newPassword } = req.body;
    return res.json({ success: true, message: 'Password reset successfully. You can now log in.' });
  });

  // 5. Auth: Get Current Profile
  app.get('/api/auth/me', (req, res) => {
    const authRole = req.headers['x-user-role'] || 'USER';
    const authEmail = req.headers['x-user-email'] || 'client@nas.com';

    if (authRole === 'ADMIN' || (authEmail as string).includes('admin')) {
      return res.json({ user: USERS_DB['admin@nas.com'] });
    }
    return res.json({ user: USERS_DB[(authEmail as string).toLowerCase()] || USERS_DB['client@nas.com'] });
  });

  // 6. Admin User Management Endpoint (RESTRICTED TO ADMIN ONLY)
  app.get('/api/admin/users', (req, res) => {
    const authRole = req.headers['x-user-role'];
    if (authRole !== 'ADMIN' && authRole !== 'admin') {
      return res.status(403).json({ error: '403 Forbidden: Admin role required to view User Management.' });
    }
    return res.json({ users: Object.values(USERS_DB) });
  });

  app.patch('/api/admin/users/:id/role', (req, res) => {
    const authRole = req.headers['x-user-role'];
    if (authRole !== 'ADMIN' && authRole !== 'admin') {
      return res.status(403).json({ error: '403 Forbidden: Admin role required.' });
    }
    const { id } = req.params;
    const { role, status } = req.body;

    const userEntry = Object.values(USERS_DB).find(u => u.id === id);
    if (userEntry) {
      if (role) userEntry.role = role;
      if (status) userEntry.status = status;
      return res.json({ user: userEntry, message: `User updated successfully.` });
    }
    return res.status(404).json({ error: 'User not found.' });
  });

  // 7. System Audit Logs Endpoint (RESTRICTED TO ADMIN ONLY)
  app.get('/api/admin/logs', (req, res) => {
    const authRole = req.headers['x-user-role'];
    if (authRole !== 'ADMIN' && authRole !== 'admin') {
      return res.status(403).json({ error: '403 Forbidden: Admin role required.' });
    }
    return res.json({ logs: SYSTEM_LOGS });
  });

  // 8. Applications List (Client vs Admin filtering)
  app.get('/api/applications', (req, res) => {
    const authRole = (req.headers['x-user-role'] || 'USER').toString().toUpperCase();
    const userEmail = req.headers['x-user-email'] || 'client@nas.com';

    if (authRole === 'ADMIN') {
      return res.json({ applications: APPLICATIONS_DB });
    } else {
      // USER sees their own applications
      const userApps = APPLICATIONS_DB.filter(a => a.email.toLowerCase() === (userEmail as string).toLowerCase() || a.email === 'client@nas.com' || a.email === 'rahul.sharma@example.com');
      return res.json({ applications: userApps.length > 0 ? userApps : APPLICATIONS_DB.slice(0, 1) });
    }
  });

  // 4. Create Application
  app.post('/api/applications', (req, res) => {
    const appData = req.body;
    const newApp: ApplicationItem = {
      ...appData,
      id: appData.id || `VISA-${Math.floor(100000 + Math.random() * 900000)}`,
      dateSubmitted: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: appData.status || 'Submitted'
    };

    APPLICATIONS_DB.unshift(newApp);
    return res.status(201).json({ application: newApp, message: 'Application created successfully' });
  });

  // 5. Update Status (RESTRICTED TO ADMIN ONLY)
  app.patch('/api/applications/:id/status', (req, res) => {
    const authRole = req.headers['x-user-role'] || 'client';

    if (authRole !== 'admin') {
      return res.status(403).json({
        error: 'Access Denied: Standard Client users cannot update application status. Admin role required.'
      });
    }

    const { id } = req.params;
    const { status, note } = req.body;

    const appIndex = APPLICATIONS_DB.findIndex(a => a.id === id);
    if (appIndex === -1) {
      return res.status(404).json({ error: 'Application not found' });
    }

    APPLICATIONS_DB[appIndex].status = status;
    if (note) APPLICATIONS_DB[appIndex].statusNote = note;

    return res.json({ application: APPLICATIONS_DB[appIndex], message: `Status updated to ${status}` });
  });

  // 6. Submit Payment Proof
  app.post('/api/applications/:id/payment', (req, res) => {
    const { id } = req.params;
    const { transactionId, proofFileName } = req.body;

    const appIndex = APPLICATIONS_DB.findIndex(a => a.id === id);
    if (appIndex !== -1) {
      APPLICATIONS_DB[appIndex].status = 'Under Review';
      APPLICATIONS_DB[appIndex].statusNote = 'Payment proof submitted. Verification in progress.';
      APPLICATIONS_DB[appIndex].payment = {
        ...APPLICATIONS_DB[appIndex].payment,
        transactionId,
        proofFileName: proofFileName || 'receipt.pdf',
        isVerified: true
      };
      return res.json({ application: APPLICATIONS_DB[appIndex] });
    }
    return res.status(404).json({ error: 'Application not found' });
  });

  // 7. Admin Operational Metrics (RESTRICTED TO ADMIN ONLY)
  app.get('/api/admin/metrics', (req, res) => {
    const authRole = req.headers['x-user-role'] || 'client';

    if (authRole !== 'admin') {
      return res.status(403).json({
        error: 'Forbidden: Client accounts cannot view Admin operational stats.'
      });
    }

    return res.json({
      totalRevenue: 2450000,
      pendingPayments: 320000,
      totalApplications: APPLICATIONS_DB.length,
      approvedCount: APPLICATIONS_DB.filter(a => a.status === 'Approved').length,
      pendingCount: APPLICATIONS_DB.filter(a => a.status === 'Under Review' || a.status === 'Submitted').length
    });
  });

  // --- VITE MIDDLEWARE / STATIC SERVING ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
