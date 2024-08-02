<?php
// Define the path to the CSV file where data will be stored
$file = 'rsvp-data.csv';

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input data to prevent XSS and ensure safety
    $name = htmlspecialchars(strip_tags($_POST['name']));
    $email = htmlspecialchars(strip_tags($_POST['email']));
    $message = htmlspecialchars(strip_tags($_POST['message']));

    // Open the CSV file for appending data
    $fileHandle = fopen($file, 'a');

    // Check if the file is empty to determine if headers need to be written
    if (filesize($file) == 0) {
        // Write the header row if the file is empty
        fputcsv($fileHandle, ['Name', 'Email', 'Message']);
    }

    // Write the sanitized form data to the CSV file
    fputcsv($fileHandle, [$name, $email, $message]);

    // Close the file handle
    fclose($fileHandle);

    // Set file permissions (Make sure the PHP process has the required permissions)
    chmod($file, 0666); // Sets read and write permissions for everyone

    // Redirect to a thank you page
    header("Location: thank-you.html");
    exit();
} else {
    // If the request method is not POST, redirect to the form page
    header("Location: index.html");
    exit();
}
?>
