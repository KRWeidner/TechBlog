const postData = document.querySelectorAll('.form-group');

//method to add new comment
const newPostFormHandler = async (event) => {
    event.preventDefault();
    // Collect values from the new comment form
    const content = document.querySelector('#content-new-comment').value.trim();
    const postId = postData[0].id.split("-")[1];
  
    if (content && postId) {
      // Send a POST request to the API endpoint
      console.log(content);
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment_text: content, blog_id: Number(postId)}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/post/' + postId);
      } else {
        alert(response.statusText);
      }
    }
  };

  document
    .querySelector('#createComment')
    .addEventListener('click', newPostFormHandler);