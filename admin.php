<?php
ob_start();
define('UPLOAD_DIR', 'uploads/');
define('DATA_FILE', 'products.json');

define('CATEGORIES_FILE', 'categories.json');

// Handle adding a new category
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if ($input['action'] === 'add_category') {
        $newCategory = trim($input['newCategory']);
        
        if ($newCategory) {
            $categories = json_decode(file_get_contents(CATEGORIES_FILE), true);

            if (!in_array($newCategory, $categories)) { // Ensure no duplicates
                $categories[] = $newCategory;
                file_put_contents(CATEGORIES_FILE, json_encode($categories));
            }
        }

        // Return updated categories list as JSON
        echo json_encode($categories);
        exit;
    }
}



if (!file_exists(DATA_FILE)) {
    file_put_contents(DATA_FILE, json_encode([]));
}

$data = json_decode(file_get_contents(DATA_FILE), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $productName = $_POST['productname'];
    $modelId = $_POST['modelid'];
    $category = $_POST['category'];
    $brand = isset($_POST['brand']) ? trim($_POST['brand']) : '';
    $productDetails = $_POST['product_details'];
    $currentImage = $_POST['current_image']; // Get the current image path
    $imagePath = $currentImage; // Default to the current image
    $isEdit = isset($_GET['edit']);
    $originalProductName = $isEdit ? $_GET['edit'] : null;

    // Handle image upload
    if (isset($_FILES['product_image']) && $_FILES['product_image']['error'] === 0) {
        $imageName = time() . '_' . basename($_FILES['product_image']['name']);
        $imagePath = UPLOAD_DIR . $imageName;

        if (!is_dir(UPLOAD_DIR)) {
            mkdir(UPLOAD_DIR, 0777, true);
        }

        move_uploaded_file($_FILES['product_image']['tmp_name'], $imagePath);

        // Delete old image if editing and a new image is uploaded
        if ($isEdit && file_exists($currentImage)) {
            unlink($currentImage);
        }
    }

    // If editing, remove the old entry if the name is updated
    if ($isEdit && $originalProductName !== $productName) {
        unset($data[$originalProductName]);
    }

    // Add or update product
    $data[$productName] = [
        'model_id' => $modelId,
        'category' => $category,
        'brand' => $brand,
        'details' => $productDetails,
        'image' => $imagePath
    ];

    file_put_contents(DATA_FILE, json_encode($data));
    header("Location: admin.html");
    exit;
}




if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['delete'])) {
    $productName = $_GET['delete'];
    if (isset($data[$productName])) {
        // Delete associated image
        if (file_exists($data[$productName]['image'])) {
            unlink($data[$productName]['image']);
        }

        unset($data[$productName]);
        file_put_contents(DATA_FILE, json_encode($data));
    }
    header("Location: admin.html");
exit;
}


ob_end_flush();



?>
