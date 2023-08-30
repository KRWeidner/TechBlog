//method to delete blog post
const deleteFormHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete project');
        }
    }
};

//method to update blog post
const updateFormHandler = async (event) => {
    const title = document.querySelector('#edit-title').value.trim();
    const text = document.querySelector('#edit-text').value.trim();
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        if (title && text && id) {
            // Send a PUT request to the API endpoint
            const response = await fetch(`/api/blogs/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ blog_name: title, blog_post: text }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert(response.statusText);
            }
        }
    }
};

document.querySelector('#updateButton').addEventListener('click', updateFormHandler);
document.querySelector('#deleteButton').addEventListener('click', deleteFormHandler);