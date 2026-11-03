export function verifyAccountTemplate(code) {
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Verify Your Account</h2>

            <p>Use the following code to verify your NGL account:</p>

            <h1 style="letter-spacing: 5px;">${code}</h1>

            <p>This code expires after 5 minutes.</p>

            <p>If you didn't request this code, please ignore this email.</p>
        </div>
    `;
}