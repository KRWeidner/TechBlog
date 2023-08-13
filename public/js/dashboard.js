const goToNewPostButton = async (event) => {
  document.location.replace('/addpost');
};

document
  .querySelector('#addPost')
  .addEventListener('click', goToNewPostButton);


