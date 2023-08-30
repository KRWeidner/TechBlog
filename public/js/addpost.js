//method to create new blog post
const newPostFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the new post form
  const title = document.querySelector('#title-new-post').value.trim();
  const content = document.querySelector('#content-new-post').value.trim();

  if (title && content) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify({ blog_name: title, blog_post: content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#createPost')
  .addEventListener('click', newPostFormHandler);