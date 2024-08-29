document.getElementById('imageUpload').addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    console.log('Image upload event triggered.');
    
    const file = event.target.files[0];
    console.log('Selected file:', file);

    const reader = new FileReader();

    reader.onload = function(e) {
        console.log('File read successfully.');

        const img = new Image();
        img.onload = function() {
            console.log('Image loaded successfully.');

            const canvas = document.getElementById('imageCanvas');
            const ctx = canvas.getContext('2d');

            // Set canvas dimensions to match the image
            canvas.width = img.width;
            canvas.height = img.height;
            console.log(`Canvas dimensions set to: ${img.width}x${img.height}`);

            // Draw the uploaded image onto the canvas
            ctx.drawImage(img, 0, 0);
            console.log('Uploaded image drawn on canvas.');

            // Draw additional graphics (e.g., overlay images)
            drawOverlay(ctx, canvas.width, canvas.height);
        };

        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

function drawOverlay(ctx, canvasWidth, canvasHeight) {
    console.log('Starting to draw overlays.');

    // Load the purple fire image (background overlay)
    const overlay2 = new Image();
    overlay2.src = 'purple fire.jpg'; // Replace with your actual image path

    overlay2.onload = function() {
        console.log('Overlay2 image loaded.');

        // Draw the second overlay image (background with transparency) after it loads
        ctx.globalAlpha = 0.5; // Set transparency level (0.0 to 1.0)
        ctx.drawImage(overlay2, 0, 0, canvasWidth, canvasHeight);
        console.log('Overlay2 image drawn on canvas.');

        ctx.globalAlpha = 1.0; // Reset transparency for further drawings

        // Load and draw the first overlay image (top layer)
        const overlay1 = new Image();
        overlay1.src = 'lean cup.png'; // Replace with your actual image path

        overlay1.onload = function() {
            console.log('Overlay1 image loaded.');

            const overlay1Width = canvasWidth / 4;
            const overlay1Height = (overlay1.height / overlay1.width) * overlay1Width;
            console.log(`Overlay1 dimensions set to: ${overlay1Width}x${overlay1Height}`);

            ctx.drawImage(overlay1, 10, 10, overlay1Width, overlay1Height);
            console.log('Overlay1 image drawn on canvas.');
        };

        overlay1.onerror = function() {
            console.error('Error loading Overlay1 image.');
        };
    };

    overlay2.onerror = function() {
        console.error('Error loading Overlay2 image.');
    };
}