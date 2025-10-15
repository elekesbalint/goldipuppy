import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body || {};

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const payload = {
      name,
      email,
      phone: phone || '',
      subject: subject || 'general',
      message,
      submittedAt: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || '',
      ip: request.headers.get('x-forwarded-for') || '',
    };

    // Send email notification
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || gmailUser;

    if (gmailUser && gmailPass) {
      try {
        const transporter = nodemailer.createTransporter({
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
        });

        const subjectMap: { [key: string]: string } = {
          'puppy-inquiry': 'Puppy Inquiry',
          'reservation': 'Reservation Request',
          'delivery': 'Delivery Information Request',
          'health-certificate': 'Health Certificate Inquiry',
          'general': 'General Question',
          'support': 'Support Request',
        };

        const emailSubject = `🐕 GoldiPuppy - New ${subjectMap[subject] || 'Contact'} from ${name}`;
        
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">🐕 GoldiPuppy Contact Form</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">New message received</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="margin-bottom: 20px;">
                <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Details</h2>
                
                <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 20px;">
                  <div style="flex: 1; min-width: 200px; background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
                    <strong style="color: #667eea;">👤 Name:</strong><br>
                    <span style="font-size: 16px; color: #333;">${name}</span>
                  </div>
                  
                  <div style="flex: 1; min-width: 200px; background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745;">
                    <strong style="color: #28a745;">📧 Email:</strong><br>
                    <a href="mailto:${email}" style="font-size: 16px; color: #28a745; text-decoration: none;">${email}</a>
                  </div>
                </div>
                
                <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 20px;">
                  <div style="flex: 1; min-width: 200px; background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
                    <strong style="color: #ffc107;">📱 Phone:</strong><br>
                    <span style="font-size: 16px; color: #333;">${phone || 'Not provided'}</span>
                  </div>
                  
                  <div style="flex: 1; min-width: 200px; background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #17a2b8;">
                    <strong style="color: #17a2b8;">📋 Subject:</strong><br>
                    <span style="font-size: 16px; color: #333;">${subjectMap[subject] || subject}</span>
                  </div>
                </div>
              </div>
              
              <div style="margin-bottom: 20px;">
                <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">💬 Message:</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #6f42c1; white-space: pre-wrap; line-height: 1.6; color: #333;">${message}</div>
              </div>
              
              <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <h4 style="color: #666; margin: 0 0 10px 0; font-size: 14px;">Technical Details:</h4>
                <div style="font-size: 12px; color: #666; line-height: 1.4;">
                  <strong>Submitted:</strong> ${new Date(payload.submittedAt).toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' })}<br>
                  <strong>User Agent:</strong> ${payload.userAgent}<br>
                  <strong>IP Address:</strong> ${payload.ip || 'Not available'}
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
                <a href="mailto:${email}?subject=Re: ${subjectMap[subject] || 'Your inquiry'}" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                  📧 Reply to ${name}
                </a>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
              <p>This email was sent automatically from your GoldiPuppy contact form.</p>
            </div>
          </div>
        `;

        // Send notification to admin
        await transporter.sendMail({
          from: `"GoldiPuppy Contact Form" <${gmailUser}>`,
          to: notificationEmail,
          subject: emailSubject,
          html: emailHtml,
        });

        // If this is a reservation, send confirmation to user
        if (subject === 'reservation') {
          const userConfirmationHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">🐕 GoldiPuppy - Rezerváció visszaigazolás</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Köszönjük a rezervációs kérelmét!</p>
              </div>
              
              <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px;">Kedves ${name}!</h2>
                
                <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                  Köszönjük, hogy a GoldiPuppy-t választotta! A rezervációs kérelmét sikeresen megkaptuk.
                </p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 20px;">
                  <h3 style="color: #10b981; margin: 0 0 15px 0; font-size: 18px;">📋 Az Ön adatai:</h3>
                  <p style="margin: 5px 0; color: #333;"><strong>Név:</strong> ${name}</p>
                  <p style="margin: 5px 0; color: #333;"><strong>Email:</strong> ${email}</p>
                  <p style="margin: 5px 0; color: #333;"><strong>Telefon:</strong> ${phone || 'Nincs megadva'}</p>
                </div>
                
                <div style="background: #e6fffa; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 20px;">
                  <h3 style="color: #10b981; margin: 0 0 15px 0; font-size: 18px;">💬 Az Ön üzenete:</h3>
                  <p style="color: #333; line-height: 1.6; white-space: pre-wrap; margin: 0;">${message}</p>
                </div>
                
                <div style="background: #fef3cd; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
                  <h3 style="color: #f59e0b; margin: 0 0 15px 0; font-size: 18px;">⏰ Mi történik ezután?</h3>
                  <ul style="color: #333; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li>24 órán belül felvesszük Önnel a kapcsolatot</li>
                    <li>Megbeszéljük a részleteket és az árat</li>
                    <li>Egyeztetünk az átvétel időpontjáról</li>
                    <li>Elküldjük az egészségügyi dokumentumokat</li>
                  </ul>
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
                  <p style="color: #666; margin-bottom: 15px;">Kérdése van? Keressen minket bizalommal!</p>
                  <a href="mailto:goldipuppy01@gmail.com" 
                     style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                    📧 goldipuppy01@gmail.com
                  </a>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
                <p>Ez egy automatikus visszaigazoló email a GoldiPuppy csapatától.</p>
                <p>Kérjük, ne válaszoljon erre az üzenetre közvetlenül.</p>
              </div>
            </div>
          `;

          await transporter.sendMail({
            from: `"GoldiPuppy - Rezerváció" <${gmailUser}>`,
            to: email, // Send to the user
            subject: `🐕 GoldiPuppy - Rezervációs kérelmét megkaptuk!`,
            html: userConfirmationHtml,
          });
        }

        console.log('[contact] Email notification sent successfully');
      } catch (emailError) {
        console.error('[contact] Email sending failed:', emailError);
        // Continue execution even if email fails
      }
    } else {
      console.log('[contact] Gmail credentials not configured, logging to console only');
      console.log('[contact] submission', payload);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[contact] API error:', error);
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

