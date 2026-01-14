import { EnterpriseProfile } from '@/hooks/useProfiles';

interface CertificationLabels {
  [key: string]: string;
}

const certificationLabels: CertificationLabels = {
  iso27001: 'ISO 27001',
  soc2: 'SOC 2',
  gdpr: 'GDPR',
  hipaa: 'HIPAA',
  pciDss: 'PCI DSS',
  ccpa: 'CCPA',
};

export async function generateProfilePDF(profile: EnterpriseProfile): Promise<Blob> {
  const companyInfo = profile.company_info || {};
  const branding = profile.branding || {};
  const services = profile.services || [];
  const team = profile.team || [];
  const compliance = profile.compliance || {};

  // Build HTML content for the PDF
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background: #fff;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
    }
    .header {
      background: linear-gradient(135deg, ${branding.primaryColor || '#3B82F6'}, ${branding.secondaryColor || '#8B5CF6'});
      color: white;
      padding: 40px;
      border-radius: 12px;
      margin-bottom: 32px;
    }
    .header-content {
      display: flex;
      align-items: flex-start;
      gap: 24px;
    }
    .logo-container {
      width: 80px;
      height: 80px;
      background: rgba(255,255,255,0.2);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo-container img {
      max-width: 60px;
      max-height: 60px;
      object-fit: contain;
    }
    .company-name {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .tagline {
      font-size: 16px;
      opacity: 0.9;
    }
    .badges {
      display: flex;
      gap: 8px;
      margin-top: 16px;
      flex-wrap: wrap;
    }
    .badge {
      background: rgba(255,255,255,0.2);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
    }
    .section {
      margin-bottom: 32px;
    }
    .section-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 16px;
      color: ${branding.primaryColor || '#3B82F6'};
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-title::before {
      content: '';
      width: 4px;
      height: 24px;
      background: ${branding.primaryColor || '#3B82F6'};
      border-radius: 2px;
    }
    .description {
      color: #4a4a4a;
      line-height: 1.8;
    }
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    .contact-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .contact-icon {
      width: 20px;
      height: 20px;
      color: ${branding.primaryColor || '#3B82F6'};
    }
    .services-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    .service-card {
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    }
    .service-name {
      font-weight: 600;
      margin-bottom: 8px;
    }
    .service-description {
      font-size: 14px;
      color: #666;
    }
    .team-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .team-member {
      text-align: center;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .member-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: ${branding.primaryColor || '#3B82F6'};
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 600;
      margin: 0 auto 12px;
    }
    .member-name {
      font-weight: 600;
    }
    .member-role {
      font-size: 14px;
      color: #666;
    }
    .certifications {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .cert-badge {
      background: #dcfce7;
      color: #166534;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
    }
    .footer {
      margin-top: 40px;
      padding-top: 24px;
      border-top: 1px solid #e0e0e0;
      text-align: center;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-content">
        <div class="logo-container">
          ${branding.logoUrl ? `<img src="${branding.logoUrl}" alt="Logo">` : '🏢'}
        </div>
        <div>
          <div class="company-name">${companyInfo.companyName || profile.name}</div>
          ${companyInfo.tagline ? `<div class="tagline">${companyInfo.tagline}</div>` : ''}
          <div class="badges">
            ${companyInfo.industry ? `<span class="badge">${companyInfo.industry}</span>` : ''}
            ${companyInfo.founded ? `<span class="badge">Since ${companyInfo.founded}</span>` : ''}
          </div>
        </div>
      </div>
    </div>

    ${companyInfo.description ? `
    <div class="section">
      <div class="section-title">About Us</div>
      <p class="description">${companyInfo.description}</p>
    </div>
    ` : ''}

    ${(companyInfo.website || companyInfo.email || companyInfo.phone || companyInfo.address) ? `
    <div class="section">
      <div class="section-title">Contact Information</div>
      <div class="contact-grid">
        ${companyInfo.website ? `<div class="contact-item">🌐 ${companyInfo.website}</div>` : ''}
        ${companyInfo.email ? `<div class="contact-item">✉️ ${companyInfo.email}</div>` : ''}
        ${companyInfo.phone ? `<div class="contact-item">📞 ${companyInfo.phone}</div>` : ''}
        ${companyInfo.address ? `<div class="contact-item">📍 ${companyInfo.address}</div>` : ''}
      </div>
    </div>
    ` : ''}

    ${services.length > 0 ? `
    <div class="section">
      <div class="section-title">Our Services</div>
      <div class="services-grid">
        ${services.map((service: any) => `
          <div class="service-card">
            <div class="service-name">${service.name}</div>
            ${service.description ? `<div class="service-description">${service.description}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    ${team.length > 0 ? `
    <div class="section">
      <div class="section-title">Our Team</div>
      <div class="team-grid">
        ${team.map((member: any) => `
          <div class="team-member">
            <div class="member-avatar">${member.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}</div>
            <div class="member-name">${member.name}</div>
            <div class="member-role">${member.role}</div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    ${(compliance.certifications?.length > 0 || compliance.awards) ? `
    <div class="section">
      <div class="section-title">Compliance & Certifications</div>
      ${compliance.certifications?.length > 0 ? `
      <div class="certifications">
        ${compliance.certifications.map((cert: string) => `
          <span class="cert-badge">${certificationLabels[cert] || cert}</span>
        `).join('')}
      </div>
      ` : ''}
      ${compliance.awards ? `<p class="description" style="margin-top: 16px;"><strong>Awards:</strong> ${compliance.awards}</p>` : ''}
    </div>
    ` : ''}

    <div class="footer">
      Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
    </div>
  </div>
</body>
</html>
  `;

  // Create a blob with the HTML content
  // For a real PDF, you would use a library like jsPDF or html2pdf
  // Here we'll create a printable HTML that can be converted to PDF
  const blob = new Blob([htmlContent], { type: 'text/html' });
  return blob;
}

export function downloadProfilePDF(profile: EnterpriseProfile) {
  generateProfilePDF(profile).then((blob) => {
    // Open in new window for printing as PDF
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, '_blank');
    
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
    
    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
}
