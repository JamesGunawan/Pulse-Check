// Part for icon interactability

// Select all posts
const posts = document.querySelectorAll('.post-container');

posts.forEach(post => {
    const flipCard = post.querySelector('.flip-card'); // Select flip card for each post
    const dislikeButton = post.querySelector('.dislike-button'); // Select dislike button for each post
    const visibilityButton = post.querySelector('#visibility'); // Button for eye icon/to be blurred
    const imageToBlur = post.querySelector('.zoom img'); // Select the image to be blurred
    const shareButtons = post.querySelectorAll('.share-button'); // Select all share buttons in the post

    let dislikeActive = false; // Initial state for dislike
    let isImageBlurred = false; // Track whether the image is blurred

    // Add click event listener to flip-card for the "like" button
    flipCard.addEventListener('click', function() {
        flipCard.classList.toggle('flipped'); // Toggle the 'flipped' class

        // If the card is flipped (liked), deactivate the dislike button
        if (flipCard.classList.contains('flipped')) {
            dislikeButton.src = "dislike.png"; // Change to inactive dislike image
            dislikeActive = false; // Reset dislike state
        }
    });

    // Add click event listener to the "dislike" button
    dislikeButton.addEventListener('click', function() {
        dislikeActive = !dislikeActive; // Toggle dislike state
        this.src = dislikeActive ? "dislike-active.png" : "dislike.png"; // Change the dislike image

        // Add the zoom effect class
        this.classList.add('zoom');

        // Remove the zoom class after a short delay
        setTimeout(() => {
            this.classList.remove('zoom');
        }, 200); // Match this duration to your CSS transition duration

        // If dislike is active, unflip the card (deactivate like)
        if (dislikeActive) {
            flipCard.classList.remove('flipped'); // Ensure the card is unflipped
        }
    });

    // Add click event listener to the visibility button
    visibilityButton.addEventListener('click', function() {
        isImageBlurred = !isImageBlurred; // Toggle the blur state

        // Toggle blur class on the image
        if (isImageBlurred) {
            imageToBlur.classList.add('blur'); // Add blur class
            this.src = "hide.png"; // Change icon to hide
        } else {
            imageToBlur.classList.remove('blur'); // Remove blur class
            this.src = "show.png"; // Change icon back to show
        }
    });

    // Add click event listener to each share button
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the closest post-container
            const postContainer = button.closest('.post-container');

            // Get the link from the anchor element inside the post-container
            const linkElement = postContainer.querySelector('.organizeimage');
            const linkToCopy = linkElement.href;

            // Copy the link to the clipboard
            navigator.clipboard.writeText(linkToCopy).then(() => {
                // Show the message
                const message = postContainer.querySelector('.share-message');
                message.style.display = 'block'; // Show the message

                // Hide the message after 2 seconds
                setTimeout(() => {
                    message.style.display = 'none';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    });
});

// Part for the comment form and feedback selection

// Initialize an empty array to store comments and selected feedback type
let comments = [];
let selectedFeedbackType = ''; 

// Select form and comments container
const commentForm = document.getElementById('commentForm');
const commentsContainer = document.getElementById('commentsContainer');

// Function to display comments
function displayComments() {
    commentsContainer.innerHTML = ''; // Clear previous comments

    // Loop through the comments array and create elements to display
    comments.forEach((comment) => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerText = comment;
        commentsContainer.appendChild(commentDiv);
    });
}

// Handle form submission
commentForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const commentInput = document.getElementById('commentInput'); // Get the comment input
    const newComment = commentInput.value.trim(); // Trim whitespace from input

    // Check if the feedback type is selected
    if (!selectedFeedbackType) {
        alert('Feedback type not selected, please select a feedback type.'); // Alert user
        return; // Stop the function if no feedback type is selected
    }

    // Check if the comment input is not empty
    if (newComment) {
        // Create a formatted comment with the feedback type
        const formattedComment = `${selectedFeedbackType}: ${newComment}`;
        
        comments.push(formattedComment); // Add the new comment to the array
        displayComments(); // Display the updated comments

        // Clear input field and reset feedback type
        commentInput.value = '';
        selectedFeedbackType = ''; // Reset feedback type after submission
        dropbtn.innerText = 'Feedback Type'; // Reset button text to default
    }
});

// Dropdown button and content
const dropbtn = document.querySelector('.feedback-drop');
const dropdownContent = document.getElementById('feedback-type');

// Toggle the dropdown visibility when the button is clicked
dropbtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default behavior
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.feedback-drop')) {
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        }
    }
};

// Set feedback type when an option is clicked
const feedbackLinks = dropdownContent.querySelectorAll('a');
feedbackLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default behavior
        selectedFeedbackType = link.innerText; // Store selected feedback type
        dropbtn.innerText = selectedFeedbackType; // Update button text
        dropdownContent.style.display = 'none'; // Hide dropdown after selection
    });
});



