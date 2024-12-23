<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $propertyAddress = htmlspecialchars(trim($_POST['propertyaddress']));
    $sizeOfPool = htmlspecialchars(trim($_POST['sizeofpool']));
    $phoneNumber = htmlspecialchars(trim($_POST['phonenumber']));
    $message = htmlspecialchars(trim($_POST['message']));
    $page_id = htmlspecialchars(trim($_POST['page_id']));

    // Email recipient and subject
  $to = "sales@aquastarqatar.com, aquastarqatar1@gmail.com"; // Replace with your email address
    $bcc = "edb@illforddigital.com";
    $subject = "AQUASTAR - Contact Request from $page_id";

    // Email content in HTML
    $emailContent = "
    <html>
    <head>
        <style>
            body {
                   font-family: Poppins, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background-color: #f9f9f9;
            }
            .email-header {
                text-align: center;
                margin-bottom: 20px;
                font-size: 24px;
                color: #007acc;
            }
            .email-content {
                padding: 10px;
                background-color: #fff;
                border-radius: 8px;
                border: 1px solid #ddd;
            }
            .email-content p {
                margin: 10px 0;
            }
            .email-footer {
                margin-top: 20px;
                text-align: center;
                font-size: 12px;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class='email-container'>
            <div class='email-header'>New Consultation Request</div>
            <div class='email-content'>
                <p><strong>Name:</strong> $name</p>
                <p><strong>Email:</strong> $email</p>
                <p><strong>Property Address:</strong> $propertyAddress</p>
                <p><strong>Size of Pool:</strong> $sizeOfPool</p>
                <p><strong>Phone Number:</strong> $phoneNumber</p>
                <p><strong>Message:</strong></p>
                <p>$message</p>
            </div>
            <div class='email-footer'>
                This message was sent from: <strong>$page_id</strong>
            </div>
        </div>
    </body>
    </html>
    ";

    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Bcc: $bcc\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Send email
    if (mail($to, $subject, $emailContent, $headers)) {
        echo "<script type='text/javascript'>alert('Email sent successfully.');window.location.href = 'index.html';</script>";
    } else {
        echo "Failed to send the message.";
    }
} else {
    echo "Invalid request.";
}
?>
