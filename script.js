document.addEventListener('DOMContentLoaded', function () {
    
    const applicationForm = document.querySelector('.application-form');
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            const resumeLink = document.getElementById('resume-link').value;
            if (!resumeLink.includes('onedrive.live.com') && !resumeLink.includes('docs.google.com') && !resumeLink.toLowerCase().includes('sharepoint.com')) {
                alert('Please provide a valid OneDrive, Google Docs, or SharePoint link for your resume.');
                return;
            }
            
            
            const form = e.target;
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            if (window.location.protocol === 'file:') {
                alert('FormSubmit requires this page to be served over HTTP/HTTPS. Please run a local web server or use Live Server in VS Code.');
                return;
            }
            
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
            
            const formData = new FormData(form);
            
            fetch("https://formsubmit.co/ajax/Vlad.Boldisor@haringey6.ac.uk", {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(text || 'Server returned an error.');
                    });
                }
                return response.json();
            })
            .then(data => {
                if (data.success === "true" || data.success === true) {
                    alert('Application submitted successfully!');
                    form.reset();
                } else {
                    const message = data.message || 'There was an error sending your application. Please try again.';
                    alert(message);
                }
            })
            .catch((error) => {
                alert('FormSubmit error: ' + (error.message || 'Please try again.'));
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});