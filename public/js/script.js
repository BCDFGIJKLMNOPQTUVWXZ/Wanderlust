console.log("Script.js is running!");

// document.addEventListener("DOMContentLoaded", () => {
//     'use strict';
//     const forms = document.querySelectorAll('.needs-validation');
//     Array.from(forms).forEach(form => {
//       form.addEventListener('submit', event => {
//         if (!form.checkValidity()) {
//           event.preventDefault();
//           event.stopPropagation();
//         }
//         form.classList.add('was-validated');
//       }, false);
//     });
//   });

(() => {
    'use strict';
  
    const forms = document.querySelectorAll('.needs-validation');
    console.log("Found forms:", forms.length); // Log how many forms are detected
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        console.log("Form submitted!"); // Log when form is submitted
        
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          console.log("Form validation failed!"); // Log when validation fails
        } else {
          console.log("Form validation passed!");
        }
  
        form.classList.add('was-validated');
      }, false);
    });
  })();
  
  