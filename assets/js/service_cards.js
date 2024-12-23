function showContent(contentId) {
    // Hide all contents
    document.querySelectorAll('.services_content').forEach((content) => {
      content.classList.remove('active');
      content.classList.add('hidden');
    });
  
    // Show the selected content
    const selectedContent = document.getElementById(contentId);
    if (selectedContent) {
      selectedContent.classList.add('active');
      selectedContent.classList.remove('hidden');
    }
  }
  


  