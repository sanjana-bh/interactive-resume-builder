document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('resumeForm');
    const previewName = document.getElementById('previewName');
    const previewProfession = document.getElementById('previewProfession');
    const previewEmail = document.getElementById('previewEmail');
    const previewPhone = document.getElementById('previewPhone');
    const previewAddress = document.getElementById('previewAddress');
    const previewSummary = document.getElementById('previewSummary');
    const previewEducation = document.getElementById('previewEducation');
    const previewExperience = document.getElementById('previewExperience');
    const previewSkills = document.getElementById('previewSkills');
    const addEducationBtn = document.getElementById('addEducation');
    const addExperienceBtn = document.getElementById('addExperience');
    const addSkillBtn = document.getElementById('addSkill');
    const resetFormBtn = document.getElementById('resetForm');
    const downloadResumeBtn = document.getElementById('downloadResume');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    // Verify libraries are loaded
    console.log('html2canvas loaded:', typeof html2canvas !== 'undefined');
    console.log('jspdf loaded:', typeof jspdf !== 'undefined');
    
    // Update Resume Preview
    function updateResumePreview() {
        // Personal Information
        previewName.textContent = document.getElementById('fullName').value || 'Your Name';
        previewProfession.textContent = document.getElementById('profession').value || 'Your Profession';
        previewEmail.textContent = document.getElementById('email').value || 'email@example.com';
        previewPhone.textContent = document.getElementById('phone').value || '(123) 456-7890';
        previewAddress.textContent = document.getElementById('address').value || '123 Main St, City, Country';
        previewSummary.textContent = document.getElementById('summary').value || 'Your professional summary goes here.';
        
        // Education
        const educationEntries = document.querySelectorAll('.education-entry');
        previewEducation.innerHTML = '';
        
        educationEntries.forEach(entry => {
            const degree = entry.querySelector('.education-degree').value || 'Degree';
            const field = entry.querySelector('.education-field').value || 'Field of Study';
            const institution = entry.querySelector('.education-institution').value || 'Institution Name';
            const year = entry.querySelector('.education-year').value || 'Year';
            
            const educationItem = document.createElement('div');
            educationItem.className = 'education-item';
            educationItem.innerHTML = `
                <h4>${degree}${field ? ' in ' + field : ''}</h4>
                <p class="institution">${institution}</p>
                <p class="year">${year}</p>
            `;
            previewEducation.appendChild(educationItem);
        });
        
        if (previewEducation.children.length === 0) {
            previewEducation.innerHTML = '<div class="education-item"><h4>Degree in Field of Study</h4><p class="institution">Institution Name</p><p class="year">Year</p></div>';
        }
        
        // Experience
        const experienceEntries = document.querySelectorAll('.experience-entry');
        previewExperience.innerHTML = '';
        
        experienceEntries.forEach(entry => {
            const title = entry.querySelector('.experience-title').value || 'Job Title';
            const company = entry.querySelector('.experience-company').value || 'Company';
            const duration = entry.querySelector('.experience-duration').value || 'Duration';
            const location = entry.querySelector('.experience-location').value || 'Location';
            const description = entry.querySelector('.experience-description').value || 'Job description goes here.';
            
            const experienceItem = document.createElement('div');
            experienceItem.className = 'experience-item';
            experienceItem.innerHTML = `
                <h4>${title}${company ? ' at ' + company : ''}</h4>
                <p class="duration-location">${duration}${location ? ' | ' + location : ''}</p>
                <p class="description">${description}</p>
            `;
            previewExperience.appendChild(experienceItem);
        });
        
        if (previewExperience.children.length === 0) {
            previewExperience.innerHTML = '<div class="experience-item"><h4>Job Title at Company</h4><p class="duration-location">Duration | Location</p><p class="description">Job description goes here.</p></div>';
        }
        
        // Skills
        const skillInputs = document.querySelectorAll('.skill-input');
        previewSkills.innerHTML = '';
        
        let hasSkills = false;
        skillInputs.forEach(input => {
            if (input.value.trim()) {
                const skill = document.createElement('span');
                skill.className = 'skill';
                skill.textContent = input.value;
                previewSkills.appendChild(skill);
                hasSkills = true;
            }
        });
        
        if (!hasSkills) {
            previewSkills.innerHTML = '<span class="skill">Sample Skill</span>';
        }
        
        updateProgress();
    }
    
    // Add Education Entry
    function addEducationEntry() {
        const educationFields = document.getElementById('educationFields');
        const newEntry = document.createElement('div');
        newEntry.className = 'education-entry';
        newEntry.innerHTML = `
            <div class="form-row">
                <div class="form-col">
                    <label>Degree</label>
                    <input type="text" class="education-degree" placeholder="Bachelor of Science">
                </div>
                <div class="form-col">
                    <label>Field of Study</label>
                    <input type="text" class="education-field" placeholder="Computer Science">
                </div>
            </div>
            <div class="form-row">
                <div class="form-col">
                    <label>Institution</label>
                    <input type="text" class="education-institution" placeholder="University of Example">
                </div>
                <div class="form-col">
                    <label>Year</label>
                    <input type="text" class="education-year" placeholder="2015-2019">
                </div>
            </div>
            <button type="button" class="btn remove-btn remove-education" style="background-color: #e74c3c; color: white; margin-top: 10px;">
                <i class="fas fa-trash"></i> Remove
            </button>
        `;
        educationFields.appendChild(newEntry);
        
        newEntry.querySelector('.remove-education').addEventListener('click', function() {
            educationFields.removeChild(newEntry);
            updateResumePreview();
        });
        
        addInputListeners(newEntry);
        updateResumePreview();
    }
    
    // Add Experience Entry
    function addExperienceEntry() {
        const experienceFields = document.getElementById('experienceFields');
        const newEntry = document.createElement('div');
        newEntry.className = 'experience-entry';
        newEntry.innerHTML = `
            <div class="form-row">
                <div class="form-col">
                    <label>Job Title</label>
                    <input type="text" class="experience-title" placeholder="Software Engineer">
                </div>
                <div class="form-col">
                    <label>Company</label>
                    <input type="text" class="experience-company" placeholder="Tech Corp Inc.">
                </div>
            </div>
            <div class="form-row">
                <div class="form-col">
                    <label>Duration</label>
                    <input type="text" class="experience-duration" placeholder="2019-Present">
                </div>
                <div class="form-col">
                    <label>Location</label>
                    <input type="text" class="experience-location" placeholder="San Francisco, CA">
                </div>
            </div>
            <div class="form-row">
                <label>Description</label>
                <textarea class="experience-description" rows="3" placeholder="Describe your responsibilities and achievements..."></textarea>
            </div>
            <button type="button" class="btn remove-btn remove-experience" style="background-color: #e74c3c; color: white; margin-top: 10px;">
                <i class="fas fa-trash"></i> Remove
            </button>
        `;
        experienceFields.appendChild(newEntry);
        
        newEntry.querySelector('.remove-experience').addEventListener('click', function() {
            experienceFields.removeChild(newEntry);
            updateResumePreview();
        });
        
        addInputListeners(newEntry);
        updateResumePreview();
    }
    
    // Add Skill Input
    function addSkillInput() {
        const skillsContainer = document.getElementById('skillsContainer');
        const newSkill = document.createElement('div');
        newSkill.className = 'skill-tag';
        newSkill.innerHTML = `
            <input type="text" class="skill-input" placeholder="Add skill">
            <button type="button" class="remove-skill"><i class="fas fa-times"></i></button>
        `;
        skillsContainer.appendChild(newSkill);
        
        newSkill.querySelector('.remove-skill').addEventListener('click', function() {
            skillsContainer.removeChild(newSkill);
            updateResumePreview();
        });
        
        newSkill.querySelector('.skill-input').addEventListener('input', updateResumePreview);
        updateResumePreview();
    }
    
    // Add input listeners
    function addInputListeners(element = document) {
        const inputs = element.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', updateResumePreview);
        });
    }
    
    // Update progress
    function updateProgress() {
        const fields = [
            document.getElementById('fullName'),
            document.getElementById('profession'),
            document.getElementById('email'),
            document.getElementById('phone'),
            document.getElementById('address'),
            document.getElementById('summary')
        ];
        
        let filledFields = 0;
        fields.forEach(field => {
            if (field.value.trim()) filledFields++;
        });
        
        const educationDegrees = document.querySelectorAll('.education-degree');
        let hasEducation = false;
        educationDegrees.forEach(degree => {
            if (degree.value.trim()) hasEducation = true;
        });
        if (hasEducation) filledFields++;
        
        let percentage = Math.min((filledFields / 7) * 70, 70);
        
        const educationCount = document.querySelectorAll('.education-entry').length;
        const experienceCount = document.querySelectorAll('.experience-entry').length;
        const skillCount = document.querySelectorAll('.skill-input').filter(input => input.value.trim()).length;
        
        if (educationCount > 1) percentage += 5;
        if (experienceCount > 0) percentage += 15;
        if (skillCount > 1) percentage += 10;
        
        percentage = Math.min(percentage, 100);
        
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${Math.round(percentage)}% Complete`;
    }
    
    // Reset Form
    function resetForm() {
        form.reset();
        location.reload(); // Simple reload to reset everything
    }
    
    // DOWNLOAD RESUME - GUARANTEED TO WORK
    async function downloadResume() {
        const element = document.getElementById('resumePreview');
        const downloadBtn = document.getElementById('downloadResume');
        
        if (!element) {
            alert('Preview element not found!');
            return;
        }
        
        // Show loading
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
        downloadBtn.disabled = true;
        
        try {
            // Create a clone with explicit styles
            const clone = element.cloneNode(true);
            clone.style.width = '800px';
            clone.style.backgroundColor = 'white';
            clone.style.padding = '30px';
            clone.style.fontFamily = 'Arial, sans-serif';
            clone.style.color = 'black';
            clone.style.position = 'absolute';
            clone.style.left = '-9999px';
            clone.style.top = '0';
            document.body.appendChild(clone);
            
            // Use html2canvas to capture
            const canvas = await html2canvas(clone, {
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false,
                allowTaint: false,
                useCORS: true
            });
            
            // Remove clone
            document.body.removeChild(clone);
            
            // Create PDF
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            
            // If content is longer than one page, add pages
            if (imgHeight > pageHeight) {
                let heightLeft = imgHeight - pageHeight;
                let position = -pageHeight;
                
                while (heightLeft > 0) {
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                    position -= pageHeight;
                }
            }
            
            // Save PDF
            pdf.save('my-resume.pdf');
            
            // Reset button
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
            
        } catch (error) {
            console.error('PDF generation error:', error);
            alert('Error generating PDF: ' + error.message);
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }
    }
    
    // Event Listeners
    addEducationBtn.addEventListener('click', addEducationEntry);
    addExperienceBtn.addEventListener('click', addExperienceEntry);
    addSkillBtn.addEventListener('click', addSkillInput);
    resetFormBtn.addEventListener('click', resetForm);
    downloadResumeBtn.addEventListener('click', downloadResume);
    
    // Initialize
    addInputListeners();
    updateResumePreview();
    
    // Add remove button listeners
    document.querySelectorAll('.remove-education, .remove-experience, .remove-skill').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('remove-education')) {
                this.closest('.education-entry').remove();
            } else if (this.classList.contains('remove-experience')) {
                this.closest('.experience-entry').remove();
            } else if (this.classList.contains('remove-skill')) {
                document.getElementById('skillsContainer').removeChild(this.parentElement);
            }
            updateResumePreview();
        });
    });
});