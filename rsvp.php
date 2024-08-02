<?php
// Define the file path where the CSV data will be stored
$file = 'rsvp-data.csv';

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input data
    $name = htmlspecialchars(strip_tags($_POST['name']));
    $email = htmlspecialchars(strip_tags($_POST['email']));
    $message = htmlspecialchars(strip_tags($_POST['message']));

    // Open the file for appending
    $fileHandle = fopen($file, 'a');

    // Check if the file is empty to determine if headers need to be written
    if (filesize($file) == 0) {
        // Write headers if the file is empty
        fputcsv($fileHandle, ['Name', 'Email', 'Message']);
    }

    // Write the form data as a new row
    fputcsv($fileHandle, [$name, $email, $message]);

    // Close the file handle
    fclose($fileHandle);

    // Redirect to a thank you page or show a success message
    header("Location: thank-you.html");
    exit();
} else {
    // If the request method is not POST, redirect to the form page
    header("Location: index.html");
    exit();
}
?>
