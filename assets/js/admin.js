import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBbNQTeSikk7LY3R8cxkL7QVkUI5qz6UQg",
    authDomain: "aquastar-c65ae.firebaseapp.com",
    databaseURL: "https://aquastar-c65ae-default-rtdb.firebaseio.com",
    projectId: "aquastar-c65ae",
    storageBucket: "aquastar-c65ae.firebasestorage.app",
    messagingSenderId: "152862205802",
    appId: "1:152862205802:web:00f978b582e9bce679a713"
};

var app = initializeApp(firebaseConfig);
const auth = getAuth(app);

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// References
const productName = document.getElementById("product-name");
const productDescription = document.getElementById("product-description");
const productCategory = document.getElementById("product-category");
const brandInput = document.getElementById("brand");
const productImage = document.getElementById("product-image");
const addProductBtn = document.getElementById("add-product-btn");
const productList = document.getElementById("product-list");

// Add Product
addProductBtn.addEventListener("click", async () => {
    const name = productName.value;
    const description = productDescription.value;
    const category = productCategory.value;
    const imageFile = productImage.files[0];
    const brand = brandInput.value;

    if (!name || !description || !category || !imageFile || !brand) {
        alert("Please fill out all fields.");
        return;
    }

    try {
        // Upload Image to Firebase Storage
        const imageRef = ref(storage, `products/${imageFile.name}`);
        const uploadTask = await uploadBytesResumable(imageRef, imageFile);
        const imageURL = await getDownloadURL(uploadTask.ref);

        // Add Product to Firestore
        await addDoc(collection(db, "products"), {
            name,
            description,
            category,
            image: imageURL,
            brand
        });

        alert("Product added successfully!");
        loadProducts();
        clearForm();
    } catch (error) {
        console.error("Error adding product:", error);
        alert("Error adding product. Please try again.");
    }
});

// Load Products
async function loadProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        productList.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.category}</td>
                <td><img src="${product.image}" alt="${product.name}" style="width: 100px;"></td>
                <td>
                    <button onclick="deleteProduct('${doc.id}')">Delete</button>
                </td>
            `;
            productList.appendChild(row);
        });
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

// Delete Product
async function deleteProduct(id) {
    try {
        await deleteDoc(doc(db, "products", id));
        alert("Product deleted successfully!");
        loadProducts();
    } catch (error) {
        console.error("Error deleting product:", error);
    }
}

// Clear Form
function clearForm() {
    productName.value = "";
    productDescription.value = "";
    productCategory.value = "";
    productImage.value = null;
    brandInput.value = "";
}

// Initial Load
loadProducts();










document.addEventListener("DOMContentLoaded", () => {
    const categoryModal = document.getElementById("categoryModal");
    const openCategoryModal = document.getElementById("openCategoryModal");
    const closeCategoryModal = document.getElementById("closeCategoryModal");
    const categoryForm = document.getElementById("categoryForm");
    const categoryTable = document.getElementById("categoryTable").querySelector("tbody");

    // Open modal
    openCategoryModal.addEventListener("click", () => {
        categoryModal.style.display = "block";
        loadCategories();
    });

    // Close modal
    closeCategoryModal.addEventListener("click", () => {
        categoryModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === categoryModal) {
            categoryModal.style.display = "none";
        }
    });

    // Handle form submission
    categoryForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const categoryName = document.getElementById("categoryName").value;
        const categoryImage = document.getElementById("categoryImage").files[0];

        if (!categoryName || !categoryImage) {
            alert("Please fill out all fields.");
            return;
        }

        const formData = new FormData();
        formData.append("action", "add_category");
        formData.append("categoryName", categoryName);
        formData.append("categoryImage", categoryImage);

        try {
            const response = await fetch("admin.php", {
                method: "POST",
                body: formData,
            });
            const categories = await response.json();
            populateCategoryTable(categories);
            categoryForm.reset();
        } catch (error) {
            console.error("Error adding category:", error);
        }
    });

    // Populate table with categories
    function populateCategoryTable(categories) {
        categoryTable.innerHTML = "";
        Object.entries(categories).forEach(([key, value]) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${key}</td>
                <td><img src="${value.image}" alt="${key}" style="width: 50px; height: 50px;"></td>
            `;
            categoryTable.appendChild(row);
        });
    }

    // Load categories
    async function loadCategories() {
        try {
            const response = await fetch("categories.json");
            const categories = await response.json();
            populateCategoryTable(categories);
        } catch (error) {
            console.error("Error loading categories:", error);
        }
    }
});












