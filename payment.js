$(document).ready(function() {
    // Retrieve the course name from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseName = urlParams.get('course') || 'Not Selected';
    $('#courseName').val(courseName);
  
    // Dynamic Payment Details Fields
    $('#paymentMethod').change(function() {
      const method = $(this).val();
      let htmlContent = '';
  
      if (method === 'upi') {
        htmlContent = `
          <div class="form-group">
            <label for="upiId">UPI ID</label>
            <input type="text" class="form-control" id="upiId" placeholder="Enter your UPI ID" required>
          </div>
        `;
      } else if (method === 'phone') {
        htmlContent = `
          <div class="form-group">
            <label for="phoneNumber">Phone Number</label>
            <input type="tel" class="form-control" id="phoneNumber" placeholder="Enter your phone number" required>
          </div>
        `;
      } else if (method === 'card') {
        htmlContent = `
          <div class="form-group">
            <label for="cardNumber">Card Number</label>
            <input type="text" class="form-control" id="cardNumber" placeholder="Enter your card number" required>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="expiryDate">Expiry Date</label>
              <input type="month" class="form-control" id="expiryDate" required>
            </div>
            <div class="form-group col-md-6">
              <label for="cvv">CVV</label>
              <input type="password" class="form-control" id="cvv" placeholder="CVV" required>
            </div>
          </div>
        `;
      }
  
      $('#paymentDetails').html(htmlContent);
    });
  
    // Form Submission Handling
    $('#paymentForm').submit(function(event) {
      event.preventDefault();
  
      // Collect form data
      const formData = {
        courseName: $('#courseName').val(),
        fullName: $('#fullName').val(),
        emailAddress: $('#emailAddress').val(),
        createPassword: $('#createPassword').val(),
        paymentMethod: $('#paymentMethod').val(),
        paymentInfo: {}
      };
  
      // Collect payment details based on the method
      if (formData.paymentMethod === 'upi') {
        formData.paymentInfo.upiId = $('#upiId').val();
      } else if (formData.paymentMethod === 'phone') {
        formData.paymentInfo.phoneNumber = $('#phoneNumber').val();
      } else if (formData.paymentMethod === 'card') {
        formData.paymentInfo.cardNumber = $('#cardNumber').val();
        formData.paymentInfo.expiryDate = $('#expiryDate').val();
        formData.paymentInfo.cvv = $('#cvv').val();
      }
  
      // Simulate API Call
      simulatePayment(formData);
    });
  
    // Function to Simulate Payment Processing
    function simulatePayment(data) {
      // Simulate processing delay
      setTimeout(function() {
        // Simple validation (for demonstration)
        let isValid = true;
        for (const key in data) {
          if (!data[key] || (typeof data[key] === 'object' && Object.values(data[key]).includes(''))) {
            isValid = false;
            break;
          }
        }
  
        // Display Payment Status
        if (isValid) {
          $('#paymentStatusMessage').text('Payment Successful!');
        } else {
          $('#paymentStatusMessage').text('Payment Failed. Please check your details.');
        }
        $('#paymentStatusModal').modal('show');
      }, 1000);
    }
  });
  